import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import prisma from "@/lib/PrismaClient";

const handler = NextAuth({
    providers: [
        CredentialsProvider({
            id: "credentials",
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials: any): Promise<any> {
                const { email, password } = credentials;

                if (!email || !password) {
                    throw new Error("Email and password are required");
                }

                const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

                if (!emailPattern.test(email)) {
                    throw new Error("Invalid email address");
                }

                const user = await prisma.user.findFirst({
                    where: {
                        OR: [{ email: email }, { username: email }],
                    },
                });

                if (!user) {
                    throw new Error("User not found");
                }
                
                // Compare the hashed password in the database with the provided password
                const isPasswordValid = await bcrypt.compare(
                    password,
                    user.password
                );

                // If the password does not match, return error
                if (!isPasswordValid) {
                    throw new Error("Incorrect password");
                }

                return user;
            },
        }),
    ],
    session: {
        strategy: "jwt",
        maxAge: 7 * 24 * 60 * 60, // 7 days
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.fullName = user.fullName;
                token.email = user.email;
                token.profilePic = user.profilePic;
            }
            return token;
        },

        async session({ session, token }) {
            if (token && session.user) {
                session.user.id = token.id;
                session.user.fullName = token.fullName;
                session.user.email = token.email;
                session.user.profilePic = token.profilePic;
            }
            return session;
        },
    },
    secret: process.env.NEXTAUTH_SECRET!,
});

export { handler as GET, handler as POST };

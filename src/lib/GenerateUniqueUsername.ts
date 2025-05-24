import prisma from "./PrismaClient";

async function generateUniqueUsername(email: string): Promise<string> {
    const base = email
        .split("@")[0]
        .toLowerCase()
        .replace(/[^a-z0-9]/gi, "");
    let username = base;
    let count = 0;

    while (true) {
        const existingUser = await prisma.user.findUnique({
            where: { username },
        });

        if (!existingUser) break;

        count++;
        username = `${base}${count}`;
    }

    return username;
}

export default generateUniqueUsername;

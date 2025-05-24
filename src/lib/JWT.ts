import jwt, { JwtPayload, Secret, SignOptions } from "jsonwebtoken";

const JWT_SECRET: Secret = process.env.JWT_SECRET!;

// Limit expiry to known valid formats
type ExpiryTime = `${number}${"s" | "m" | "h" | "d" | "w" | "y"}` | number;

const generateToken = (payload: object, expiry?: ExpiryTime): string => {
    const options: SignOptions = {
        expiresIn: expiry || "1d",
    };
    return jwt.sign(payload, JWT_SECRET, options);
};

const decodeToken = (token: string): JwtPayload | null => {
    const decoded = jwt.decode(token);
    return decoded as JwtPayload | null;
};

const verifyToken = (token: string): JwtPayload | null => {
    try {
        return jwt.verify(token, JWT_SECRET) as JwtPayload;
    } catch (err: unknown) {
        console.log(err);
        return null;
    }
};

export { generateToken, decodeToken, verifyToken };
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { prisma } from "..";
import { JWT_SECRET } from "../../secrets";
import { isNull, isNullOrUndefined } from "util";


const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.headers.authorization;
        if (!token) {
            throw new Error("Token is required");
        }
        console.log(token, "wowtoken");
        const [bearer, t] = token.split(" ");
        const payload = jwt.verify(t, JWT_SECRET) as any;
        console.log(payload, "this is samir");

        const user = await prisma.user.findFirst({ where: { id: payload.userId } });
        console.log(user, "this is colin");

        if (!user) {
            throw new Error("User not found");
        }
        req.user = user;
        next();
    } catch (err) {
        next(err);
    }
};

const getUserMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.headers.authorization;
        if (!token) {
            throw new Error("Token is required");
        }
        console.log(token, "wowtoken");
        const [bearer, t] = token.split(" ");
        if (bearer !== "Bearer") {
            throw new Error("Invalid token");
        }
        console.log(t, "this is token");
        if (!t || t === "null" || t === "undefined" || t === null || t === undefined) {
            console.log("no token")
        } else {
            const payload = jwt.verify(t, JWT_SECRET) as any;
            console.log(payload, "this is samir");

            const user = await prisma.user.findFirst({ where: { id: payload.userId } });
            console.log(user, "this is colin");

            if (user) {
                req.user = user;
            }
        }

        next();
    } catch (err) {
        next(err);
    }
};

const adminMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const user = req.user;

    if (user.role !== "ADMIN") {
        return res.status(403).json({ error: "Unauthorized" });
    }

    next();
}

export { authMiddleware, adminMiddleware, getUserMiddleware };
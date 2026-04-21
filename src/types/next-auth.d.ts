import { UserRole } from "@prisma/client";
import { DefaultSession } from "next-auth";

declare module "next-auth" {
    interface User {
        role: UserRole;
    }

    interface Session {
        user: {
            role: UserRole;
            id: string;
        } & DefaultSession["user"];
    }
}

declare module "@auth/core/adapters" {
    interface AdapterUser {
        role?: UserRole;
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        role: UserRole;
    }
}
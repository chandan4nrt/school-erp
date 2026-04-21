"use server";

import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

export async function register(prevState: any, formData: FormData) {
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const role = formData.get("role") as string;

    if (!email || !password || !name) {
        return { error: "Please fill in all fields" };
    }

    if (password.length < 6) {
        return { error: "Password must be at least 6 characters" };
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
                role: (role as any) || "STUDENT",
            },
        });
    } catch (error: any) {
        if (error.code === 'P2002') {
            return { error: "An account with this email already exists" };
        }
        return { error: "Something went wrong. Please try again." };
    }

    redirect("/signin");
}
import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma"; // Adjust path to your prisma singleton
import { UserRole } from "@prisma/client";

export const { handlers, auth, signIn, signOut } = NextAuth({
    adapter: PrismaAdapter(prisma),
    providers: [
        // 1. Google OAuth Provider
        Google({
            clientId: process.env.AUTH_GOOGLE_ID,
            clientSecret: process.env.AUTH_GOOGLE_SECRET,
            // Optional: Map Google profile to your User model's role
            profile(profile) {
                return {
                    id: profile.sub,
                    name: profile.name,
                    email: profile.email,
                    image: profile.picture,
                    role: (profile as any).role ?? "STUDENT", // Default role for OAuth users
                };
            },
        }),

        // 2. Custom Login Provider
        Credentials({
            name: "credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) return null;

                const user = await prisma.user.findUnique({
                    where: { email: credentials.email as string },
                });

                // Check if user exists and has a password (OAuth users won't have one)
                if (!user || !user.password) return null;

                const isPasswordValid = await bcrypt.compare(
                    credentials.password as string,
                    user.password
                );

                if (!isPasswordValid) return null;

                return {
                    id: user.id,
                    email: user.email,
                    name: user.name,
                    role: user.role, // Crucial for redirection
                };
            },
        }),
    ],
    callbacks: {
        // This adds the role to the JWT token
        async jwt({ token, user }) {
            if (user) {
                token.role = user.role;
            }
            return token;
        },
        // This makes the role available in the session (useSession() or auth())
        async session({ session, token }) {
            if (session.user) {
                session.user.role = token.role as UserRole;
                session.user.id = token.sub as string;
            }
            return session;
        },
    },
    session: {
        strategy: "jwt", // Must be JWT to work with Credentials provider
    },
    pages: {
        signIn: "/signin", // Custom sign-in page
    },
});
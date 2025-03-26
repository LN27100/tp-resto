import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export const authOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Mot de passe", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        let user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (!user) {
          const hashedPassword = await bcrypt.hash(credentials.password, 10);

          user = await prisma.user.create({
            data: {
              email: credentials.email,
              password: hashedPassword,
              name: "Utilisateur par défaut", 
            },
          });
        } else {
          if (!user.password) return null; 

          const isValid = await bcrypt.compare(credentials.password, user.password);
          if (!isValid) return null; 
        }

        return user;
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET || "",
  session: { strategy: "jwt" as const },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };

import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "./db/prisma";
import CredentialsProvider from "next-auth/providers/credentials";
import { compareSync } from "bcrypt-ts-edge";
import { authConfig } from "./auth.config";
import { cookies } from "next/headers";

export const config = {
  pages: {
    signIn: "/sign-in",
    error: "/sign-in",
  },
  session: {
    strategy: "jwt" as const,
    maxAge: 30 * 24 * 60 * 60,
  },
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      credentials: {
        email: { type: "email" },
        password: { type: "password" },
      },
      async authorize(credentials) {
        if (credentials == null) {
          return null;
        }

        const user = await prisma.user.findFirst({
          where: {
            email: credentials.email as string,
          },
        });

        if (user && user.password) {
          const isMatch = await compareSync(
            credentials.password as string,
            user.password
          );

          if (isMatch) {
            return {
              id: user.id,
              email: user.email,
              name: user.name,
              role: user.role,
            };
          }
        }

        return null;
      },
    }),
  ],
  callbacks: {
    async session({ session, user, trigger, token }: any) {
      // set user id from the token
      session.user.id = token.sub;
      session.user.role = token.role;
      session.user.name = token.name;

      // if there is an update set the user name
      if (trigger === "update") {
        session.user.name = user.name;
      }
      return session;
    },
    async jwt({ token, user, trigger, session }: any) {
      if (user) {
        token.role = user.role;
        // if use has no name use part of the email as name
        if (user.name == "No_NAME") {
          token.name = user.email.split("@")[0];

          // update the db to reflect the new name
          await prisma.user.update({
            where: {
              id: user.id,
            },
            data: {
              name: token.name,
            },
          });
        }
        if (trigger === "signIn" || trigger === "signUp") {
          const cookiesOjb = await cookies();
          const sessionCartId = cookiesOjb.get("sessionCartId")?.value;

          if (sessionCartId) {
            const sessioncart = await prisma.cart.findFirst({
              where: { sessionCartId },
            });

            if (sessioncart) {

              await prisma.cart.deleteMany({
                where: {userId: user.id}
              })
              // assugn new card
              await prisma.cart.update({
                where: {
                  id: sessioncart.id,
                },
                data: {
                  userId: user.id,
                },
              })
            }
          }
        }
      }

      // handle session update
      if (session?.user.name && trigger==="update") { 
        token.name = session.user.name;

      }
      return token;
    },
    ...authConfig.callbacks,
  },
};

export const { handlers, auth, signIn, signOut } = NextAuth(config);

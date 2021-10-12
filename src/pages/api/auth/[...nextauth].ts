import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import { fauna } from "../../../services/fauna";
import { query as q } from "faunadb";
export default NextAuth({
  providers: [
    Providers.GitHub({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      scope: "read:user",
    }),
  ],
  jwt: {
    signingKey: process.env.SIGININE_KEY,
  },
  callbacks: {
    async signIn(data) {
      const { email } = data;
      try {
        await fauna.query(
          q.Create(q.Collection("users"), {
            data: {
              email,
            },
          })
        );
        return true;
      } catch {
        return false;
      }
    },
  },
});

//scope = dados que eu quero do usuario na autenticação

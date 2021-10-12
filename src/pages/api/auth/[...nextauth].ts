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
  callbacks: {
    async signIn(data) {
      const { email } = data;
      try {
        await fauna.query(
          q.If(
            q.Not(
              q.Exists(
                q.Match(q.Index("users_by_email"), q.Casefold(data.email))
              )
            ),
            q.Create(q.Collection("users"), { data: email }),
            q.Get(q.Match(q.Index("users_by_email"), q.Casefold(data.email)))
          )
        );
        return true;
      } catch {
        return false;
      }
    },
  },
});

//scope = dados que eu quero do usuario na autenticação

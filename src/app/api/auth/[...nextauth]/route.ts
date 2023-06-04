import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

interface Auth {
  id: string;
  email: string;
  accessToken: string;
}

// interface Auth extends User {
//   accessToken: string;
// }

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req): Promise<Auth | null> {
        // send post request to a backend login/sign-up api
        const res = await fetch("http://localhost:3000/api/sign-in", {
          method: "POST",
          body: JSON.stringify({
            userName: credentials?.username,
            password: credentials?.password,
          }),
        });
        const user = await res.json();
        if (res.status != 200) {
          return null;
        }
        return user as Auth;
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    jwt: ({ token, user }) => {
      return { ...token, ...user };
    },
    session: ({ session, token }) => {
      session.user = token as any;
      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

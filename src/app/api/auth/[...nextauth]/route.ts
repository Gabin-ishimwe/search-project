import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        // send post request to a backend login/sign-up api
        const res = await fetch("http://localhost:3000/api/sign-in", {
          method: "POST",
          body: JSON.stringify({
            userName: credentials?.username,
            password: credentials?.password,
          }),
        });
        const user = await res.json();
        console.log(user);

        if (!user) {
          return null;
        }
        return user;
      },
    }),
  ],
  // session: {
  //   strategy: "jwt",
  // },
  pages: {
    signIn: "/login",
    // signOut: "/signup",
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

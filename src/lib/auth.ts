import { getServerSession, type AuthOptions } from 'next-auth';
import GitHubProvider from 'next-auth/providers/github';

export const authOptions: AuthOptions = {
  secret: process.env.AUTH_SECRET,
  providers: [
    GitHubProvider({
      clientId: process.env.AUTH_GITHUB_ID ?? '',
      clientSecret: process.env.AUTH_GITHUB_SECRET ?? '',
      authorization: {
        params: {
          scope: 'read:user user:email user:follow public_repo',
        },
      },
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/signin',
  },
  callbacks: {
    jwt: async ({ token, account }) => {
      if (account?.access_token) {
        token.accessToken = account.access_token;
      }

      return token;
    },
    session: async ({ session, token }) => {
      session.accessToken =
        typeof token.accessToken === 'string' ? token.accessToken : undefined;

      return session;
    },
  },
};

export const getServerAuthSession = () => getServerSession(authOptions);

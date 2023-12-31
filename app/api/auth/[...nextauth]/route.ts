import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { connectToDB } from '@utils/database';
import User from '@models/User';

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  callbacks: {
    async session({ session }) {
      const sessionUser = await User.findOne({
        email: session.user?.email,
      });

      const id = String(sessionUser?._id as string);

      return { ...session, id };
    },

    async signIn({ profile }) {
      if (!profile) {
        return false;
      }

      try {
        await connectToDB();

        const userExists = await User.findOne({
          email: profile.email,
        });

        if (!userExists) {
          await User.create({
            email: profile.email,
            username: profile.name?.replace(' ', '').toLowerCase(),
            //@ts-ignore
            image: profile.picture,
          });
        }

        return true;
      } catch (error) {
        return false;
      }
    },
  },
});

export { handler as GET, handler as POST };

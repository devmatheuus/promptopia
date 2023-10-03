import React from 'react';
import '@styles/globals.css';
import ChildrenInterface from '@interfaces/Children';
import Nav from '@components/Nav';
import Provider from '@components/Provider';
import { useSession } from 'next-auth/react';
import { Session } from 'next-auth/';

export const metadata = {
  title: 'Promptopia',
  description: 'Discover & share AI Prompts',
};

const RootLayout: React.FC<ChildrenInterface> = ({ children }) => {
  const { data: session } = useSession();

  return (
    <html lang="en">
      <body>
        <Provider session={session as Session}>
          <div className="main">
            <div className="gradient" />
          </div>

          <main className="app">
            <Nav />
            {children}
          </main>
        </Provider>
      </body>
    </html>
  );
};

export default RootLayout;

'use client';

import React from 'react';

import { SessionProvider } from 'next-auth/react';
import { ProviderProps } from '@interfaces/Provider';

const Provider: React.FC<ProviderProps> = ({ children, session }) => {
  return <SessionProvider session={session}>{children}</SessionProvider>;
};

export default Provider;

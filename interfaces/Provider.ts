import React from 'react';
import { Session } from 'next-auth';

export interface ProviderProps {
  children: React.ReactNode;
  session: Session;
}

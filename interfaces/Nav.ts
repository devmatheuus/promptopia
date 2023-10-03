import { LiteralUnion, ClientSafeProvider } from 'next-auth/react';
import { BuiltInProviderType } from 'next-auth/providers/index';

export type ProvidersState = Record<
  LiteralUnion<BuiltInProviderType, string>,
  ClientSafeProvider
> | null;

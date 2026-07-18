// src/app/provider.tsx
'use client'; // <-- Esto es obligatorio en Next.js App Router

import React from 'react';
import { Provider } from 'react-redux';
import { store } from '../redux/store';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      {children}
    </Provider>
  );
}
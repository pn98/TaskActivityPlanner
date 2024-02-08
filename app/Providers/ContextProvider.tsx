"use client";

import React from 'react'
import Provider_GlobalStyles from './GlobalStylesProvider';
import GlobalStylesProvider from './GlobalStylesProvider';

interface Props {
    children: React.ReactNode;
}

function ContextProvider({ children }: Props) {
    return <GlobalStylesProvider>{children}</GlobalStylesProvider>
}

export default ContextProvider
"use client";

import React from 'react'
import { GlobalProvider } from '../Context/globalProvider';

interface Props {
    children: React.ReactNode;
}

function ContextProvider({ children }: Props) {
    const [isReady, setIsReady] = React. useState(false);

    React.useEffect (() => {
        setTimeout ( () => { 
            setIsReady (true);
        }, 200);
        }, []);
    
        if (!isReady) {
            return null;
        }

    return <GlobalProvider>{children}</GlobalProvider>
}

export default ContextProvider
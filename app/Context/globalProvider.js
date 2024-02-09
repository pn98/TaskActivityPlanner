"use client";

import React, { createContext, useState, useContext } from "react";
import themes from './themes';

// Sets up a global context for storing and accessing shared data
export const GlobalContext = createContext();
// Initialises a global context for updating shared data
export const GlobalUpdateContext = createContext();

// Defines the GlobalProvider component, which manages global state by initialising the selected theme state and setting the default theme.

export const GlobalProvider = ({ children }) => {
    const [selectedTheme, setSelectedTheme] = useState(0);
    const theme = themes[0];

    return (
        <GlobalContext.Provider value={{
            theme,
        }}>
        <GlobalUpdateContext.Provider value={{}}>
            {children}
        </GlobalUpdateContext.Provider>
        </GlobalContext.Provider>
    );
}

export const useGlobalState = () => useContext(GlobalContext);
export const useGlobalUpdate = () => useContext(GlobalUpdateContext);
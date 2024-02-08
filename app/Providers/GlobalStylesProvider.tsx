"use client";

import React from "react";
import styled from "styled-components";

interface Props {
    children: React.ReactNode;
}

function GlobalStylesProvider({children}: Props) {
    return <GS>{children}</GS>;
}

const GS = styled.div`
    background-color: red;
`;

export default GlobalStylesProvider;

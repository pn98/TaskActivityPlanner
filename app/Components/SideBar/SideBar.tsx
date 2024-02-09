"use client";

import React from "react";
import styled from "styled-components";
import { useGlobalState } from "../../Context/globalProvider";

function Sidebar() {
    const { theme } = useGlobalState();

    console.log(theme);
    return <SidebarStyled> Sidebar </SidebarStyled>;
}

const SidebarStyled = styled.nav`
    width: ${(props) => props.theme.sidebarWidth};
    position: relative;
    background-color: ${(props) => props.theme.colorBg2};
    border-right: 2px solid ${(props) => props.theme.borderColor2}; /* Adjust border width */
    padding-right: 1rem; /* Adjust padding to align content with the border */
    margin-right: -2px; /* Adjust margin to remove space between border and content */
    gap: 1rem;
`;
export default Sidebar;
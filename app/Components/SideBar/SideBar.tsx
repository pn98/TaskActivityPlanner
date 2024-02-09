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
    border radius: 1rem;
    border-right: 2px solid ${(props) => props.theme.borderColor2};
    

`;

export default Sidebar;
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
    width: ${(props) => props.theme.sidebarWidth}
`;

export default Sidebar;
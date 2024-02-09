"use client"

import React from "react";
import styled from "styled-components";
import Image from "next/image"; // Import Image component from next/image
import { useGlobalState } from "../../Context/globalProvider";

function Sidebar() {
    const { theme } = useGlobalState();

    console.log(theme);
    return (
        <SidebarStyled theme={theme}>
            <div className="profile">
                <div className="profile-overlay">
                    {/* Use the imported Image component */}
                    <Image width={70} height={70} src="/DefaultAvatar.png" alt="profile" />
                </div>
            </div>
        </SidebarStyled>
    );
}

const SidebarStyled = styled.nav`
    position: relative;
    width: 350px; /* Adjust the width here */
    background-color: ${(props) => props.theme.colorBg2};
    border: 2px solid white; /* White border */
    border-radius: 1rem;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); /* Grey shadow */
`;

export default Sidebar;

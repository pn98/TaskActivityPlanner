"use client"
import React from "react";
import styled from "styled-components";
import Image from "next/image";
import Link from "next/link";
import { useGlobalState } from "../../Context/globalProvider";
import menu from "../../Utils/MainMenu";

function Sidebar() {
    const { theme } = useGlobalState();

    console.log(theme);
    return (
        <SidebarStyled theme={theme}>
            <div className="profile">
                <div className="profile-content">
                    <div className="profile-overlay">
                        <Image width={140} height={140} src="/DefaultAvatar.png" alt="profile" />
                    </div>
                    <h1>Jack</h1>
                    <h1>Black</h1>
                </div>
            </div>
            <ul className="nav-items">
                {menu.map((item) => {
                    return <li>
                        {item.icon}
                        <Link href={item.link}>
                            {item.title}
                        </Link>
                        </li>
                })}
            </ul>
        </SidebarStyled>
    );
}

const SidebarStyled = styled.nav`
    position: relative;
    width: 350px;
    background-color: ${(props) => props.theme.colorBg2};
    border: 2px solid white;
    border-radius: 1rem;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);

    .profile-overlay {
        padding: 10px;
    }

    /* Flexbox layout for profile content */
    .profile-content {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    /* Styling for the h1 elements */
    h1 {
        margin: 0;
    }
`;

export default Sidebar;

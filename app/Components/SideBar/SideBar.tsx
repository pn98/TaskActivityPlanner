'use client'

import React from "react";
import styled from "styled-components";
import Image from "next/image";
import Link from "next/link";
import { useGlobalState } from "../../Context/globalProvider";
import { usePathname, useRouter } from "next/navigation";
import MainMenu from "../../Utils/MainMenu";

const Profile = styled.div`
  margin: 1.5rem;
  padding: 1rem 0.8rem;
  position: relative;
  border-radius: 1rem;
  cursor: pointer;
  font-weight: 500;
  color: ${(props) => props.theme.colorGrey0};
  display: flex;
  align-items: center;

  .profile-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    backdrop-filter: blur(10px);
    z-index: 0;
    background: ${(props) => props.theme.colorBg3};
    transition: all 0.55s linear;
    border-radius: 1rem;
    border: 2px solid ${(props) => props.theme.borderColor2};
    opacity: 0.2;
  }

  h1 {
    font-size: 1.2rem;
    display: flex;
    flex-direction: column;
    line-height: 1.4rem;
  }

  .image,
  h1 {
    position: relative;
    z-index: 1;
  }

  .image {
    flex-shrink: 0;
    display: inline-block;
    overflow: hidden;
    transition: all 0.5s ease;
    border-radius: 100%;
    width: 70px;
    height: 70px;

    img {
      border-radius: 100%;
      transition: all 0.5s ease;
    }
  }

  > h1 {
    margin-left: 0.8rem;
    font-size: clamp(1.2rem, 4vw, 1.4rem);
    line-height: 100%;
  }

  &:hover {
    .profile-overlay {
      opacity: 1;
      border: 2px solid ${(props) => props.theme.borderColor2};
    }

    img {
      transform: scale(1.1);
    }
  }
`;

const SidebarStyled = styled.nav`
  position: fixed;
  top: 0;
  right: 0; /* Position the sidebar on the right */
  width: 350px;
  background-color: #0d1117;
  border: 2px solid white;
  border-radius: 1rem;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column; 
  color: white;

  .nav-item {
    position: relative;
    padding: 0.8rem 1rem 0.9rem 2.1rem;
    margin: 0.3rem 0;
    display: grid;
    grid-template-columns: 40px 1fr;
    cursor: pointer;
    align-items: center;

    &::after {
      position: absolute;
      content: "";
      left: 0;
      top: 0;
      width: 0;
      height: 100%;
      background-color: rgba(255, 255, 255, 0.1);
      z-index: 1;
      transition: all 0.3s ease-in-out;
    }

    &:hover::after {
      width: 100%;
    }
  }

  .active {
    background-color: #21262d;
  }
`;

function Sidebar() {
  const router = useRouter();
  const pathname = usePathname();
  const { theme } = useGlobalState();

  const handleClick = (link: string) => {
    router.push(link);
  };

  return (
    <SidebarStyled theme={theme}>
      <Profile className="profile">
        <div className="profile-overlay"></div>
        <div className="image">
          <Image width={70} height={70} src="/DefaultAvatar.png" alt="profile" />
        </div>
        <h1>
          <span>Peter</span> <span>Nicholl</span>
        </h1>
      </Profile>
      <ul className="nav-items">
        {MainMenu.map((item) => (
          <li
            key={item.id}
            className={`nav-item ${pathname === item.link ? "active" : ""}`}
            onClick={() => handleClick(item.link)}
          >
            <div className="nav-item-container">
              {item.icon}
              <Link href={item.link}>{item.title}</Link>
            </div>
          </li>
        ))}
      </ul>
    </SidebarStyled>
  );
}

export default Sidebar;

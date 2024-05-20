"use client";
import React from "react"; // importing React
import styled from "styled-components"; // importing styled-components
import { useGlobalState } from "@/app/context/globalProvider"; // importing useGlobalState hook
import Image from "next/image"; // importing Image component from next/image
import menu from "@/app/utils/menu"; // importing menu data
import Link from "next/link"; // importing Link component from next/link
import { usePathname, useRouter } from "next/navigation"; // importing usePathname and useRouter hooks from next/navigation
import Button from "../Button/button"; // importing Button component
import { arrowLeft, bars, logout } from "@/app/utils/Icons"; // importing icons
import { UserButton, useClerk, useUser } from "@clerk/nextjs"; // importing UserButton, useClerk, and useUser hooks from @clerk/nextjs

// Sidebar component
function Sidebar() {
  const { theme, collapsed, collapseMenu } = useGlobalState(); // accessing theme, collapsed state, and collapseMenu function from global state
  const { signOut } = useClerk(); // accessing signOut function from Clerk authentication

  const { user } = useUser(); // accessing user data from Clerk authentication

  const { firstName, lastName, imageUrl } = user || { // destructuring user data or providing default values
    firstName: "",
    lastName: "",
    imageUrl: "",
  };

  const router = useRouter(); // getting router object from useRouter hook
  const pathname = usePathname(); // getting current pathname from usePathname hook

  // function to handle navigation to specified link
  const handleClick = (link: string) => {
    router.push(link); // navigating to specified link
  };

  // rendering the sidebar
  return (
    <SidebarStyled theme={theme}>
      {/* Profile section */}
      <Link href="/profile">
        <Profile className="profile">
          <div className="profile-overlay"></div>
          <div className="image">
            <Image width={70} height={70} src={imageUrl} alt="profile" />
          </div>
          <h1>
            <span>{firstName}</span> <span>{lastName}</span>
          </h1>
        </Profile>
      </Link>

      {/* Navigation items */}
      <ul className="nav-items">
        {menu.map((item) => (
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

      {/* Sign out button */}
      <div className="sign-out relative m-6">
        <Button
          color="black"
          name={"Sign Out"}
          type={"submit"}
          padding={"0.4rem 0.8rem"}
          borderRad={"0.8rem"}
          fw={"500"}
          fs={"1.2rem"}
          icon={logout}
          click={() => {
            signOut(() => router.push("/signin")); // signing out user and redirecting to sign-in page
          }}
        />
      </div>
    </SidebarStyled>
  );
}

// styled profile section
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

  // styling for profile overlay
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

  // styling for profile name
  h1 {
    font-size: 1.2rem;
    display: flex;
    flex-direction: column;
    line-height: 1.4rem;
  }

  // styling for profile image and name
  .image,
  h1 {
    position: relative;
    z-index: 1;
  }

  // styling for profile image
  .image {
    flex-shrink: 0;
    display: inline-block;
    overflow: hidden;
    transition: all 0.5s ease;
    border-radius: 100%;
    width: 70px;
    height: 70px;

    // styling for image inside profile image
    img {
      border-radius: 100%;
      transition: all 0.5s ease;
    }
  }

  // styling on hover
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

// styled sidebar component
const SidebarStyled = styled.nav`
  position: fixed;
  top: 10; // top position of the sidebar
  right: 35px; // right position of the sidebar
  width: 260px; // width of the sidebar
  background-color: white; // background color of the sidebar
  border: 2px solid black; // border of the sidebar
  border-radius: 1rem; // border radius of the sidebar
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); // box shadow of the sidebar
  display: flex;
  flex-direction: column;
  color: black; // text color of the sidebar

  // styling for navigation items
  .nav-item {
    position: relative;
    padding: 0.8rem 1rem 0.9rem 2.1rem;
    margin: 0.3rem 0;
    display: grid;
    grid-template-columns: 40px 1fr;
    cursor: pointer;
    align-items: center;

    // styling for hover effect
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

    // styling for hover effect
    &:hover::after {
      width: 100%;
    }
  }

  // styling for icons
  i {
    display: flex;
    align-items: center;
    color: ; // color of the icons
  }

  // styling for active navigation item
  .active {
    background-color: black; // background color of active navigation item
    color: white; // text color of active navigation item
  }
`;

export default Sidebar; // exporting Sidebar component

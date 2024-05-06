"use client";
import { useGlobalState } from "@/app/context/globalProvider"; // importing global state hook
import React from "react"; // importing React
import styled from "styled-components"; // importing styled-components

// Modal component
interface Props {
  content: React.ReactNode; // content prop for modal content
}

function Modal({ content }: Props) {
  const { closeModal } = useGlobalState(); // accessing closeModal function from global state
  const { theme } = useGlobalState(); // accessing theme from global state

  // rendering the modal component
  return (
    <ModalStyled theme={theme}>
      {/* Overlay for modal */}
      <div className="modal-overlay" onClick={closeModal}></div>
      {/* Modal content */}
      <div className="modal-content">{content}</div>
    </ModalStyled>
  );
}

// styled modal component
const ModalStyled = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  z-index: 100;

  display: flex;
  justify-content: center;
  align-items: center;

  // styling for modal overlay
  .modal-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.45); // semi-transparent black background
    filter: blur(4px); // applying blur effect
  }

  // styling for modal content
  .modal-content {
    margin: 0 1rem;
    padding: 2rem;
    position: relative;
    max-width: 630px;
    width: 100%;
    z-index: 100;
    border-radius: 1rem;
    background-color: ${(props) => props.theme.colorBg2}; // background color from theme
    box-shadow: 0 0 1rem rgba(0, 0, 0, 0.3); // applying box shadow
    border-radius: ${(props) => props.theme.borderRadiusMd2}; // border radius from theme

    // responsive styling
    @media screen and (max-width: 450px) {
      font-size: 90%; // reducing font size for smaller screens
    }
  }
`;

export default Modal; // exporting Modal component

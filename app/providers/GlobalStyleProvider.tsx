"use client";
import React from "react";
import styled from "styled-components";

// define the GlobalStyleProvider component
interface Props {
  children: React.ReactNode;
}

function globalstyleprovider({ children }: Props) {
  return <GlobalStyles>{children}</GlobalStyles>;
}

// define the global styles using styled-components
const GlobalStyles = styled.div`
  display: flex;
  padding: 2.5rem;
  gap: 1rem;
  height: 100%;
`;

export default globalstyleprovider;

"use client";
import React from "react";
import styled from "styled-components";

interface Props {
  children: React.ReactNode;
}

function GlobalStyleProvider({ children }: Props) {
  return <GlobalStyles>{children}</GlobalStyles>;
}

const GlobalStyles = styled.div`
  display: flex;
  padding: 2.5rem;
  gap: 1rem;
  height: 100%;
`;

export default GlobalStyleProvider;

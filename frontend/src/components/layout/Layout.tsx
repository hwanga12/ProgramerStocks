import React from "react";
import Header from "../common/Header";
import styled from "styled-components";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <LayoutStyle>
      <Header />
      <main>{children}</main>
    </LayoutStyle>
  );
};

const LayoutStyle = styled.main`
  width: 100%;
  padding: 24px 48px;

  main {
    padding: 0px 20px;
  }
`;

export default Layout;

import { ReactNode, FC } from "react";
import styled from "styled-components";
import Navbar from "./navbar";

interface ILayout {
  children: ReactNode;
}

export const MainContainer = styled.main`
  min-height: 100vh;
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  margin: 50px 10% 50px 10%;
  padding-bottom: 50px;
`;

const Layout: FC<ILayout> = ({ children }) => {
  return (
    <>
      <Navbar />
      <MainContainer>{children}</MainContainer>
    </>
  );
};

export default Layout;

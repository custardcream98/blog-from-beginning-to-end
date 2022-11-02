import React from "react";
import Head from "next/head";
import styled, { ThemeProvider } from "styled-components";
import { useRecoilValue } from "recoil";
import { isDarkAtom } from "../../lib/atoms";
import { darkTheme, lightTheme } from "../../lib/theme";
import { createGlobalStyle } from "styled-components";
import Navigation from "./Navigation";
import Footer from "./Footer";

export const GlobalStyle = createGlobalStyle`
  body {
      font-family: "Noto Sans", "Noto Sans KR", -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji";
      background-color: ${(props) => props.theme.bgColor};
      color: ${(props) => props.theme.textColor};

      /*
        다크모드 transition
      */
        // TODO: 화면 깜빡임 이슈 해결 필요
      /* transition: all 0.1s linear; */
  }
  html {
    scroll-behavior: smooth;
  }
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: calc(100vh - 50px); // 뷰포트 높이 - Navbar 높이
`;

const Main = styled.main`
  flex-grow: 1;
`;

type Props = {
  children: string | JSX.Element | JSX.Element[] | null;
};

const Layout = ({ children }: Props) => {
  const isDark = useRecoilValue(isDarkAtom);

  return (
    <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
      <GlobalStyle />
      <Head>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Navigation />
      <Wrapper>
        <Main>{children}</Main>
        <Footer />
      </Wrapper>
    </ThemeProvider>
  );
};

export default Layout;

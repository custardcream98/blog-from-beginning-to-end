import React from "react";
import Head from "next/head";
import { ThemeProvider } from "styled-components";
import { useRecoilValue } from "recoil";
import { isDarkAtom } from "../../lib/atoms";
import { darkTheme, lightTheme } from "../../lib/theme";
import { createGlobalStyle } from "styled-components";
import Navigation from "./Navigation";
import Footer from "./Footer";
import getFullURL from "../../lib/url";

export const GlobalStyle = createGlobalStyle`
body {
    font-family: "Noto Sans", "Noto Sans KR", -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji";
    background-color: ${(props) => props.theme.bgColor};
    color: ${(props) => props.theme.textColor};
}
`;

type Props = {
  children: string | JSX.Element | JSX.Element[] | null;
  title?: string;
  description?: string;
  image?: string;
  tags?: string[];
};

const Layout = ({ children, title, description, image, tags }: Props) => {
  const isDark = useRecoilValue(isDarkAtom);

  return (
    <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
      <GlobalStyle />
      <Head>
        <title>{title ?? "Custardcream 개발 블로그"}</title>
        <meta
          property="og:title"
          content={title ?? "Custardcream 개발 블로그"}
        />
        <meta
          name="description"
          content={
            description ??
            "예쁘고 간결한 것을 정말 좋아하는 개발자 박시우의 블로그입니다. 공부한 것들, 공유하고 싶은 내용을 올립니다."
          }
        />
        <meta
          name="og:description"
          content={
            description ??
            "예쁘고 간결한 것을 정말 좋아하는 개발자 박시우의 블로그입니다. 공부한 것들, 공유하고 싶은 내용을 올립니다."
          }
        />
        <meta property="og:url" content={getFullURL()} />
        <meta
          property="og:image"
          content={image ?? "/static/img/thumbnail.png"}
        />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Navigation />
      {children}
      <Footer />
    </ThemeProvider>
  );
};

export default Layout;

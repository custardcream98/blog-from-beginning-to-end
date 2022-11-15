import { ReactNode } from "react";
import { useRecoilValue } from "recoil";
import { createGlobalStyle, ThemeProvider } from "styled-components";
import { isDarkAtom } from "../../lib/atoms";
import useIsMounted from "../../lib/hook/useIsMounted";
import { darkTheme, lightTheme } from "../../lib/theme";

export const GlobalStyle = createGlobalStyle`
  body {
      font-family: "Noto Sans", "Noto Sans KR", -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji";
      background-color: ${(props) => props.theme.bgColor};
      color: ${(props) => props.theme.textColor};

      /*
        다크모드 transition
      */
      transition: all 0.1s linear;
  }
  html {
    scroll-behavior: smooth;
  }
`;

type Props = {
  children: ReactNode;
};

const ThemeProviderLayer = ({ children }: Props) => {
  const isDark = useRecoilValue(isDarkAtom);
  const isMounted = useIsMounted();

  const body = (
    <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
      <GlobalStyle />
      {children}
    </ThemeProvider>
  );

  if (!isMounted) {
    return <div style={{ visibility: "hidden" }}>{body}</div>;
  }

  return body;
};

export default ThemeProviderLayer;

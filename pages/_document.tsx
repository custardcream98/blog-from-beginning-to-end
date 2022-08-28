import React from "react";
import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext,
} from "next/document";
import { ServerStyleSheet } from "styled-components";

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="kr">
        <Head>
          <link rel="icon" type="image/png" href="../static/icon.png" />
          <meta property="og:article:author" content="Custardcream98" />
          <meta property="og:type" content="website" />
          <meta
            name="google-site-verification"
            content="uEQH_kf2TBUnEK9r0_FjuR-nICr97lyWeNkTlQJt1XI"
          />
          <meta
            name="naver-site-verification"
            content="f97b3212948a936aa8bb8d14b7f84ba8d01f9cc1"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Nanum+Myeongjo&family=Noto+Sans+KR:wght@300;600;700&family=Noto+Sans:wght@300;600;700&family=Poppins:wght@800&family=Source+Code+Pro:wght@800&display=optional"
            rel="stylesheet"
          />
          {this.props.styles}
        </Head>

        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

MyDocument.getInitialProps = async (ctx: DocumentContext) => {
  const sheet = new ServerStyleSheet();
  const originalRenderPage = ctx.renderPage;

  try {
    ctx.renderPage = () =>
      originalRenderPage({
        enhanceApp: (App) => (props) => sheet.collectStyles(<App {...props} />),
      });

    const initialProps = await Document.getInitialProps(ctx);
    return {
      ...initialProps,
      styles: [initialProps.styles, sheet.getStyleElement()],
    };
  } finally {
    sheet.seal();
  }
};

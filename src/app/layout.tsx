import { ClientLogger, ProjectAd } from "src/components/client";

import { IsDarkmodeActivatedContextProvider } from "./_client/context";
import { Navigation } from "./_client";
import { Footer } from "./_components";

import "@fontsource/noto-sans-kr/300.css";
import "@fontsource/noto-sans-kr/500.css";
import "@fontsource/noto-sans-kr/700.css";
import "@fontsource/noto-sans-kr/900.css";
import "@fontsource/source-code-pro/800.css";
import "@fontsource/poppins/500.css";
import "@fontsource/poppins/600.css";
import "./style.css";

import Script from "next/script";
import DevportImage from "public/static/ad/devport.png";
import { type PropsWithChildren } from "react";
import { utld } from "utility-class-components";

export { metadata } from "./metadata";

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang='ko' className='dark scroll-smooth'>
      <head>
        <link rel='icon' type='image/png' href='../static/icon.png' />
        <meta
          name='google-site-verification'
          content='uEQH_kf2TBUnEK9r0_FjuR-nICr97lyWeNkTlQJt1XI'
        />
        <meta name='naver-site-verification' content='f97b3212948a936aa8bb8d14b7f84ba8d01f9cc1' />
        {
          // 구글 Analytics
        }
        <Script
          strategy='afterInteractive'
          async
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID}`}
        />
        <Script id='google-analytics' strategy='afterInteractive'>
          {`window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID}');`}
        </Script>
      </head>
      <Body>
        <IsDarkmodeActivatedContextProvider>
          <Navigation />
          <Wrapper>
            <Main>{children}</Main>
            <Footer />
          </Wrapper>
          <ProjectAd
            projectName='이력서 기반 예상 면접 질문 생성기'
            projectLink='https://devport.swygbro.com/'
            repositoryLink='https://github.com/custardcream98/DevPort'
            projectImage={DevportImage}
          />
        </IsDarkmodeActivatedContextProvider>
        <ClientLogger />
      </Body>
    </html>
  );
}

const Body = utld.body`
  font-sans
  text-default-light
  dark:text-default-dark
  bg-bg-light
  dark:bg-bg-dark

  transition-all
  duration-100

  print:bg-transparent
`;

const Wrapper = utld.div`
  flex
  flex-col
  min-h-[calc(100vh-50px)]
`;

const Main = utld.main`
  flex-1
  print:mt-[-2rem]
`;

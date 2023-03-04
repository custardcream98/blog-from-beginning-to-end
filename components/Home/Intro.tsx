import Image from "next/image";
import styled, { keyframes } from "styled-components";

const textClipKeyframes = keyframes`
  to {
    background-position: 200% center;
  }
`;

const Wrapper = styled.div`
  width: 90vw;
  max-width: 800px;
  margin: 5rem auto 2rem;

  display: flex;
  flex-direction: column;
`;

const TitleContainer = styled.p`
  font-family: "Poppins";
  font-size: 3.5rem;
  line-height: 1.2;
  font-weight: 600;

  em {
    background-image: linear-gradient(
      -225deg,
      #3c2395 0%,
      #44107a 17%,
      #ff1361 33%,
      #fff800 50%,
      #ff1361 66%,
      #44107a 83%,
      #3c2395 100%
    );
    background-size: 200% auto;
    color: #fff;
    background-clip: text;
    display: inline-block;
    height: 4.4rem;

    text-fill-color: transparent;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    -webkit-background-clip: text;

    animation: ${textClipKeyframes} 3s linear infinite;
  }

  @media (max-width: 800px) {
    align-self: center;
    font-size: 2rem;
    em {
      height: 2.5rem;
    }
  }
`;

const IntroName = styled.strong`
  display: block;
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  font-family: "Poppins";
  color: ${({ theme }) => theme.textColor};

  @media (max-width: 800px) {
    font-size: 1rem;
    margin-bottom: 0.2rem;
  }
`;

const IntroParagraph = styled.p`
  font-size: 1rem;

  color: ${({ theme }) => theme.subTextColor};

  line-height: 1.2;

  text-align: end;

  @media (max-width: 800px) {
    font-size: 0.8rem;
  }
`;

const ImageWrapper = styled.span`
  display: inline-block;
  border-radius: 50%;

  overflow: hidden;
  width: 90px;
  height: 90px;
  margin-left: 1rem;
  border: 2px solid ${({ theme }) => theme.subTextColor};
`;

const ProfileWrapper = styled.div`
  margin-top: 5rem;
  align-self: flex-end;

  display: flex;
  align-items: center;
`;

const Intro = () => {
  return (
    <Wrapper>
      <TitleContainer>
        Dedicated to <em>Coding.</em>
      </TitleContainer>
      <ProfileWrapper>
        <IntroParagraph>
          <IntroName>Shi Woo, Park</IntroName>
          <span>만들고 싶으면 만들어야지.</span>
        </IntroParagraph>
        <ImageWrapper>
          <Image
            src="/static/img/profile.webp"
            width={150}
            height={150}
          />
        </ImageWrapper>
      </ProfileWrapper>
    </Wrapper>
  );
};
export default Intro;

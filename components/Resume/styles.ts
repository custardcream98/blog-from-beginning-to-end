import {
  Container as DefaultContainer,
  animatedGradientTextStyle,
} from "components/Common/styledComponents";
import styled, { css } from "styled-components";

export const MainTitle = styled.h2`
  font-size: 2rem;
  font-weight: 300;
  line-height: 1.5;

  word-break: keep-all;

  .line {
    display: block;
  }
  .strong {
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
    ${animatedGradientTextStyle}
    display:inline;

    font-weight: 600;
  }
`;

export const Container = styled(DefaultContainer)`
  align-items: start;

  padding-top: 6rem;
`;

export const Section = styled.section`
  margin-top: 4rem;
  margin-bottom: 4rem;

  color: ${({ theme }) => theme.resumeTextColor};
`;

export const SectionTitle = styled.h3`
  font-size: 1.7rem;
  font-weight: 600;
  margin-bottom: 1.7rem;
`;

export const SectionItemList = styled.ul``;

export const SectionItem = styled.li`
  margin-top: 3rem;
  & + & {
    margin-top: 7rem;
  }
`;

export const SectionItemBordered = styled(SectionItem)`
  list-style: none;
  padding-left: 1rem;
  border-left: 1px solid #ccc;
`;

export const ProjectTitle = styled.h4`
  font-size: 1.1rem;
  font-weight: 400;
  margin-bottom: 0.5rem;

  word-break: keep-all;
  line-height: 1.2;
`;

export const dimTextStyle = css`
  color: ${({ theme }) => theme.resumeDimTextColor};

  font-size: 0.9rem;
  font-weight: 300;

  letter-spacing: 0.02rem;
`;

export const ProjectTeam = styled.span`
  ${dimTextStyle}

  margin-bottom: 0.2rem;
  display: block;

  word-break: keep-all;
  line-height: 1.2;
`;

export const ProjectShortDescription = styled.p`
  margin-top: 1rem;

  font-weight: 300;
  font-size: 0.9rem;

  line-height: 1.6;

  letter-spacing: 0.04em;
`;

export const ProjectDescriptionList = styled.ul`
  margin-top: 1.5rem;

  font-weight: 300;
  font-size: 0.9rem;

  letter-spacing: 0.03em;
  line-height: 1.5;
`;

export const ProjectDescriptionItem = styled.li`
  margin: 0.4rem 0 0.4rem 0.4rem;
  padding-left: 0.6rem;

  ::marker {
    content: "-";

    font-size: 1rem;
    font-weight: 600;

    color: ${({ theme }) => theme.resumeAccentColor};
  }
`;

export const ProjectStacks = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
`;

export const ProjectStack = styled.li`
  font-size: 0.8rem;
  font-weight: 300;

  padding: 0.2rem 0.4rem;
  border-radius: 0.2rem;

  color: ${({ theme }) => theme.resumeBadgeTextColor};
  background-color: ${({ theme }) =>
    theme.resumeBadgeBackgroundColor};
`;

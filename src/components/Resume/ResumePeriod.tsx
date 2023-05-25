import { convertYYMMToKorean } from "src/lib/utils/string";
import type { Period } from "src/types/resume";

import { dimTextStyle } from "./styles";

import styled from "styled-components";

function ResumePeriod({ from, to }: Period) {
  if (to) {
    if (from === to) {
      return (
        <ResumePeriodContainer>
          <time dateTime={from}>{convertYYMMToKorean(from)}</time>
        </ResumePeriodContainer>
      );
    }

    return (
      <ResumePeriodContainer>
        <time dateTime={from}>{convertYYMMToKorean(from)}</time>
        <time dateTime={to}>{convertYYMMToKorean(to)}</time>
      </ResumePeriodContainer>
    );
  }

  return (
    <ResumePeriodContainer>
      <time dateTime={from}>{convertYYMMToKorean(from)}</time>
      <span>진행중</span>
    </ResumePeriodContainer>
  );
}

export const ResumePeriodContainer = styled.span`
  ${dimTextStyle}
  display: inline-block;
  margin-top: 0.2rem;
  margin-bottom: 0.2rem;

  time:first-child {
    + time,
    + span {
      ::before {
        content: "~";
        margin: 0 0.3rem;
      }
    }
  }

  @media only print {
    position: absolute;
    top: 0;
    right: 0;
  }
`;

export default ResumePeriod;

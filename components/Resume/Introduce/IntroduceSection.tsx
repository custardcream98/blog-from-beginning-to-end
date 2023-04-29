import styled from "styled-components";
import { ResumeLink, S } from "..";

const IntroduceSection = () => {
  return (
    <S.Section>
      <h3 className="sr-only">자기 소개</h3>
      <IntroduceP>
        졸업작품 어플리케이션 개발에 매일 3시간만 자며
        매달렸을 만큼 아무리 사소한 문제라도{" "}
        <strong>꼭 해결해야만 직성이 풀리는 성격</strong>
        입니다.
      </IntroduceP>
      <IntroduceP>
        <strong>
          기술 이야기 나누기를 아주 좋아합니다.
        </strong>{" "}
        Google Student Clubs UOS에서 프론트엔트 팀 코어
        멤버로서 활동하며 데일리 스크럼과 주기적인 테크톡을
        진행하였습니다. 프론트엔드 기술과 관련된 아티클을
        나누고 싶어 직접 오픈카톡방을 운영중이기도 합니다.
      </IntroduceP>
      <IntroduceP>
        <strong>
          좋은 커뮤니케이션 방법과 협력 방법을 항상
          고민합니다.
        </strong>{" "}
        부트캠프에서 회고조 조장, 팀 프로젝트 리드를 맡아
        프로젝트의 성공을 이끌었고, 도움이 필요한 동료를
        위해 직접 특강을 열기도 했습니다. Wavve Tech
        Internship에서 Agile 방법론을 적용해 협업하고,
        팀원들과 함께 팀의 문화를 만들어가는 것을
        즐겼습니다.
      </IntroduceP>
      <ContactList>
        <li>
          <ResumeLink
            name="custardcream@kakao.com"
            url="mailto:custardcream@kakao.com"
          />
        </li>
        <li>
          <ResumeLink
            name="GitHub"
            url="https://github.com/custardcream98"
          />
        </li>
      </ContactList>
    </S.Section>
  );
};

const IntroduceP = styled.p`
  margin-top: 1.2rem;
  line-height: 1.7;
  font-weight: 300;
  letter-spacing: 0.03rem;

  strong {
    font-weight: 600;
    color: #fff;
  }
`;

const ContactList = styled.ul`
  margin-left: auto;
  margin-top: 2.5rem;

  width: fit-content;

  font-weight: 300;

  > li {
    display: inline-block;
    + li {
      margin-left: 1rem;
    }
  }
`;

export default IntroduceSection;

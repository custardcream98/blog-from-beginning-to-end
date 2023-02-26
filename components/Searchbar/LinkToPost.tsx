import Link from "next/link";
import styled from "styled-components";

import { cssOutlineOnFocus } from "components/Layout/Navigation/styles";
import LinkIcon from "components/Common/LinkIcon";

const StyledLink = styled.a`
  display: block;
  align-self: end;

  width: 20px;
  height: 20px;

  margin: 0 10px;

  .link-icon {
    width: 100%;
    height: 100%;
    stroke: ${({ theme }) => theme.textColor};
    :hover {
      stroke: ${({ theme }) => theme.accentColor};
    }
  }

  ${cssOutlineOnFocus}
`;

type Props = {
  slug: string;
  title: string | string[];
  closeResults: () => void;
};

export default function LinkToPost({
  slug,
  title,
  closeResults,
}: Props) {
  title =
    typeof title === "string" ? title : title.join("");

  const id = "link-icon_" + title.replaceAll(" ", "_");

  return (
    <Link href={`/posts/${slug}`} passHref>
      <StyledLink
        className="result-link"
        onClick={closeResults}
      >
        <LinkIcon
          id={id}
          title={`${title} 포스트로 이동하기`}
        />
      </StyledLink>
    </Link>
  );
}

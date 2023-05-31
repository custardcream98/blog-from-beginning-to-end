import LinkIcon from "src/components/Common/LinkIcon";
import { cssOutlineOnFocus } from "src/components/Layout/Navigation/styles";

import Link from "next/link";
import { utld } from "utility-class-components";

const StyledLink = utld(Link)`
  block
  self-end

  w-5
  h-5

  mx-[10px]

  ${cssOutlineOnFocus}

  [&>.link-icon]:(
    w-full
    h-full
    stroke-default-light
    hover:stroke-accent

    dark:stroke-default-dark
    dark:hover:stroke-accent 
  )
`;

type Props = {
  slug: string;
  title: string | string[];
  closeResults: () => void;
};

export default function LinkToPost({ slug, title, closeResults }: Props) {
  title = typeof title === "string" ? title : title.join("");

  const id = "link-icon_" + title.replaceAll(" ", "_");

  return (
    <StyledLink
      href={{
        pathname: "/posts/[slug]",
        query: { slug: slug },
      }}
      className='result-link'
      onClick={closeResults}
    >
      <LinkIcon id={id} title={`${title} 포스트로 이동하기`} />
    </StyledLink>
  );
}

import type PostType from "src/types/post";

import Link from "next/link";
import { utld } from "utility-class-components";

type PrevNextPostFormationType = "both" | "prev-only" | "next-only";

const Container = utld.aside<{
  formation: PrevNextPostFormationType;
}>`
  w-full
  mt-24
  mb-10

  flex
  justify-between
  gap-6

  mobile:flex-col
  mobile:gap-2

  ${({ formation }) => formation === "next-only" && "text-right"}
`;

const LinkWrapper = utld(Link)`
  w-full
  inline-block

  break-keep

  transition-[color]

  [&+&]:text-right

  [&>span:first-child]:(
    text-[0.8rem]
    mb-1
    block
    mobile:text-[0.6rem]
  )

  [&>span:last-child]:(
    text-[1rem]
    h-[2.84375rem]
    line-clamp-2
    mobile:text-[0.8rem]
    mobile:h-[2.2rem]
  )

  hover:(
    text-accent-light
    dark:text-accent-dark
  )
`;

type Props = PostType;

export default function PrevNextPost({ prevSlug, prevTitle, nextSlug, nextTitle }: Props) {
  const formation: PrevNextPostFormationType =
    prevTitle && nextTitle ? "both" : prevTitle ? "prev-only" : "next-only";

  return (
    <Container formation={formation}>
      {prevTitle && (
        <LinkWrapper
          href={{
            pathname: "/posts/[slug]",
            query: { slug: prevSlug },
          }}
        >
          <span>← 이전글</span>
          <span className='pl-3'>{prevTitle}</span>
        </LinkWrapper>
      )}
      {nextTitle && (
        <LinkWrapper
          href={{
            pathname: "/posts/[slug]",
            query: { slug: nextSlug },
          }}
        >
          <span>다음글 →</span>
          <span className='pr-3'>{nextTitle}</span>
        </LinkWrapper>
      )}
    </Container>
  );
}

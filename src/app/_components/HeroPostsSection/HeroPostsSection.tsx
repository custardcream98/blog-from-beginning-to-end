import { Container } from "src/components";

import { Paging } from "../Paging";

import { HeroPost } from "./HeroPost";

import PostByPageArr from "cache/postByPageArr.json";
import { utld } from "utility-class-components";

const PAGE_SCALE = PostByPageArr.length;

export function HeroPostsSection({ page }: { page?: string }) {
  const parsedPage = page ? parseInt(page, 10) : 1;
  const isValidPage = parsedPage > 0 && parsedPage <= PAGE_SCALE;
  const pageIndex = isValidPage ? parsedPage - 1 : 0;
  const posts = PostByPageArr[pageIndex];

  return (
    <Container>
      <h2 id='Posts_Title' className='sr-only'>
        {"<Posts />"}
      </h2>
      <HeroPostList>
        {posts.map((post, i) => (
          <HeroPost
            key={post.slug}
            index={i}
            maxPostCount={posts.length}
            title={post.title}
            date={post.date}
            excerpt={post.excerpt}
            slug={post.slug}
          />
        ))}
      </HeroPostList>
      <Paging pageScale={PAGE_SCALE} currentPage={parsedPage} />
    </Container>
  );
}

const HeroPostList = utld.ol`
  min-h-[37rem]
  mobile:min-h-[32.9375rem]
`;

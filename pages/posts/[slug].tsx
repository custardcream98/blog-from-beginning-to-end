import styled from "styled-components";

import Meta from "../../components/Layout/Meta";
import { Container } from "../../components/Common/styledComponents";
import PostTitle from "../../components/Post/PostTitle";
import Comments from "../../components/Comment/Comments";
import PrevNextPostBtn from "../../components/Post/PrevNextPostBtn";

import {
  getPostBySlug,
  getAllPosts,
  getOgImage,
  getPrevNextPosts,
} from "../../lib/api";
import markdownToHtml from "../../lib/markdownToHtml";
import { createPostDoc } from "../../lib/firebaseSetup/firebaseApps";
import check404 from "../../lib/check404";

import type PostType from "../../interfaces/post";
import MarkdownBody from "../../components/Common/MarkdownBody";

const PostSection = styled.section`
  width: 100%;
`;

const PostContainer = styled(Container)`
  max-width: 680px;
`;

type Props = {
  post: PostType;
};

export default function Post({ post }: Props) {
  check404();

  return (
    <>
      <Meta
        title={post.title}
        description={post.excerpt}
        image={post.coverImage}
        tags={post.category}
      />
      <PostContainer>
        <PostSection>
          <PostTitle
            coverImage={post.coverImage}
            title={post.title}
            category={post.category}
            date={post.date}
            series={post.series}
          />
          <MarkdownBody content={post.content} />
        </PostSection>
        <PrevNextPostBtn post={post} />
        <Comments title={post.title.replaceAll("/", ",")} />
      </PostContainer>
    </>
  );
}

type Params = {
  params: {
    slug: string;
  };
};

export async function getStaticProps({ params }: Params) {
  const post = getPostBySlug(params.slug, [
    "title",
    "date",
    "slug",
    "excerpt",
    "content",
    "ogImage",
    "coverImage",
    "category",
    "series",
  ]);

  const prevNextPosts = getPrevNextPosts(params.slug);

  await createPostDoc(post.title);

  const content = await markdownToHtml(post.content || "");

  let coverImage = "";
  if (process.env.NODE_ENV === "production")
    coverImage = await getOgImage(post.title);

  return {
    props: {
      post: {
        ...post,
        content,
        coverImage,
        prevTitle: prevNextPosts.prevTitle ?? null,
        prevSlug: prevNextPosts.prevSlug ?? null,
        prevExcerpt: prevNextPosts.prevExcerpt ?? null,
        nextTitle: prevNextPosts.nextTitle ?? null,
        nextSlug: prevNextPosts.nextSlug ?? null,
        nextExcerpt: prevNextPosts.nextExcerpt ?? null,
      },
    },
  };
}

export async function getStaticPaths() {
  const posts = getAllPosts(["slug"]);

  return {
    paths: posts.map((post) => {
      return {
        params: {
          slug: post.slug,
        },
      };
    }),
    fallback: false,
  };
}

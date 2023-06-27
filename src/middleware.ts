import HASH_REVERSERSED_MAP from "cache/hashReversedSlug.json";
import SLUG_MAP from "cache/slug.json";
import { type NextRequest, NextResponse } from "next/server";

const HTTP_STATUS_CODE_MOVED_PERMANENTLY = 308;

const isKoreanSlug = (target: string): target is keyof typeof SLUG_MAP => target in SLUG_MAP;
const isHashedSlug = (target: string): target is keyof typeof HASH_REVERSERSED_MAP =>
  target in HASH_REVERSERSED_MAP;

/**
 * Next.js 13에서 한글 경로를 지원하지 않는 이슈로 인해
 * 기존에 사용되던 한글 경로들을
 * 새로운 hased path로 리다이렉트 시켜주는 미들웨어
 */
export function middleware(request: NextRequest) {
  const [, pathname, postId] = request.nextUrl.pathname.split("/");

  if (pathname !== "posts") return NextResponse.next();

  const slugAble = decodeURIComponent(postId);
  if (isKoreanSlug(slugAble)) {
    return NextResponse.redirect(
      new URL(`/posts/${SLUG_MAP[slugAble]}`, request.url),
      HTTP_STATUS_CODE_MOVED_PERMANENTLY,
    );
  }

  if (isHashedSlug(slugAble)) {
    return NextResponse.redirect(
      new URL(`/posts/${HASH_REVERSERSED_MAP[slugAble]}`, request.url),
      HTTP_STATUS_CODE_MOVED_PERMANENTLY,
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/posts/(.*)",
};

import { Children } from "react";
import Image from "next/image";
import Link from "next/link";
import styled from "styled-components";

import CategoryBadges from "components/Common/CategoryBadges";
import DateSpan from "components/Common/DateSpan";
import ViewsLikesCounter from "./ViewsLikesCounter";
import { LinkDecorated } from "components/Common/styledComponents";
import { CoverImage } from "types/post";
import { useRecoilValue } from "recoil";
import { isDarkAtom } from "lib/atoms";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 2rem;
  border-bottom: 3px solid #25282c;
  margin-bottom: 1rem;
  width: 100%;
`;

const Title = styled.h2`
  color: ${({ theme }) => theme.textColor};
  word-break: keep-all;
  font-weight: 800;
  font-size: 1.8em;
  line-height: 1.25;
`;
const SeriesName = styled(LinkDecorated)`
  margin-bottom: 5px;
  font-size: 1em;
  color: ${({ theme }) => theme.subTextColor};
`;

const DateSpanforTitle = styled(DateSpan)`
  margin-top: 1.1rem;
  font-weight: 400;
`;

const Thumbnail = styled(Image)`
  width: 100%;
  border-radius: 4px;
`;

const BadgeViewsLikesCounterContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

type Props = {
  coverImage: CoverImage;
  title: string;
  category?: string[];
  date: string;
  series?: string;
};

const PostTitle = ({
  coverImage,
  title,
  category,
  date,
  series,
}: Props) => {
  const isDarkMode = useRecoilValue(isDarkAtom);

  return (
    <>
      <Container>
        {series && (
          <Link
            href={`/series/${encodeURI(series)}`}
            passHref
          >
            <SeriesName>{series}</SeriesName>
          </Link>
        )}
        <Title>{title}</Title>
        <DateSpanforTitle date={date} />
        <BadgeViewsLikesCounterContainer>
          {category && (
            <CategoryBadges>
              {Children.toArray(
                category.map((keyword) => (
                  <CategoryBadges.Badge
                    category={keyword}
                  />
                ))
              )}
            </CategoryBadges>
          )}
          {process.env.NODE_ENV === "production" && (
            <ViewsLikesCounter key={title} title={title} />
          )}
        </BadgeViewsLikesCounterContainer>
      </Container>
      {process.env.NODE_ENV === "production" &&
        (isDarkMode ? (
          <Thumbnail
            key={coverImage.darkThumbnail}
            src={coverImage.darkThumbnail}
            alt="썸네일"
            priority={true}
            width={1200}
            height={630}
            placeholder="blur"
            blurDataURL="/static/img/thumbnail-placeholder-dark.webp"
          />
        ) : (
          <Thumbnail
            key={coverImage.lightThumbnail}
            src={coverImage.lightThumbnail}
            alt="썸네일"
            priority={true}
            width={1200}
            height={630}
            placeholder="blur"
            blurDataURL="/static/img/thumbnail-placeholder-light.webp"
          />
        ))}
    </>
  );
};

export default PostTitle;

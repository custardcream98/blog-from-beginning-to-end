"use client";

import useComments from "src/hook/useComments";

import { CommentsSection } from "./CommentsSection";

type CommentsProps = {
  postTitle: string;
};

export function Comments({ postTitle }: CommentsProps) {
  const comments = useComments(postTitle);

  return (
    <CommentsSection postTitle={postTitle}>
      <CommentsSection.Title>Comments({comments.length})</CommentsSection.Title>
      <CommentsSection.Form key={postTitle} />
      <CommentsSection.List>
        {comments.map((commentData) => (
          <CommentsSection.Item key={commentData.id} commentId={commentData.id} {...commentData} />
        ))}
      </CommentsSection.List>
    </CommentsSection>
  );
}

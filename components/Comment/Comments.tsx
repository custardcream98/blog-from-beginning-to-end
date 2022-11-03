import React, { useState, useEffect } from "react";
import styled from "styled-components";
import CommentForm from "./CommentForm";
import CommentCard from "./CommentCard";
import ICommentData from "../../interfaces/comment";
import { getComments } from "../../lib/firebaseSetup/firebaseApps";

const Container = styled.section`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const CommentsTitle = styled.h3`
  width: 100%;
  font-weight: 500;
  font-size: 1.5rem;
  padding-bottom: 0.5rem;
  margin-bottom: 1rem;
  border-bottom: 3px solid #25282c;
`;

type Props = {
  title: string;
};

const Comments = ({ title }: Props) => {
  const [comments, setComments] = useState<ICommentData[]>([]);

  useEffect(() => {
    const unSubscribeComments = getComments(title, setComments);

    return () => unSubscribeComments();
  }, [title]);

  return (
    <Container>
      <CommentsTitle>Comments({comments.length})</CommentsTitle>
      <CommentForm title={title} />
      <ol>
        {React.Children.toArray(
          comments.map((comment) => <CommentCard comment={comment} title={title} />)
        )}
      </ol>
    </Container>
  );
};

export default Comments;

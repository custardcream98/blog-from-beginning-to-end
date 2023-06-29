import { CommentData } from "src/types/comment";
import {
  encodeToPercentString,
  getRequestBody,
  parseSearchParams,
  sortObjectArray,
} from "src/utils";

import type { TitleRequest } from "../_types";
import { addDoc, getCollectionSnapshot, getCommentCollectionRef } from "../_utils";

import { StatusCodes } from "http-status-codes";
import { NextResponse } from "next/server";

export async function GET(request: Request): Promise<NextResponse> {
  const { title } = parseSearchParams<TitleRequest>(request.url);

  if (!title) {
    return NextResponse.json(
      { message: "잘못된 요청입니다. (title이 없습니다.)" },
      { status: StatusCodes.BAD_REQUEST },
    );
  }

  const encodedTitle = encodeToPercentString(title);

  const commentCollectionRef = getCommentCollectionRef(encodedTitle);

  const commentSnapshot = await getCollectionSnapshot(commentCollectionRef);
  const commentsUnordered = commentSnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
  const comments = sortObjectArray(commentsUnordered, "createdAt");

  return NextResponse.json({ data: comments });
}

export type PostCommentRequestBody = {
  title: string;
  password: string;
  comment: string;
  username: string;
};
export async function POST(request: Request): Promise<NextResponse> {
  const { title, password, comment, username } = await getRequestBody<PostCommentRequestBody>(
    request,
  );

  if (!title || !password || !comment || !username) {
    return NextResponse.json(
      { message: "잘못된 요청입니다. (데이터가 없습니다.)" },
      { status: StatusCodes.BAD_REQUEST },
    );
  }

  const isPasswordLengthInvalid = password.length <= 3;
  if (isPasswordLengthInvalid) {
    return NextResponse.json(
      { message: "잘못된 요청입니다. (password가 너무 짧습니다.)" },
      { status: StatusCodes.BAD_REQUEST },
    );
  }

  const encodedTitle = encodeToPercentString(title);
  const commentCollectionRef = getCommentCollectionRef(encodedTitle);
  const newCommentDocData: Omit<CommentData, "id"> = {
    comment,
    createdAt: Date.now(),
    password,
    username,
  };

  const result = await addDoc(commentCollectionRef, newCommentDocData);

  return NextResponse.json({ data: { created: result.id } });
}

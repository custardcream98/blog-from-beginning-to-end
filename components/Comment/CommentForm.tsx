import React, { useState } from "react";
import { Rings } from "react-loader-spinner";
import styled, { useTheme } from "styled-components";
import { addComment } from "../../lib/firebaseSetup/firebaseApps";

const Form = styled.form`
  width: 100%;
  margin-bottom: 1rem;
`;

const NamePasswordContainer = styled.div`
  display: flex;
  width: 100%;
`;

const Input = styled.input`
  padding-left: 0.3rem;
  width: 50%;
  height: 1.9rem;
  box-sizing: border-box;
  outline-width: 0;
  color: ${(props) => props.theme.textColor};
  background-color: transparent;
  border: 1px solid ${(props) => props.theme.textColor};
  border-bottom: none;
  outline-color: ${(props) => props.theme.textColor};
  :first-of-type {
    border-top-left-radius: 4px;
  }
  :last-of-type {
    border-left: none;
    border-top-right-radius: 4px;
  }
`;

const SubmitBtn = styled.input`
  width: 3rem;
  text-align: center;
  color: ${(props) => props.theme.bgColor};
  background-color: ${(props) => props.theme.textColor};
  border-color: transparent;
  border-bottom-right-radius: 4px;
  &:hover {
    cursor: pointer;
  }
`;

const Textarea = styled.textarea`
  resize: none;
  width: 100%;
  height: 4rem;
  font-size: 0.9rem;
  padding: 0.5rem;
  color: ${(props) => props.theme.textColor};
  background-color: transparent;
  border: 1px solid ${(props) => props.theme.textColor};
  outline-width: 0;
  font-family: ${(props) => props.theme.mainFont};
  border-bottom-left-radius: 4px;
`;

const LoadingBtn = styled.div`
  height: 4rem;
  width: 3rem;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.textColor};
`;

const SubmitContainer = styled.div`
  display: flex;
`;

type Props = {
  title: string;
};

const CommentForm = ({ title }: Props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [comment, setComment] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const theme = useTheme();

  const onChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    switch (event.target.name) {
      case "username":
        setUsername(event.target.value);
        break;
      case "password":
        setPassword(event.target.value);
        break;
      case "comment":
        setComment(event.target.value);
        break;
    }
  };

  const onSubmit = async (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    event.stopPropagation();

    setIsLoading(true);

    await addComment({ title, password, comment, username });
    await fetch(`https://${process.env.NEXT_PUBLIC_HOST}/api/alert-sw`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        postTitle: title,
        username,
        comment,
        linkToPost: window.location.href,
      }),
    })
      .then(async (response) => {
        if (!response.ok) throw Error();
      })
      .catch((error) => {
        // ignore
      });

    setComment("");
    setPassword("");
    setUsername("");
    setIsLoading(false);
  };

  return (
    <Form onSubmit={onSubmit}>
      <NamePasswordContainer>
        <Input
          type="text"
          name="username"
          placeholder="닉네임"
          required
          onChange={onChange}
          value={username}
        />
        <Input
          type="password"
          name="password"
          placeholder="비밀번호"
          required
          minLength={4}
          onChange={onChange}
          value={password}
        />
      </NamePasswordContainer>
      <SubmitContainer>
        <Textarea name="comment" onChange={onChange} value={comment} required />
        {isLoading ? (
          <LoadingBtn>
            <Rings color={theme.bgColor} width="2rem" />
          </LoadingBtn>
        ) : (
          <SubmitBtn type="submit" value="입력" />
        )}
      </SubmitContainer>
    </Form>
  );
};

export default CommentForm;

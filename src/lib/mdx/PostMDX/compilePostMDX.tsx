import "server-only";

import { postMDXOptions } from "../options";

import { postComponents } from "./components";

import "./post.css";

import { compileMDX, type MDXRemoteProps } from "next-mdx-remote/rsc";

export const compilePostMDX = async (source: MDXRemoteProps["source"]) => {
  const { content } = await compileMDX({
    components: postComponents,
    options: postMDXOptions,
    source,
  });

  return content;
};

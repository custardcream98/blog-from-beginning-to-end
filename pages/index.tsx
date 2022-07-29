import React from "react";
import Head from "next/head";
import Image from "next/image";
import Navigation from "../components/Navigation";
import Post from "../interfaces/post";
import { getAllPosts } from "../lib/api";

type Props = {
  allPosts: Post[];
};

const Home = ({ allPosts }: Props) => {
  console.log(allPosts);

  return (
    <>
      <Navigation />
    </>
  );
};

export default Home;

export const getStaticProps = async () => {
  const allPosts = getAllPosts([
    "title",
    "date",
    "slug",
    "author",
    "coverImage",
    "excerpt",
  ]);

  return {
    props: { allPosts },
  };
};

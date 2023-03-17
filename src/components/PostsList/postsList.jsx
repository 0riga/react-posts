import s from "./index.module.css";
import Post from "../Post/post";
import Filter from "../Filter/filter";
import Pagination from "../Pagination/pagination";
import { useState } from "react";
import { useEffect } from "react";

export const PostsList = ({ posts }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 8;
  const pageCount = Math.ceil(posts.length / postsPerPage);
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  useEffect(() => {
    !currentPosts.length && setCurrentPage(pageCount);
  }, [currentPosts.length, pageCount]);

  return (
    <>
      <Filter />
      <div className={s.postList}>
        {currentPosts?.map((item) => (
          <Post key={item._id} {...item} />
        ))}
      </div>
      {pageCount >= 2 ? (
        <Pagination
          currentPage={currentPage}
          pageCount={pageCount}
          onPageChange={handlePageChange}
        />
      ) : null}
    </>
  );
};

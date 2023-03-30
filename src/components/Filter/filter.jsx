import "./index.css";
import React from "react";
import { useContext } from "react";
import { PostContext } from "../../context/postContext";
import { Button } from "../Button/Button";
import EditPost from "../PostForm/PostForm";

const Filter = () => {
  const {
    handleCreatePost,
    modalCreatePost,
    setModalCreatePost,
    handleCheckboxChange,
    checkboxStates,
    sortBy,
    setSortBy,
  } = useContext(PostContext);
  return (
    <div className="main__container__top">
      <div className="filter__post">
        <div className="liked">
          <input
            type="checkbox"
            id="isLiked"
            checked={checkboxStates.showLikedPosts}
            onChange={() => handleCheckboxChange("showLikedPosts")}
          />
          <label htmlFor="isLiked">Понравившиеся</label>
        </div>
        <div className="liked">
          <input
            type="checkbox"
            id="myPosts"
            checked={checkboxStates.showMyPosts}
            onChange={() => handleCheckboxChange("showMyPosts")}
          />
          <label htmlFor="myPosts">Мои посты</label>
        </div>
        <div className="sort__list">
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="new">Сначало новые</option>
            <option value="old">Сначало старые</option>
            <option value="likes">Популярные</option>
            <option value="comments">Обсуждаемые</option>
          </select>
        </div>
      </div>
      <Button
        fn={() => {
          setModalCreatePost(true);
        }}
      >
        Создать пост
      </Button>

      <EditPost
        btnname="Создать"
        title="Создание поста"
        modalForPost={modalCreatePost}
        setModalForPost={setModalCreatePost}
        handleFnPost={handleCreatePost}
      />
    </div>
  );
};
export default Filter;

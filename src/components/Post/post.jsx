import React from "react";
import { useContext } from "react";
import {
  FaRegCommentAlt,
  FaRegHeart,
  FaCommentAlt,
  FaHeart,
} from "react-icons/fa";
import { TiDeleteOutline, TiEdit } from "react-icons/ti";
import { Link } from "react-router-dom";
import { PostContext } from "../../context/postContext";
import { UserContext } from "../../context/userContext";
import "./index.css";

const Post = ({ image, title, _id, author, comments, likes }) => {
  const {
    modalChange,
    setActualIdPost,
    handlePostLike,
    isLiked
  } = useContext(PostContext);
  const { currentUser } = useContext(UserContext);
  const commentCounter = comments.length;

  return (
    <div className="post">
      <Link to={`/${_id}`}>
        <div className="post__container">
          <div className="post__image">
            <img src={image} alt="" />
          </div>
          <div className="post__title">{title}</div>
        </div>
      </Link>
      <div className="post__icons">
        <div className="post__icons__like">
          <div className="likes__counter">
            {isLiked(likes, currentUser?._id) ? (
              <FaHeart
                onClick={() => handlePostLike(likes, _id)}
              />
            ) : (
              <FaRegHeart
                onClick={() => handlePostLike(likes, _id)}
              />
            )}
            &nbsp;{!!likes.length && likes.length}
          </div>
        </div>
        <div className="post__icons__comments">
          {commentCounter ? (
            <div className="comments__counter">
              {comments.length}&nbsp;
              <FaCommentAlt />
            </div>
          ) : (
            <FaRegCommentAlt />
          )}
        </div>
      </div>
      {currentUser?._id === author._id && (
        <div className="post__icons__change">
          <TiEdit
            onClick={() => {}}
          />
          <TiDeleteOutline
            className="del__icon"
            onClick={() => {
              modalChange()
              setActualIdPost(_id);
            }}
          />
        </div>
      )}
    </div>
  );
};
export default Post;

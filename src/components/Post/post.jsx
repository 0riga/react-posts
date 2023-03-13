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

const Post = ({
  image,
  title,
  text,
  _id,
  author,
  comments,
  likes,
  created_at,
}) => {
  const {
    setModalEditPost,
    modalChange,
    setActualIdPost,
    setActualInfoPost,
    handlePostLike,
    isLiked,
  } = useContext(PostContext);
  const { currentUser } = useContext(UserContext);
  
  return (
    <div className="post">
      <div className="post__author">
        <img src={author.avatar} alt="avatar" />
        <span>{author.name}</span>
      </div>
      <div className="post__content">
        <Link to={`/posts/${_id}`}>
          <div className="post__link__container">
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
                <FaHeart onClick={() => handlePostLike(likes, _id)} />
              ) : (
                <FaRegHeart onClick={() => handlePostLike(likes, _id)} />
              )}
              &nbsp;{!!likes?.length && likes?.length}
            </div>
          </div>
          <div className="post__icons__comments">
            {comments?.length ? (
              <div className="comments__counter">
                {comments?.length}&nbsp;
                <FaCommentAlt />
              </div>
            ) : (
              <FaRegCommentAlt />
            )}
          </div>
        </div>
        {currentUser?._id === author?._id && (
          <div className="post__icons__change">
            <TiEdit
              onClick={() => {
                setModalEditPost(true);
                setActualInfoPost({ image, title, _id, text });
              }}
            />
            <TiDeleteOutline
              className="del__icon"
              onClick={() => {
                modalChange();
                setActualIdPost(_id);
              }}
            />
          </div>
        )}
      </div>
      <div className="post__date">{new Date(created_at).toLocaleString()}</div>
    </div>
  );
};
export default Post;

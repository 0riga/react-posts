import React from "react";
import { useContext, useState } from "react";
import { FaRegCommentAlt, FaRegHeart, FaCommentAlt, FaHeart } from "react-icons/fa";
import { TiDeleteOutline, TiEdit } from "react-icons/ti";
import { Link } from 'react-router-dom';
import { PostContext } from "../../context/postContext";
import { UserContext } from "../../context/userContext";
import './index.css';

const Post = ({
	image,
	title,
	_id,
	author,
	comments,
	likes
}) => {
	const { isLiked, modelOpen, setActualIdPost, handleClickLike, handleClickUnlike } = useContext(PostContext);
	const { currentUser } = useContext(UserContext);
	const [likeCounter, setLikeCounter] = useState(likes.length);
	const [liked, setLiked] = useState(isLiked(likes));

	const commentCounter = comments.length

	return (
		<div className='post'>
			<Link to={`/${_id}`}>
				<div className='post__container'>
					<div className='post__image'>
						<img src={image} alt="" />
					</div>
					<div className='post__title'>
						{title}
					</div>
				</div>
			</Link>
			<div className='post__icons'>
				<div className="post__icons__like">
					<div className="likes__counter">
						{liked
							? <FaHeart onClick={() => { { setLikeCounter(likeCounter - 1) } { handleClickUnlike(_id, setLiked(!liked)) } }} />
							: <FaRegHeart onClick={() => { { setLikeCounter(likeCounter + 1) } { handleClickLike(_id, setLiked(!liked)) } }} />
						}
						&nbsp;{likeCounter !== 0 && likeCounter}
					</div>
				</div>
				<div className="post__icons__comments">
					{commentCounter
						? <div className="comments__counter">{comments.length}&nbsp;<FaCommentAlt />
						</div>
						: <FaRegCommentAlt />
					}
				</div>
			</div>
			{currentUser?._id === author._id &&
				<div className='post__icons__change'>
					<TiEdit onClick={() => { console.log(isLiked(likes)) }} />
					<TiDeleteOutline className="del__icon" onClick={() => { { modelOpen() } { setActualIdPost(_id) } }} />
				</div>}
		</div>
	)
}
export default Post;
import { useContext, useState } from "react";
import { FaRegCommentAlt, FaRegHeart, FaCommentAlt, FaHeart } from "react-icons/fa";
import { TiDeleteOutline, TiEdit } from "react-icons/ti";
import { Link } from 'react-router-dom';
import { UserContext } from "../../context/userContext";
import { api } from "../../utils/Api/Api";
import { Confirmation } from "../Confirmation/confirmation";
import { Modal } from "../Modal/modal";
import './index.css';

const Post = ({
	image,
	title,
	_id,
	author,
	comments,
	likes,
	setPosts
}) => {
	const [activeModalConfirm, setActiveModalConfirm] = useState(false);
	const { currentUser } = useContext(UserContext);
	const isLiked = likes.includes(currentUser?._id);
	const [liked, setLiked] = useState(isLiked);
	const [likeCounter, setLikeCounter] = useState(likes.length);

	let commentCounter = comments.length

	const handleClickUnlike = () => {
		api.removeLike(_id)
			.then(() => setLiked(!liked))
			.then(() => setLikeCounter(likeCounter - 1))
	};
	const handleClickLike = () => {
		api.addLike(_id)
			.then(() => setLiked(!liked))
			.then(() => setLikeCounter(likeCounter + 1))
	};
	return (
		<>
			<div className='post'>
				<Link style={{ textDecoration: "none" }} to={`/${_id}`}>
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
						{liked
							? <div className="likes__counter">
								<FaHeart onClick={handleClickUnlike} />&nbsp;{likeCounter !== 0 && likeCounter}
							</div>
							: <div className="likes__counter">
								<FaRegHeart onClick={handleClickLike} />&nbsp;{likeCounter !== 0 && likeCounter}
							</div>}
					</div>
					<div className="post__icons__comments">
						{commentCounter ? <div className="comments__counter">
							{commentCounter}&nbsp;<FaCommentAlt />
						</div> :
							<FaRegCommentAlt />
						}
					</div>
				</div>
				{currentUser?._id === author._id ?
					<div className='post__icons__change'>
						<TiEdit />
						<TiDeleteOutline className="del__icon" onClick={() => { setActiveModalConfirm(true) }} />
					</div>
					: null}
			</div>
			<Modal setActiveModal={setActiveModalConfirm} activeModal={activeModalConfirm}>
				<Confirmation
					_id={_id}
					setPosts={setPosts}
					setActiveModalConfirm={setActiveModalConfirm}
				/>
			</Modal>
		</>
	)
}
export default Post;
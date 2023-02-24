import { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { Comments } from '../../components/Comments/Comments';
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { PostContext } from '../../context/postContext';
import "./index.css"
import { UserContext } from '../../context/userContext';

export const DetailedPost = () => {
	const { postid } = useParams()
	const { handlePostLike, isLiked, posts } = useContext(PostContext);
	const { currentUser } = useContext(UserContext);
	const currentPost = posts?.find(el => el._id === postid)

	return (
		<div className='detailedPost'>
			<div className='detailedPost__wrapper'>
				<div className='detailedPost__content'>
					<div className='detailedPost__title'>
						<span>{currentPost?.title}</span>
						<div className='detailedPost__like'>
							{!!currentPost?.likes.length && currentPost?.likes?.length}&nbsp;
							{isLiked(currentPost?.likes, currentUser?._id) ? (
								<FaHeart
									onClick={() => handlePostLike(currentPost?.likes, currentPost?._id)}
								/>
							) : (
								<FaRegHeart
									onClick={() => handlePostLike(currentPost?.likes, currentPost?._id)}
								/>
							)}
						</div>
					</div>
					<div className='detailedPost__user'>
						<div className='detailedPost__user__avatar'>
							<img src={currentPost?.author?.avatar} alt='avatar'></img>
						</div>
						<div className='detailedPost__user__name'>
							<span>{currentPost?.author?.name}</span>
						</div>
						<div className='detailedPost__user__creation-time'>
							<span>Опубликовно {new Date(currentPost?.created_at).toLocaleString()}</span>
						</div>
					</div>
				</div>
				<div className='detailedPost__image'>
					<img src={currentPost?.image} alt='post__image'></img>
				</div>
				<div className='detailedPost__text'>
					<p>{currentPost?.text}</p>
				</div>
			</div>
			<Comments />
		</div>
	)
}
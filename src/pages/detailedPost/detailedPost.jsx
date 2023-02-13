import { useContext } from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Comments } from '../../components/Comments/Comments';
import { DetailedContext } from '../../context/detailedContext';
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { PostContext } from '../../context/postContext';
import "./index.css"
import { UserContext } from '../../context/userContext';

export const DetailedPost = () => {
	const { postid } = useParams()
	const { post, getDetailedPost } = useContext(DetailedContext)
	const { handlePostLike, isLiked } = useContext(PostContext);
	const { currentUser } = useContext(UserContext);
	useEffect(() => {
		getDetailedPost(postid)
	}, [])
	return (
		<div className='detailedPost'>
			<div className='detailedPost__wrapper'>
				<div className='detailedPost__content'>
					<div className='detailedPost__title'>
						<span>{post.title}</span>
						<div className='detailedPost__like'>
							{!!post.likes?.length && post.likes?.length}&nbsp;
							{isLiked(post.likes, currentUser?._id) ? (
								<FaHeart
									onClick={() => handlePostLike(post.likes, post._id)}
								/>
							) : (
								<FaRegHeart
									onClick={() => handlePostLike(post.likes, post._id)}
								/>
							)}
						</div>
					</div>
					<div className='detailedPost__user'>
						<div className='detailedPost__user__avatar'>
							<img src={post.author?.avatar} alt='avatar'></img>
						</div>
						<div className='detailedPost__user__name'>
							<span>{post.author?.name}</span>
						</div>
						<div className='detailedPost__user__creation-time'>
							<span>Опубликовно {new Date(post.created_at).toLocaleString()}</span>
						</div>
					</div>
				</div>
				<div className='detailedPost__image'>
					<img src={post.image} alt='post__image'></img>
				</div>
				<div className='detailedPost__text'>
					<p>{post.text}</p>
				</div>
			</div>
			<Comments />
		</div>
	)
}
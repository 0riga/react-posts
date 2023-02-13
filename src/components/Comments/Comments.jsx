import { useContext, useState } from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ReactTextareaAutosize from 'react-textarea-autosize';
import { DetailedContext } from '../../context/detailedContext';
import { Button } from '../Button/Button';
import { Hr } from '../Hr/Hr';
import { TiDeleteOutline } from "react-icons/ti";
import { UserContext } from '../../context/userContext';
import "./index.css"

export const Comments = () => {
	const { postid } = useParams()

	const [text, setText] = useState('');
	const {
		comments,
		getComments,
		handleAddComment,
		post,
		handeleDeleteComment
	} = useContext(DetailedContext)
	const { currentUser } = useContext(UserContext);
	useEffect(() => {
		getComments(postid)
	}, [post])

	const commentCounter = () => {
		let n = comments.length
		n %= 100;
		if (n >= 5 && n <= 20) {
			return `${comments.length} коментариев`;
		}
		n %= 10;
		if (n === 1) {
			return `${comments.length} коментарий`;
		}
		if (n >= 2 && n <= 4) {
			return `${comments.length} коментария`;
		}
		if (n === 0) {
			return
		}
		return `${comments.length} коментариев`;
	}

	const handleChange = (e) => {
		setText(e.target.value);
	};

	return (
		<div className='comments__wrapper'>
			<form >
				<ReactTextareaAutosize
					onChange={handleChange}
					value={text}
					minRows={3}
					maxRows={10}
					placeholder="Написать комментарий..."
				/>
				<Button fn={() => { handleAddComment(postid, text); setText("") }}>Отправить</Button>
			</form>
			<div className='comment__counter'>
				<span>{commentCounter()}</span>
				{!!comments.length &&
					<Hr />
				}
			</div>
			<div className='comments__wrapper__list'>
				{comments.map((item) => (
					<div className='comments__wrapper__list__item' key={item._id}>
						<div className='comment__author'>
							<img src={item.author.avatar} alt='avatar' />
							<span className='comment__author__name'>{item.author.name}</span>
							<span>•</span>
							<span className='comment__author__date'>{new Date(item.created_at).toLocaleString()}</span>
						</div>
						<div className='comment__text'>
							{item.text}
						</div>
						{currentUser?._id === item.author?._id && (
							<div className='comment__delete-icon'>
								<TiDeleteOutline onClick={() => { handeleDeleteComment(postid, item._id) }} />
							</div>)}
					</div>
				))}
			</div>
		</div>
	)
}

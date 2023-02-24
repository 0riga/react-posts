import { useContext, useState } from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ReactTextareaAutosize from 'react-textarea-autosize';
import { DetailedContext } from '../../context/detailedContext';
import { Button } from '../Button/Button';
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
		handeleDeleteComment
	} = useContext(DetailedContext)
	const { currentUser } = useContext(UserContext);

	const words_arr = ["комментарий", "комментария", "комментариев"]
	const normalize_count_form = (number, words_arr) => {
		number = Math.abs(number);
		if (Number.isInteger(number)) {
			const options = [2, 0, 1, 1, 1, 2];
			return `${number} ${words_arr[(number % 100 > 4 && number % 100 < 20) ? 2 : options[(number % 10 < 5) ? number % 10 : 5]]}`;
		}
		return words_arr[1];
	}

	useEffect(() => {
		getComments(postid)
	}, [postid])

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
			{!!comments.length &&
				<div className='comment__counter'>
					<span>{normalize_count_form(comments.length, words_arr)}</span>
					<hr />
				</div>
			}
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

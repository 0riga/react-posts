import React from 'react'
import { Button } from '../Button/Button'
import { TiDeleteOutline } from "react-icons/ti";
import "./index.css"
import { api } from '../../utils/Api/Api';

export const Confirmation = (
	{ setActiveModalConfirm,
		_id,
		setPosts }
) => {
	const modalClose = () => {
		setActiveModalConfirm(false)
	}
	const handleDeletePost = () => {
		api.deletePost(_id)
			.then(() => {
				api.getAllPosts()
					.then((data) => { setPosts(data) })
			})
			.finally(() => modalClose)
	}
	return (
		<>
			<div className='confirmation__content'>
				<div className='confirmation__title'>
					<TiDeleteOutline />
					<span>Удаление поста</span>
				</div>
				<div className='confirmation__text'>
					<span>Вы действительно хотите удалить пост?</span>
				</div>
				<div className='confirmation__buttons'>
					<Button fn={modalClose}>Отмена</Button>
					<Button type="button" fn={handleDeletePost}>Подтвердить</Button>
				</div>
			</div>
		</>
	)
}

import s from './index.module.css';
import React from "react";
import Post from "../Post/post";

export const PostsList = ({ posts }) => {

	return (
		<>
			<div className={s.main__container__top}></div>
			<div className={s.postList}>
				{posts?.map((item) => (
					<Post
						key={item._id}
						{...item}
					/>
				))}
			</div>
		</>
	)
}
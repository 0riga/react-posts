import s from './index.module.css';
import React from "react";
import Post from "../Post/post";

export const PostsList = ({ posts, setPosts, setActiveModal }) => {

	return (
		<>
			<div className={s.main__container__top}></div>
			<div className={s.postList}>
				{posts.map((item) => (
					<Post
						setPosts={setPosts}
						key={item._id}
						{...item}
						setActiveModal={setActiveModal}
					/>

				))}
			</div>

		</>
	)

}
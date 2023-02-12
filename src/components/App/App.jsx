import React from 'react';
import { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Header from '../Header/Header';
import { api } from '../../utils/Api/Api';
import { PostsList } from '../PostsList/postsList';
import { UserContext } from '../../context/userContext';
import { PostContext } from '../../context/postContext';
import { Confirmation } from '../Confirmation/confirmation';

function App() {

  const [posts, setPosts] = useState([]);
  const [currentUser, setCurrentUser] = useState();
  const [activeModal, setActiveModal] = useState(false);
  const [actualIdPost, setActualIdPost] = useState();

  const isLiked = (likes, userId) => likes.some((id) => id === userId);

  const handlePostLike = (likes, postId) => {
    const Liked = isLiked(likes, currentUser?._id)
    api.changeLike(postId, Liked).then((post) => {
      setPosts(posts.map((el) => el._id === post._id ? post : el))
    })
  }
  const modalChange = () => setActiveModal(!activeModal);

  const handleDeletePost = () => {
    api.deletePost(actualIdPost)
      .then(() => setPosts(posts.filter(e => e._id !== actualIdPost)))
      .finally(() => modalChange())
  }

  useEffect(() => {
    api.getAllPosts().then((data) => setPosts(data))
    api.getAuthUser().then((userData) => setCurrentUser(userData))
  }, [])

  const postProvider = {
    handleDeletePost,
    modalChange,
    setActualIdPost,
    handlePostLike,
    isLiked
  };

  return (
    <UserContext.Provider value={{ currentUser }}>
      <PostContext.Provider value={postProvider}>
        <Header />
        <main>
          <div className='main__container'>
            <div className='main__container__posts'>
              <Routes>
                <Route path='/' element=
                  {
                    <PostsList
                      posts={posts}
                    />
                  } >
                </Route>
              </Routes>              
              <Confirmation
                handleDeletePost={handleDeletePost}
                modalChange={modalChange}
                setActiveModal={setActiveModal}
                activeModal={activeModal}
              />
            </div>
          </div>
        </main>
      </PostContext.Provider>
    </UserContext.Provider>
  );
}
export default App;


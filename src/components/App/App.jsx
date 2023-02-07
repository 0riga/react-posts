import React from 'react';
import { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Header from '../Header/Header';
import { api } from '../../utils/Api/Api';
import { PostsList } from '../PostsList/postsList';
import { UserContext } from '../../context/userContext';
import { PostContext } from '../../context/postContext';
import { Modal } from '../Modal/modal';
import { Confirmation } from '../Confirmation/confirmation';
// localStorage.getItem('token')


function App() {

  const [posts, setPosts] = useState([]);
  const [currentUser, setCurrentUser] = useState();
  const [activeModalConfirm, setActiveModalConfirm] = useState(false);
  const [actualIdPost, setActualIdPost] = useState();

  const handleReSetPosts = (id) => {
    posts.forEach((el, i) => { if (el._id === id) { posts.splice(i, 1) } }
    )
  }

  const modalClose = () => {
    setActiveModalConfirm(false)
  }

  const modelOpen = () => {
    setActiveModalConfirm(true)
  }

  const handleDeletePost = () => {
    api.deletePost(actualIdPost)
      .then(() => { handleReSetPosts(actualIdPost) })
      .finally(() => modalClose())
  }

  const handleClickUnlike = (id, setLike) => {
    api.removeLike(id)
      .then(() => setLike)

  };
  const handleClickLike = (id, setLike) => {
    api.addLike(id)
      .then(() => setLike)
  };

  const isLiked = (likes) => {
    return likes.includes(currentUser?._id)
  }
  useEffect(() => {
    api.getAllPosts().then((data) => setPosts(data))
    api.getAuthUser().then((userData) => setCurrentUser(userData))
  }, [])

  const postProvider = {
    isLiked: isLiked,
    handleDeletePost: handleDeletePost,
    modalClose: modalClose,
    modelOpen: modelOpen,
    setActualIdPost: setActualIdPost,
    handleClickUnlike: handleClickUnlike,
    handleClickLike: handleClickLike
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
              <Modal setActiveModal={setActiveModalConfirm} activeModal={activeModalConfirm}>
                <Confirmation handleDeletePost={handleDeletePost} modalClose={modalClose} />
              </Modal>
            </div>
          </div>
        </main>
      </PostContext.Provider>
    </UserContext.Provider>
  );
}
export default App;


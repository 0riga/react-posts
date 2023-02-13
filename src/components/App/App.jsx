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
import { DetailedPost } from '../../pages/detailedPost/detailedPost';
import { DetailedContext } from '../../context/detailedContext';
import { NotFound } from '../../pages/notFound/notFound';

function App() {

  const [posts, setPosts] = useState([]);
  const [currentUser, setCurrentUser] = useState();
  const [activeModal, setActiveModal] = useState(false);
  const [actualIdPost, setActualIdPost] = useState();
  const [comments, setComments] = useState([]);
  const [post, setPost] = useState([]);

  const isLiked = (likes, userId) => likes?.some((id) => id === userId);

  const handlePostLike = (likes, postId) => {
    const Liked = isLiked(likes, currentUser?._id)
    api.changeLike(postId, Liked)
      .then((post) => {
        setPosts(posts.map((el) => el._id === post._id ? post : el))
        setPost(post)
      })
      .catch(err => console.error(err))
  }

  const modalChange = () => setActiveModal(!activeModal);

  const handleDeletePost = () => {
    api.deletePost(actualIdPost)
      .then(() => setPosts(posts.filter(e => e._id !== actualIdPost)))
      .catch(err => console.error(err))
      .finally(() => modalChange())
  }

  const getDetailedPost = (postid) => {
    api.getPostById(postid)
      .then((data) => setPost(data))
      .catch(err => console.error(err))
  }
  const getComments = (postid) => {
    api.getCommentsByPostId(postid)
      .then((data) => setComments(data))
      .catch(err => console.error(err))
  }
  const handleAddComment = (postid, text) => {
    api.addComment(postid, text)
      .then((post) => {
        setPost(post)
        setPosts(posts.map((el) => el._id === post._id ? post : el))
      })
      .catch(err => console.error(err))
  };
  const handeleDeleteComment = (postId, commentId) => {
    api.deleteComment(postId, commentId)
      .then((post) => {
        setPost(post);
        setPosts(posts.map((el) => el._id === post._id ? post : el))
      })
      .then(() => setComments(comments.filter(e => e._id !== commentId)))
      .catch(err => console.error(err))
  }

  useEffect(() => {
    api.getAllPosts().then((data) => setPosts(data)).catch(err => console.error(err))
    api.getAuthUser().then((userData) => setCurrentUser(userData)).catch(err => console.error(err))
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
        <DetailedContext.Provider value={{ comments, setComments, getComments, handleAddComment, getDetailedPost, post, handeleDeleteComment }}>
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
                  <Route path='/:postid' element={<DetailedPost />} />
                  <Route path='*' element={<NotFound />} />
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
        </DetailedContext.Provider>
      </PostContext.Provider>
    </UserContext.Provider>
  );
}
export default App;


import React from "react";
import { useState, useEffect } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import "./App.css";
import { Header } from "../Header/Header";
import { api } from "../../utils/Api/Api";
import { PostsList } from "../PostsList/postsList";
import { UserContext } from "../../context/userContext";
import { PostContext } from "../../context/postContext";
import { Confirmation } from "../Confirmation/confirmation";
import { DetailedPost } from "../../pages/detailedPost/detailedPost";
import { DetailedContext } from "../../context/detailedContext";
import { NotFound } from "../../pages/notFound/notFound";
import { Loader } from "../Loader/Loader";
import SignUp from "../../pages/signUp/signUp";
import SignIn from "../../pages/signIn/signIn";
import ResetPswd from "../../pages/reset/reset";
import EditPost from "../PostForm/PostForm";
import AboutMe from "../../pages/aboutMe/aboutMe";
import { Footer } from "../Footer/footer";

function App() {
  const [posts, setPosts] = useState([]);
  const [checkboxStates, setCheckboxStates] = useState({
    showLikedPosts: false,
    showMyPosts: false,
  });
  const [currentUser, setCurrentUser] = useState();
  const [activeModal, setActiveModal] = useState(false);
  const [modalEditPost, setModalEditPost] = useState(false);
  const [modalCreatePost, setModalCreatePost] = useState(false);
  const [actualIdPost, setActualIdPost] = useState();
  const [actualInfoPost, setActualInfoPost] = useState({});
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [auth, setAuth] = useState();
  const [authError, setAuthError] = useState();
  const [sortBy, setSortBy] = useState("new");
  const isLiked = (likes, userId) => likes?.some((id) => id === userId);
  const isAuth = () =>
    localStorage.getItem("token") ? setAuth(true) : setAuth(false);
  const location = useLocation();
  const navigate = useNavigate();
  const handleGetPosts = () => {
    api.getAllPosts().then((data) => {
      setPosts(data);
    });
  };

  const filteredPosts = posts
    .filter((post) =>
      checkboxStates.showLikedPosts
        ? isLiked(post.likes, currentUser._id)
        : posts
    )
    .filter((post) =>
      checkboxStates.showMyPosts ? post.author._id === currentUser._id : posts
    )
    .sort((a, b) => {
      switch (sortBy) {
        case "new":
          return new Date(b.created_at) - new Date(a.created_at);
        case "old":
          return new Date(a.created_at) - new Date(b.created_at);
        case "likes":
          return b.likes.length - a.likes.length;
        case "comments":
          return b.comments.length - a.comments.length;
        default:
          return 0;
      }
    });
  const handlePostLike = (likes, postId) => {
    const liked = isLiked(likes, currentUser?._id);
    api
      .changeLike(postId, liked)
      .then((post) => {
        setPosts(posts.map((el) => (el._id === post._id ? post : el)));
      })
      .catch((err) => console.error(err));
  };
  const modalChange = () => setActiveModal(!activeModal);

  const handleDeletePost = () => {
    api
      .deletePost(actualIdPost)
      .then(() => setPosts(posts.filter((e) => e._id !== actualIdPost)))
      .catch((err) => console.error(err))
      .finally(() => modalChange());
  };
  const getComments = (postid) => {
    api
      .getCommentsByPostId(postid)
      .then((data) => setComments(data))
      .catch((err) => console.error(err));
  };
  const handleAddComment = (postid, text) => {
    api
      .addComment(postid, text)
      .then((post) => {
        setPosts(posts.map((el) => (el._id === post._id ? post : el)));
      })
      .then(() => getComments(postid))
      .catch((err) => console.error(err));
  };
  const handeleDeleteComment = (postId, commentId) => {
    api
      .deleteComment(postId, commentId)
      .then((post) => {
        setPosts(posts.map((el) => (el._id === post._id ? post : el)));
      })
      .then(() => setComments(comments.filter((e) => e._id !== commentId)))
      .catch((err) => console.error(err));
  };
  const handleEditPost = (data) => {
    for (let prop in data) {
      if (data.hasOwnProperty(prop) && data[prop] === "") {
        delete data[prop];
      }
    }
    api
      .editPost(actualInfoPost._id, data)
      .then((post) => {
        setPosts(posts.map((el) => (el._id === post._id ? post : el)));
      })
      .catch((err) => console.error(err))
      .finally(setModalEditPost(false));
  };

  const handleCreatePost = (data) => {
    for (let prop in data) {
      if (data.hasOwnProperty(prop) && data[prop] === "") {
        delete data[prop];
      }
    }
    api
      .createPost(data)
      .then((post) => {
        setPosts([post, ...posts]);
      })
      .catch((err) => console.error(err))
      .finally(setModalCreatePost(false));
  };
  const handleEditUserinfo = (data) => {
    api.editUserInfo(data).then((res) => {
      setCurrentUser(res);
      handleGetPosts();
    });
  };
  const handleEditUserAvatar = (data) => {
    api.editUserAvatar(data).then((res) => {
      setCurrentUser(res);
      handleGetPosts();
    });
  };

  const handleCheckboxChange = (checkboxName) => {
    const newState = !checkboxStates[checkboxName];
    setCheckboxStates({ ...checkboxStates, [checkboxName]: newState });
  };

  useEffect(() => {
    isAuth();
  }, [auth]);

  useEffect(() => {
    setLoading(true);
    auth &&
      Promise.all([api.getAuthUser(), api.getAllPosts()])
        .then(([userData, data]) => {
          setCurrentUser(userData);
          setPosts(data);
        })
        .finally(() => setLoading(false));
    !auth && setLoading(false);
    auth === false && navigate("/signin");
  }, [auth]);

  const postProvider = {
    handleEditPost,
    setModalEditPost,
    handleDeletePost,
    handleCreatePost,
    modalCreatePost,
    setModalCreatePost,
    modalChange,
    setActualIdPost,
    setActualInfoPost,
    handlePostLike,
    isLiked,
    posts,
    handleCheckboxChange,
    checkboxStates,
    sortBy,
    setSortBy,
  };

  const detailedPostProvider = {
    comments,
    setComments,
    getComments,
    handleAddComment,
    handeleDeleteComment,
  };

  const userProvider = {
    currentUser,
    isAuth,
    auth,
    setAuth,
    setAuthError,
    authError,
    handleEditUserinfo,
    handleEditUserAvatar,
  };

  return (
    <UserContext.Provider value={userProvider}>
      <PostContext.Provider value={postProvider}>
        <DetailedContext.Provider value={detailedPostProvider}>
          {loading ? (
            <Loader />
          ) : (
            <>
              {location.pathname !== "/signin" &&
                location.pathname !== "/signup" &&
                location.pathname !== "/reset" && <Header />}
              <main>
                <div className="main__container">
                  <div className="main__container__posts">
                    <Routes>
                      <Route
                        path="/"
                        element={<PostsList posts={filteredPosts} />}
                      ></Route>
                      <Route path="/posts/:postid" element={<DetailedPost />} />
                      <Route path="*" element={<NotFound />} />
                      <Route path="/signup" element={<SignUp />} />
                      <Route path="/signin" element={<SignIn />} />
                      <Route path="/reset" element={<ResetPswd />} />
                      <Route path="/aboutme" element={<AboutMe />} />
                    </Routes>
                    <Confirmation
                      handleDeletePost={handleDeletePost}
                      modalChange={modalChange}
                      setActiveModal={setActiveModal}
                      activeModal={activeModal}
                    />
                    <EditPost
                      btnname="Сохранить"
                      title="Редактирование поста"
                      actualInfoPost={actualInfoPost}
                      modalForPost={modalEditPost}
                      setModalForPost={setModalEditPost}
                      handleFnPost={handleEditPost}
                    />
                  </div>
                </div>
              </main>
              <Footer />
            </>
          )}
        </DetailedContext.Provider>
      </PostContext.Provider>
    </UserContext.Provider>
  );
}
export default App;

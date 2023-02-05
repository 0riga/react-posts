import { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Header from '../Header/Header';
import { api } from '../../utils/Api/Api';
import { PostsList } from '../PostsList/postsList';
import { UserContext } from '../../context/userContext';
// localStorage.getItem('token')



function App() {

  const [posts, setPosts] = useState([]);
  const [currentUser, setCurrentUser] = useState();

  useEffect(() => {
    api.getAllPosts().then((data) => setPosts(data))
  }, [])

  useEffect(() => {
    api.getAuthUser().then((userData) => setCurrentUser(userData))
  }, [])

  return (
    <>
      <UserContext.Provider value={{ currentUser }}>
        <Header />
        <main>
          <div className='main__container'>
            <div className='main__container__posts'>
              <Routes>
                <Route path='/' element=
                  {
                    <PostsList
                      posts={posts}
                      setPosts={setPosts}
                    />
                  } >
                </Route>
              </Routes>
            </div>
          </div>
        </main>
      </UserContext.Provider>
    </>
  );
}
export default App;


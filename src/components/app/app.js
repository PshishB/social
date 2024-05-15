import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';

import Articles from '../articles/articles';
import Header from '../header';
import ItemPage from '../itemPage/itemPage';
import './app.scss';
import SignUpPage from '../signUpPage';
import SignInPage from '../signInPage';
import ProfilePage from '../profilePage';
import CreateArticlePage from '../CreateArticlePage';
import EditArticlePage from '../editArticlePage';

const App = () => {
  return (
    <div className="app">
      <Header />
      <Routes>
        <Route path="/" element={<Navigate to="/articles" />} />
        <Route path="/signUp" element={<SignUpPage />} />
        <Route path="/signIn" element={<SignInPage />} />
        <Route path="/articles" element={<Articles />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/new-article" element={<CreateArticlePage />} />
        <Route path="/articles/:slug" element={<ItemPage />} />
        <Route path="/articles/:slug/edit" element={<EditArticlePage />} />
      </Routes>
    </div>
  );
};

export default App;

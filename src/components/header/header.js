import React from 'react';
import { Link } from 'react-router-dom';
import './header.scss';
import { useDispatch, useSelector } from 'react-redux';

import { logoutUser } from '../../store/slice/userSlice';

const Header = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const login = useSelector((state) => state.user.login);
  return (
    <header className="header">
      <Link className="header__link" to="/articles">
        {' '}
        Realword Blog
      </Link>
      {!login ? (
        <div className="header__rightSideUn">
          <Link className="header__link" to="/signIn">
            Sign in
          </Link>
          <Link className="header__link active" to="signUp">
            Sign Up
          </Link>
        </div>
      ) : (
        <div className="header__rightSide">
          <Link className="header__link active" to="/new-article">
            Create artcile
          </Link>
          <Link className="header__link" to="/profile">
            {user.user.username}
            <img src={user.user.image} className="item__heroImg" />
          </Link>
          <Link className="header__link" to="/articles" onClick={() => dispatch(logoutUser())}>
            Log Out
          </Link>
        </div>
      )}
    </header>
  );
};

export default Header;

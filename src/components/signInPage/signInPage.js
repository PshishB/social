import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

import { loginUser } from '../../store/slice/userSlice';

const SignInPage = () => {
  const navigate = useNavigate();
  const error = useSelector((state) => state.user.error);
  const dispatch = useDispatch();
  const login = useSelector((state) => state.user.login);
  useEffect(() => {
    if (login) {
      navigate('/');
    }
  }, []);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'onBlur',
  });
  const onHandleSubmit = (data) => {
    const realData = {
      user: data,
    };
    dispatch(loginUser(realData)).then(() => {
      navigate('/');
    });
  };
  return (
    <div className="signUp">
      <div className="signUp__container">
        <form className="signUp__main signIn__main" onSubmit={handleSubmit(onHandleSubmit)}>
          <h2 className="signUp__h2">Sign In</h2>
          <div className="signUp__inputs">
            <div className="signUp__inputContainer">
              <h5 className="signUp__h5">Email address</h5>
              <input
                placeholder="Email address"
                className="signUp__input"
                {...register('email', {
                  required: 'The email field is required.',
                  pattern: {
                    value: /^[a-z][^\s@]+@([^\s@]+\.[^\s@]+)$/,
                    message: 'incorrect email',
                  },
                })}
              />
            </div>
            <div className="singUp__error">{errors?.email && <span>{errors?.email?.message || 'error'}</span>}</div>
            <div className="signUp__inputContainer">
              <h5 className="signUp__h5">Password</h5>
              <input
                placeholder="Password"
                className="signUp__input"
                type="password"
                {...register('password', {
                  required: 'The password field is required.',
                })}
              />
            </div>
            <div className="singUp__error">
              {errors?.password && <span>{errors?.password?.message || 'error'}</span>}
            </div>
          </div>
          <div className="singUp__error">{error ? <span>Email or password is invalid</span> : null}</div>
          <input className="signUp__btn" type="submit" value="Login"></input>
          <p className="signUp__p">
            Don’t have an account?
            <Link className="signUp__link" to="/signUp">
              {' '}
              Sign Up.
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignInPage;

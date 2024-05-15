import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import './signUpPage.scss';
import { useDispatch, useSelector } from 'react-redux';

import { clearStatus, createUser } from '../../store/slice/userSlice';

const SignUpPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const error = useSelector((state) => state.user.error);
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
    watch,
  } = useForm({
    mode: 'onBlur',
  });

  const password = watch('password');
  const onHandleSubmit = (data) => {
    const { username, email, password } = data;
    const newData = { username, email, password };
    const realData = {
      user: newData,
    };
    dispatch(createUser(realData));
  };

  const validatePasswordRepeat = (value) => {
    return value === password || 'Passwords do not match';
  };

  return (
    <div className="signUp">
      <div className="signUp__container">
        <div className="signUp__main">
          <h2 className="signUp__h2">Create new account</h2>
          <form className="signUp__inputs" onSubmit={handleSubmit(onHandleSubmit)}>
            <div className="signUp__inputContainer">
              <h5 className="signUp__h5">Username</h5>
              <input
                onInput={() => dispatch(clearStatus('username'))}
                placeholder="Username"
                className="signUp__input"
                {...register('username', {
                  required: 'The username field is required.',
                  minLength: { value: 3, message: 'Your username needs to be at least 3 characters.' },
                  maxLength: { value: 20, message: 'Your username cannot exceed 20 characters.' },
                })}
              />
            </div>
            <div className="singUp__error">
              {errors?.username && <span>{errors?.username?.message || 'error'}</span>}
              {error?.username && <span>Username is already taken</span>}
            </div>
            <div className="signUp__inputContainer">
              <h5 className="signUp__h5">Email address</h5>
              <input
                onInput={() => dispatch(clearStatus('email'))}
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
            <div className="singUp__error">{error?.email && <span>Email is already taken</span>}</div>
            <div className="signUp__inputContainer">
              <h5 className="signUp__h5">Password</h5>
              <input
                type="password"
                placeholder="Password"
                className="signUp__input"
                {...register('password', {
                  required: 'The password field is required.',
                  minLength: { value: 6, message: 'Your password needs to be at least 4 characters.' },
                  maxLength: { value: 40, message: 'Your username cannot exceed 40 characters.' },
                })}
              />
            </div>
            <div className="singUp__error">
              {errors?.password && <span>{errors?.password?.message || 'error'}</span>}
            </div>
            <div className="signUp__inputContainer">
              <h5 className="signUp__h5">Repeat Password</h5>
              <input
                type="password"
                placeholder="Password"
                className="signUp__input"
                {...register('passwordRepeat', { validate: { validatePasswordRepeat } })}
              />
            </div>
            <div className="singUp__error">
              {errors?.passwordRepeat && <span>{errors?.passwordRepeat?.message || 'error'}</span>}
            </div>
            <label className="singUp__label">
              <input
                type="checkBox"
                className="singUp__checkBox"
                {...register('checkbox', {
                  validate: (value) =>
                    value === true || 'You must agree to the processing of your personal information',
                })}
              ></input>
              <span className="signUp__span">I agree to the processing of my personal information</span>
            </label>
            <div className="singUp__error">
              {errors?.checkbox && <span>{errors?.checkbox?.message || 'error'}</span>}
            </div>
            <input type="submit" className="signUp__btn" value="Sign Up"></input>
          </form>
          <p className="signUp__p">
            Already have an account?
            <Link className="signUp__link" to="/signIn">
              {' '}
              Sign In.
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;

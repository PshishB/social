import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

import { updateUser } from '../../store/slice/userSlice';

const ProfilePage = () => {
  const tokenUser = useSelector((state) => state.user.user.user.token);
  const user = useSelector((state) => state.user.user.user);
  console.log(user);
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onHandleSubmit = (data) => {
    const realData = {
      user: data,
    };
    console.log(realData);
    dispatch(updateUser({ data: realData, tokenUser: tokenUser }));
  };
  return (
    <div className="signUp">
      <div className="signUp__container">
        <form className="signUp__main signIn__main" onSubmit={handleSubmit(onHandleSubmit)}>
          <h2 className="signUp__h2">Edit Profile</h2>
          <div className="signUp__inputs">
            <div className="signUp__inputContainer">
              <h5 className="signUp__h5">Username</h5>
              <input
                placeholder="Username"
                defaultValue={user.username}
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
            </div>
            <div className="signUp__inputContainer">
              <h5 className="signUp__h5">Email address</h5>
              <input
                placeholder="Email address"
                defaultValue={user.email}
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
              <h5 className="signUp__h5">New password</h5>
              <input placeholder="New password" className="signUp__input" />
            </div>
            <div className="signUp__inputContainer">
              <h5 className="signUp__h5">Avatar image (url)</h5>
              <input
                defaultValue={user.image}
                placeholder="Avatar image"
                className="signUp__input"
                {...register('image', {
                  pattern: {
                    value: /^(ftp|http|https):\/\/[^ "]+$/,
                    message: 'Invalid URL format.',
                  },
                })}
              />
            </div>
            <div className="singUp__error">{errors?.image && <span>{errors?.image?.message || 'error'}</span>}</div>
          </div>
          <input className="signUp__btn" type="submit" value="Save"></input>
        </form>
      </div>
    </div>
  );
};

export default ProfilePage;

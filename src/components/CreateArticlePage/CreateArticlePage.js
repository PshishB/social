import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import './CreateArticlePage.scss';
import { useNavigate } from 'react-router-dom';

import { postArticle } from '../../store/slice/articleSlice';

const CreateArticlePage = () => {
  const navigate = useNavigate();
  const tokenUser = useSelector((state) => state.user.user.user.token);
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    unregister,
    formState: { errors },
  } = useForm({
    mode: 'onBlur',
  });
  const onHandleSubmit = (data) => {
    const realData = {
      article: data,
    };
    dispatch(postArticle({ data: realData, tokenUser: tokenUser })).then(() => navigate('/'));
  };
  const [tags, setTags] = useState([]);
  const [tag, setTag] = useState('');

  const onTagsSubmit = () => {
    if (tag.trim() !== '') {
      setTags([...tags, tag]);
      setTag('');
    }
  };

  const onTagRemove = (indexToRemove) => {
    setTags(tags.filter((_, index) => index !== indexToRemove));
    unregister(`tagList[${indexToRemove}]`);
  };

  const items = tags.map((element, index) => (
    <li key={index} className="createArticle__listItem">
      <div className="createArticle__tags">
        <input type="hidden" value={element} {...register(`tagList[${index}]`)} />
        <span className="signUp__input">{element}</span>
        <button className="createArticle__btn red" onClick={() => onTagRemove(index)}>
          Remove
        </button>
      </div>
    </li>
  ));

  return (
    <div className="createArticle">
      <div className="createArticle__container">
        <div className="createArticle__main">
          <h2 className="createArticle__h2">Create new article</h2>
          <form className="createArticle__form" onSubmit={handleSubmit(onHandleSubmit)}>
            <div className="signUp__inputContainer">
              <h5 className="signUp__h5">Title</h5>
              <input
                placeholder="Title"
                className="signUp__input"
                {...register('title', {
                  required: 'The title field is required.',
                })}
              />
            </div>
            <div className="singUp__error">{errors?.title && <span>{errors?.title?.message || 'error'}</span>}</div>
            <div className="signUp__inputContainer">
              <h5 className="signUp__h5">Short description</h5>
              <input
                placeholder="Short description"
                className="signUp__input"
                {...register('description', {
                  required: 'The description field is required.',
                })}
              />
            </div>
            <div className="singUp__error">
              {errors?.description && <span>{errors?.description?.message || 'error'}</span>}
            </div>
            <div className="signUp__inputContainer">
              <h5 className="signUp__h5">Text</h5>
              <textarea
                placeholder="Text"
                className="signUp__input create"
                {...register('body', {
                  required: 'The text field is required.',
                })}
              />
            </div>
            <div className="singUp__error">{errors?.text && <span>{errors?.text?.message || 'error'}</span>}</div>
            <div className="signUp__inputContainer">
              <h5 className="signUp__h5">Tags</h5>
              <div className="createArticle__tagContainer">
                <ul className="createArticle__tagsList">
                  <div className="createArticle__tags">
                    <input
                      placeholder="Tag"
                      className="signUp__input"
                      value={tag}
                      onChange={(e) => setTag(e.target.value)}
                    />
                    <button className="createArticle__btn blue" type="button" onClick={onTagsSubmit}>
                      Add tag
                    </button>
                  </div>
                  {items}
                </ul>
              </div>
            </div>
            <input type="submit" value="Send" className="signUp__btn create" />
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateArticlePage;

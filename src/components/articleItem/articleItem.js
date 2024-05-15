import './articleItem.scss';
import { Link } from 'react-router-dom';
import React from 'react';
import { format } from 'date-fns';
import { useDispatch, useSelector } from 'react-redux';

import { favorite, unFavorite } from '../../store/slice/userSlice';
import { likeArticle, unLikeArticle } from '../../store/slice/articleSlice';

const ArticleItem = ({ title, body, tagList, author, slug, updatedAt, favoritesCount }) => {
  const { username, image } = author;
  const dispatch = useDispatch();
  const token = useSelector((state) => {
    if (state.user.user) {
      return state.user.user.user.token;
    }
    return null;
  });
  const likes = useSelector((state) => {
    if (state.user) {
      return state.user.favorited;
    }
    return null;
  });
  const currentTitle = title ? title : 'Text without title';
  const currentUsername = username || username.trim() !== '' ? username : 'anonym';
  const time = new Date(updatedAt);
  const onLikeClick = () => {
    if (token) {
      dispatch(favorite({ slug, token }));
      dispatch(likeArticle(slug));
    }
  };
  const onDislikeClick = () => {
    if (token) {
      dispatch(unFavorite({ slug, token }));
      dispatch(unLikeArticle(slug));
    }
  };
  const tags = tagList.map((tag, index) => {
    if (tag && tag.trim() !== '') {
      return (
        <p key={index} className="item__tag">
          {tag}
        </p>
      );
    }
  });
  return (
    <div className="artcile__item item">
      <div className="item__top">
        <div className="item__left">
          <div className="item__leftTop">
            <Link className="item__h3" to={`/articles/${slug}`}>
              {currentTitle}
            </Link>
            {likes ? (
              likes.includes(slug) ? (
                <button className="item__likeBtn" onClick={() => onDislikeClick()}>
                  <img src="/imgs/Heart_corazón1.svg" className="item_likeImg"></img>
                </button>
              ) : (
                <button className="item__likeBtn" onClick={() => onLikeClick()}>
                  <img src="/imgs/heart.svg" className="item_likeImg"></img>
                </button>
              )
            ) : (
              <button className="item__likeBtn" onClick={() => onLikeClick()}>
                <img src="/imgs/heart.svg" className="item_likeImg"></img>
              </button>
            )}
            <p className="item__likeCounter">{favoritesCount}</p>
          </div>
          <div className="item__leftBot">{tags}</div>
        </div>
        <div className="item__right">
          <div className="item__rightText">
            <h4 className="item__h4">{currentUsername}</h4>
            <p className="item__date">{format(time, 'dd MMMM yyyy')}</p>
          </div>
          <img src={`${image}`} className="item__heroImg"></img>
        </div>
      </div>
      <p className="item__bot">{body}</p>
    </div>
  );
};
export default ArticleItem;

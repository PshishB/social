import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { format } from 'date-fns';
import { Button, Modal } from 'antd';

import './itemPage.scss';
import { deleteArticle, fetchCurrentArticle, likeArticlePage, unLikeArticlePage } from '../../store/slice/articleSlice';
import { favorite, unFavorite } from '../../store/slice/userSlice';

const ItemPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { slug } = useParams();
  const username = useSelector((state) => (state.user.user ? state.user.user.user.username : null));
  const tokenUser = useSelector((state) => (state.user.user ? state.user.user.user.token : null));
  const currentArticle = useSelector((state) => state.article.currentArticle);
  const likes = useSelector((state) => state.user.favorited);

  useEffect(() => {
    dispatch(fetchCurrentArticle(slug));
  }, [dispatch, slug]);

  if (!currentArticle) {
    return <div>Loading...</div>;
  }

  const { title, tagList, body, description, author, updatedAt } = currentArticle;
  const currentUsername = author.username ? author.username : 'anonym';
  const currentTitle = title ? title : 'Text without title';
  const time = new Date(updatedAt);
  const tags = tagList.map((tag, index) => {
    if (tag && tag.trim() !== '') {
      return (
        <p key={index} className="item__tag">
          {tag}
        </p>
      );
    }
  });

  const onDeleteClick = () => {
    dispatch(deleteArticle({ slug, tokenUser })).then(() => navigate('/'));
  };

  const onLikeClick = () => {
    if (tokenUser) {
      dispatch(favorite({ slug, token: tokenUser }));
      dispatch(likeArticlePage(slug));
    }
  };

  const onDislikeClick = () => {
    if (tokenUser) {
      dispatch(unFavorite({ slug, token: tokenUser }));
      dispatch(unLikeArticlePage(slug));
    }
  };

  return (
    <div className="article">
      <div className="article__container container">
        <div className="artcile__itemPage item">
          <div className="item__top">
            <div className="item__left">
              <div className="item__leftTop">
                <h3 className="item__h3">{currentTitle}</h3>
                {likes ? (
                  likes.includes(slug) ? (
                    <button className="item__likeBtn" onClick={() => onDislikeClick()}>
                      <img src="/imgs/Heart_corazón1.svg" className="item_likeImg" alt="dislike"></img>
                    </button>
                  ) : (
                    <button className="item__likeBtn" onClick={() => onLikeClick()}>
                      <img src="/imgs/heart.svg" className="item_likeImg" alt="like"></img>
                    </button>
                  )
                ) : (
                  <button className="item__likeBtn" onClick={() => onLikeClick()}>
                    <img src="/imgs/heart.svg" className="item_likeImg" alt="like"></img>
                  </button>
                )}
                <p className="item__likeCounter">{currentArticle.favoritesCount}</p>
              </div>
              <div className="item__leftBot">{tags}</div>
            </div>
            <div className="item__right">
              <div className="item__rightText">
                <h4 className="item__h4">{currentUsername}</h4>
                <p className="item__date">{format(time, 'dd MMMM yyyy')}</p>
              </div>
              <img src={`${author.image}`} className="item__heroImg" alt="author"></img>
            </div>
          </div>
          {username === currentUsername ? (
            <div className="item__botPage">
              <p className="item__botPageP">{description}</p>
              <div className="item__botBtns">
                <Button type="primary" onClick={() => setIsModalOpen(true)} className="createArticle__btn red">
                  Delete
                </Button>
                <Modal
                  title=""
                  visible={isModalOpen}
                  onOk={onDeleteClick}
                  onCancel={() => setIsModalOpen(false)}
                  className="item__modal"
                  cancelText="No"
                  okText="Yes"
                >
                  <p className="item__modalP">Are you sure to delete this article?</p>
                </Modal>
                <Link className="createArticle__btn green" to={`/articles/${slug}/edit/`}>
                  Edit
                </Link>
              </div>
            </div>
          ) : (
            <div className="item__botPage">
              <p className="item__botPageP">{description}</p>
            </div>
          )}
          <ReactMarkdown className="item__body">{body}</ReactMarkdown>
        </div>
      </div>
    </div>
  );
};

export default ItemPage;

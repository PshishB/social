import React, { useEffect } from 'react';
import { Pagination } from 'antd';
import { useDispatch, useSelector } from 'react-redux';

import ArticleItem from '../articleItem';
import './articles.scss';
import { changePage, fetchArtciles } from '../../store/slice/articleSlice';

const Articles = () => {
  const dispatch = useDispatch();
  const page = useSelector((state) => state.article.page);
  const data = useSelector((state) => state.article.articles);
  const pageNumber = useSelector((state) => state.article.totalArticles);

  useEffect(() => {
    dispatch(fetchArtciles(page));
  }, [page]);
  const onPaginationChange = (page) => {
    dispatch(changePage(page));
  };
  const items = data.map((element) => {
    const { slug, ...itemProps } = element;
    return (
      <li key={slug}>
        <ArticleItem {...itemProps} slug={slug} />
      </li>
    );
  });

  return (
    <div className="article">
      <div className="article__container container">
        <ul className="article_articleList">{items}</ul>
      </div>
      <div className="article__pagination">
        <Pagination defaultCurrent={1} total={pageNumber} defaultPageSize={5} onChange={onPaginationChange} />
      </div>
    </div>
  );
};

export default Articles;

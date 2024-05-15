import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchArtciles = createAsyncThunk('article/fetchArtciles', async function (page) {
  const res = await fetch(`https://blog.kata.academy/api/articles?limit=5&offset=${(page - 1) * 5}`);
  const data = await res.json();
  return data;
});

export const fetchCurrentArticle = createAsyncThunk('article/fetchCurrentArticle', async function (slug) {
  const res = await fetch(`https://blog.kata.academy/api/articles/${slug}`);
  const data = await res.json();
  return data.article;
});
export const postArticle = createAsyncThunk('article/postArticle', async function ({ data, tokenUser }) {
  try {
    const response = await fetch('https://blog.kata.academy/api/articles', {
      method: 'POST',
      headers: {
        Authorization: `Token ${tokenUser}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(JSON.stringify(errorData));
    }
    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Error creating article:', error);
    return Promise.reject(error);
  }
});
export const deleteArticle = createAsyncThunk('article/deleteArticle', async function ({ slug, tokenUser }) {
  try {
    const response = await fetch(`https://blog.kata.academy/api/articles/${slug}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Token ${tokenUser}`,
      },
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(JSON.stringify(errorData));
    }
    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Error creating article:', error);
    return Promise.reject(error);
  }
});

export const editArticle = createAsyncThunk('article/editArticle', async function ({ data, slug, token }) {
  try {
    const response = await fetch(`https://blog.kata.academy/api/articles/${slug}`, {
      method: 'PUT',
      headers: {
        Authorization: `Token ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(JSON.stringify(errorData));
    }
    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Error creating article:', error);
    return Promise.reject(error);
  }
});

const artcileSlice = createSlice({
  name: 'article',
  initialState: {
    articles: [],
    status: 'loading',
    page: 1,
    error: null,
    totalArticles: null,
    currentArticle: null,
  },
  reducers: {
    changePage(state, action) {
      state.page = action.payload;
    },
    likeArticle(state, action) {
      const article = state.articles.find((article) => article.slug === action.payload);
      if (article) {
        article.favoritesCount += 1;
      }
    },
    unLikeArticle(state, action) {
      const article = state.articles.find((article) => article.slug === action.payload);
      if (article) {
        article.favoritesCount -= 1;
      }
    },
    likeArticlePage(state) {
      state.currentArticle.favoritesCount++;
    },
    unLikeArticlePage(state) {
      state.currentArticle.favoritesCount--;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchArtciles.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchArtciles.fulfilled, (state, action) => {
        state.status = 'resolved';
        state.articles = action.payload.articles;
        state.totalArticles = action.payload.articlesCount;
      })
      .addCase(fetchArtciles.rejected, (state, action) => {
        state.status = 'error';
        state.error = action.payload;
      })
      .addCase(fetchCurrentArticle.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchCurrentArticle.fulfilled, (state, action) => {
        state.status = 'resolved';
        state.currentArticle = action.payload;
      })
      .addCase(fetchCurrentArticle.rejected, (state, action) => {
        state.status = 'error';
        state.error = action.payload;
      })
      .addCase(postArticle.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(postArticle.fulfilled, (state) => {
        state.status = 'resolved';
      })
      .addCase(postArticle.rejected, (state, action) => {
        state.status = 'error';
        state.error = action.payload;
      })
      .addCase(deleteArticle.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteArticle.fulfilled, (state) => {
        state.status = 'resolved';
      })
      .addCase(deleteArticle.rejected, (state, action) => {
        state.status = 'error';
        state.error = action.payload;
      })
      .addCase(editArticle.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(editArticle.fulfilled, (state) => {
        state.status = 'resolved';
      })
      .addCase(editArticle.rejected, (state, action) => {
        state.status = 'error';
        state.error = action.payload;
      });
  },
});

export default artcileSlice.reducer;
export const { changePage, likeArticle, unLikeArticle, unLikeArticlePage, likeArticlePage } = artcileSlice.actions;

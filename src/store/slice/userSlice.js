import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const createUser = createAsyncThunk('user/createUser', async function (data) {
  try {
    const response = await fetch('https://blog.kata.academy/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(JSON.stringify(errorData));
    }
    return await response.json();
  } catch (error) {
    console.error('Error creating user:', error);
    return Promise.reject(error);
  }
});

export const loginUser = createAsyncThunk('user/loginUser', async function (data) {
  try {
    const response = await fetch('https://blog.kata.academy/api/users/login', {
      method: 'POST',
      headers: {
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
    console.error('Error creating user:', error);
    return Promise.reject(error);
  }
});

export const updateUser = createAsyncThunk('user/updateUser', async function ({ data, tokenUser }) {
  try {
    const response = await fetch('https://blog.kata.academy/api/user', {
      method: 'PUT',
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
    console.error('Error creating user:', error);
    return Promise.reject(error);
  }
});

export const favorite = createAsyncThunk('user/favorite', async function ({ slug, token }) {
  try {
    const response = await fetch(`https://blog.kata.academy/api/articles/${slug}/favorite`, {
      method: 'POST',
      headers: {
        Authorization: `Token ${token}`,
        'Content-Type': 'application/json',
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

export const unFavorite = createAsyncThunk('user/unFavorite', async function ({ slug, token }) {
  try {
    const response = await fetch(`https://blog.kata.academy/api/articles/${slug}/favorite`, {
      method: 'DELETE',
      headers: {
        Authorization: `Token ${token}`,
        'Content-Type': 'application/json',
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

const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: JSON.parse(localStorage.getItem('user')) || null,
    status: null,
    error: null,
    login: JSON.parse(localStorage.getItem('loginStatus')) || false,
    favorited: JSON.parse(localStorage.getItem('favorited')) || [],
  },
  reducers: {
    clearStatus(state, action) {
      const { error } = state;
      if (error && Object.prototype.hasOwnProperty.call(error, action.payload)) {
        delete state.error[action.payload];
      }
      state.status = state.error === null;
    },
    logoutUser(state) {
      state.user = null;
      state.login = false;
      state.favorited = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.status = 'resolved';
        state.user = action.payload;
        state.error = null;
      })
      .addCase(createUser.rejected, (state, action) => {
        state.status = 'error';
        state.error = JSON.parse(action.error.message).errors;
      })
      .addCase(loginUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = 'resolved';
        state.user = action.payload;
        state.error = null;
        state.login = true;
        localStorage.setItem('user', JSON.stringify(action.payload));
        localStorage.setItem('loginStatus', true);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = 'error';
        state.error = JSON.parse(action.error.message).errors;
      })
      .addCase(updateUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.status = 'resolved';
        state.user = action.payload;
        state.error = null;
        state.login = true;
        localStorage.setItem('user', JSON.stringify(action.payload));
        localStorage.setItem('loginStatus', true);
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.status = 'error';
        state.error = JSON.parse(action.error.message).errors;
      })
      .addCase(favorite.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(favorite.fulfilled, (state, action) => {
        state.status = 'resolved';
        if (state.favorited) {
          state.favorited = [...state.favorited, action.payload.article.slug];
        } else {
          state.favorited = [action.payload.article.slug];
        }
        localStorage.setItem('favorited', JSON.stringify(state.favorited));
      })
      .addCase(favorite.rejected, (state, action) => {
        state.status = 'error';
        state.error = JSON.parse(action.error.message).errors;
      })
      .addCase(unFavorite.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(unFavorite.fulfilled, (state, action) => {
        state.status = 'resolved';
        state.favorited = state.favorited.filter((slug) => slug !== action.payload.article.slug);
        localStorage.setItem('favorited', JSON.stringify(state.favorited));
      })
      .addCase(unFavorite.rejected, (state, action) => {
        state.status = 'error';
        state.error = JSON.parse(action.error.message).errors;
      });
  },
});

export default userSlice.reducer;
export const { clearStatus, logoutUser } = userSlice.actions;

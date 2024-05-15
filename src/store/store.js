import { configureStore } from '@reduxjs/toolkit';

import userReducer from './slice/userSlice';
import articleReduser from './slice/articleSlice';

export default configureStore({
  reducer: {
    article: articleReduser,
    user: userReducer,
  },
});

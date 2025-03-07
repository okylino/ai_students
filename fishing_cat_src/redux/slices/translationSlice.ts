import { createSlice } from '@reduxjs/toolkit';

interface TranslationState {
  lang: string;
  translatedQuestionTitle: string;
  translatedContent: string[];
  isTextTranslationFetching: boolean;
  showTranslate: boolean;
}

const initialState: TranslationState = {
  lang: '',
  translatedQuestionTitle: '',
  translatedContent: [],
  isTextTranslationFetching: false,
  showTranslate: false,
};

export const translationSlice = createSlice({
  name: 'translation',
  initialState,
  reducers: {
    setTextTranslation: (state, action) => {
      state.lang = action.payload.lang;
      state.translatedQuestionTitle = action.payload.translatedQuestionTitle;
      state.translatedContent = action.payload.translatedContent;
    },
    setIsTextTranslationFetching: (state, action) => {
      state.isTextTranslationFetching = action.payload;
    },
    setShowTranslate: (state, action) => {
      state.showTranslate = action.payload;
    },
    resetTextTranslation: (state) => {
      state.translatedQuestionTitle = '';
      state.translatedContent = [];
      state.showTranslate = false;
    },
  },
});

export const { setTextTranslation, setIsTextTranslationFetching, setShowTranslate, resetTextTranslation } =
  translationSlice.actions;

export default translationSlice.reducer;

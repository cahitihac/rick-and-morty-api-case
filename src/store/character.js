import { createSlice } from '@reduxjs/toolkit';

import { CHARACTER_API_URL } from '../api';

const characterSlice = createSlice({
  name: 'character',
  initialState: {
    info: {},
    characters: [],
    selectedCharacter: {}
  },
  reducers: {
    getCharactersSuccess(state, action) {
      const { info, results } = action.payload;

      state.info = info;
      results.forEach(character => {
        state.characters.push(character);
      });
    },
    getSelectedCharacterSuccess(state, action) {
      const character = action.payload;

      state.selectedCharacter = character;
    },
    clearSelectedCharacter(state) {
      state.selectedCharacter = {};
    }
  }
});

const { actions, reducer } = characterSlice;
export const {
  getCharactersSuccess,
  getSelectedCharacterSuccess,
  clearSelectedCharacter
} = actions;
export default reducer;

export const fetchCharacters = url => {
  return async (dispatch, getState) => {
    // if url is not provided then it means
    // this was dispatched when user scrolled to the bottom of the page
    // so get the url from the state that will fetch next 20 characters
    if (!url) {
      const { character: { info } } = getState();
      url = info.next;
    }

    // if reached the end of all characters
    // info.next will be null
    // do nothing, just return
    if (!url) return;

    try {
      const response = await fetch(url);
      const characters = await response.json();

      dispatch(getCharactersSuccess(characters));
    } catch (error) {
      // here an action can be dispatched to let the user know what's happened
      // perhaps show a notificiation
      // for now let's just leave a console log
      console.error('an error occured while trying to fetch characters:', error);
    }
  }
};

export const fetchCharacter = id => {
  return async dispatch => {
    try {
      const response = await fetch(`${CHARACTER_API_URL}/${id}`);
      const character = await response.json();
  
      dispatch(getSelectedCharacterSuccess(character));
    } catch (error) {
      // here an action can be dispatched to let the user know what's happened
      // perhaps show a notificiation
      // for now let's just leave a console log
      console.error('an error occured while trying to fetch character:', error);
    }
  }
};

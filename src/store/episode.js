import { createSlice } from '@reduxjs/toolkit';

import { EPISODE_API_URL } from '../api';

const episodeSlice = createSlice({
  name: 'episode',
  initialState: {
    episodes: []
  },
  reducers: {
    getEpisodesSuccess(state, action) {
      const episodes = action.payload;
       episodes.forEach(episode => {
        state.episodes.push(episode);
       });
    },
    clearEpisodes(state) {
      state.episodes = [];
    }
  }
});

const { actions, reducer } = episodeSlice;
export const { getEpisodesSuccess, clearEpisodes } = actions;
export default reducer;

export const fetchEpisodes = episodeList => {
  return async dispatch => {
    try {
      const response = await fetch(`${EPISODE_API_URL}/${episodeList}`);
      let episodes = await response.json();

      // some characters haven been only in one episode
      // so in that case the data will be an object instead of an array
      if (!Array.isArray(episodes)) {
        episodes = [episodes];
      }
  
      dispatch(getEpisodesSuccess(episodes));
    } catch (error) {
      // here an action can be dispatched to let the user know what's happened
      // perhaps show a notificiation
      // for now let's just leave a console log
      console.error('an error occured while trying to fetch episodes:', error);
    }
  }
};
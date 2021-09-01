import axios from 'axios';

const setUserScore = async (userData) => {
  const data = await axios.post('https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/FN1ZIQ0tRBnXA1C9RtBj/scores/', userData)
    .then((response) => response.data).catch((error) => error);
  return data.result;
};

const setData = async (playerName, playerScore, playMode) => {
  const userData = { user: { name: playerName, mode: playMode }, score: playerScore };
  const message = await setUserScore(userData);
  return message;
};

export default setData;
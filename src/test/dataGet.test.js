// eslint-disable-next-line import/no-unresolved
import axios from 'axios';
import getData from '../helpers/dataGet';
import 'regenerator-runtime/runtime';

jest.mock('axios');
test('should fetch result data with users and scores', async () => {
  const dbData = { data: { result: [{ score: 9030, user: { name: 'Zulfizar', mode: 'easy' } }, { score: 70, user: { name: 'aaaaa', mode: 'hard' } }] } };
  axios.get.mockResolvedValue(dbData);
  const response = await getData('easy');
  expect(response.length).toEqual(1);
});
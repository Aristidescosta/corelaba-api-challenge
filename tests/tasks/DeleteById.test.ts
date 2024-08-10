/* eslint-disable no-undef */
import { StatusCodes } from 'http-status-codes';
import { testServer } from '../jest.setup';

describe('Tarefas - DeleteById', () => {
  it('Apaga o registro', async () => {
    const res1 = await testServer
      .delete('/tasks/1')
      .send();

    expect(res1.statusCode).toEqual(StatusCodes.NO_CONTENT);
  });
  it('Tenta apagar registro que não existe', async () => {
    const res1 = await testServer
      .delete('/tasks/99999')
      .send();

    expect(res1.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(res1.body).toHaveProperty('errors.default');
  });
});
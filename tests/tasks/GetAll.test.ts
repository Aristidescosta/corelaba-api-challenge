/* eslint-disable no-undef */
import { StatusCodes } from 'http-status-codes';
import { testServer } from '../jest.setup';

describe('Tarefas - GetAll', () => {
  it('Buscar todas as tarefas', async () => {
    const res1 = await testServer
      .post('/tasks')
      .send({
        title: 'Concluir o teste',
        description: 'Se eu passar nesse teste minha vida vai mudar',
        isCompleted: false,
        color: '#FFF',
        id: 'Este campo é obrigatório',
        isFavorite: false,
        createdAt: 'Sat Aug 10 2024 14:11:08 GMT+0100 (Horário Padrão da África Ocidental)',
        updatedAt: 'Sat Aug 10 2024 14:11:08 GMT+0100 (Horário Padrão da África Ocidental)'
      });



    const resData = await testServer
      .get('/tasks');

    /* expect(Number(resData.header['x-total-count'])).toBeGreaterThan(0);
    expect(res1.statusCode).toEqual(StatusCodes.OK);
    expect(res1.body.length).toBeGreaterThan(0); */
  });
});
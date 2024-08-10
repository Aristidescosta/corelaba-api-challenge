/* eslint-disable no-undef */
import { StatusCodes } from 'http-status-codes';
import { testServer } from '../jest.setup';



describe('Tarefas - Create', () => {
  it('Criar tarefa', async () => {
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

    expect(res1.statusCode).toEqual(StatusCodes.CREATED);
  });
  it('Tenta criar tarefa com o nome curto', async () => {
    const res1 = await testServer
      .post('/tasks')
      .send({
        title: 'Co',
        description: 'Se eu passar nesse teste minha vida vai mudar',
        isCompleted: false,
        color: '#FFF',
        id: 'Este campo é obrigatório',
        isFavorite: false,
        createdAt: 'Sat Aug 10 2024 14:11:08 GMT+0100 (Horário Padrão da África Ocidental)',
        updatedAt: 'Sat Aug 10 2024 14:11:08 GMT+0100 (Horário Padrão da África Ocidental)'
      });

    expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
  });
});
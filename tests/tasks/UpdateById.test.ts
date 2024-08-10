/* eslint-disable no-undef */
import { StatusCodes } from 'http-status-codes';
import { testServer } from '../jest.setup';

describe('Tarefas - Update', () => {
  it('Atualizar tarefa', async () => {
    const res1 = await testServer
      .put('/tasks/2')
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

    expect(res1.statusCode).toEqual(StatusCodes.OK);
  });
  it('Atualizar tarefa sem descrição', async () => {
    const res1 = await testServer
      .put('/tasks/2')
      .send({
        title: 'Concluir o teste',
        isCompleted: false,
        color: '#FFF',
        id: 'Este campo é obrigatório',
        isFavorite: false,
        createdAt: 'Sat Aug 10 2024 14:11:08 GMT+0100 (Horário Padrão da África Ocidental)',
        updatedAt: 'Sat Aug 10 2024 14:11:08 GMT+0100 (Horário Padrão da África Ocidental)'
      });

    expect(res1.statusCode).toEqual(StatusCodes.OK);
  });
  it('Tenta Atualizar tarefa com valor da cor menor 3', async () => {
    const res1 = await testServer
      .put('/tasks/2')
      .send({
        title: 'Co',
        isCompleted: false,
        color: '#FFF',
        id: 'Este campo é obrigatório',
        isFavorite: false,
        createdAt: 'Sat Aug 10 2024 14:11:08 GMT+0100 (Horário Padrão da África Ocidental)',
        updatedAt: 'Sat Aug 10 2024 14:11:08 GMT+0100 (Horário Padrão da África Ocidental)'
      });

    expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
  });
  it('Tenta Atualizar tarefa com com uma descrição muito grande', async () => {
    const res1 = await testServer
      .put('/tasks/2')
      .send({
        title: 'Concluir o teste',
        isCompleted: false,
        description: `
        Sat Aug 10 2024 14:11:08 GMT+0100 (Horário Padrão da África Ocidental)
        Sat Aug 10 2024 14:11:08 GMT+0100 (Horário Padrão da África Ocidental)
        Sat Aug 10 2024 14:11:08 GMT+0100 (Horário Padrão da África Ocidental)
        Sat Aug 10 2024 14:11:08 GMT+0100 (Horário Padrão da África Ocidental)
        Sat Aug 10 2024 14:11:08 GMT+0100 (Horário Padrão da África Ocidental)
        Sat Aug 10 2024 14:11:08 GMT+0100 (Horário Padrão da África Ocidental)
        Sat Aug 10 2024 14:11:08 GMT+0100 (Horário Padrão da África Ocidental)
        Sat Aug 10 2024 14:11:08 GMT+0100 (Horário Padrão da África Ocidental)
        Sat Aug 10 2024 14:11:08 GMT+0100 (Horário Padrão da África Ocidental)
        Sat Aug 10 2024 14:11:08 GMT+0100 (Horário Padrão da África Ocidental)
        Sat Aug 10 2024 14:11:08 GMT+0100 (Horário Padrão da África Ocidental)
        Sat Aug 10 2024 14:11:08 GMT+0100 (Horário Padrão da África Ocidental)
        Sat Aug 10 2024 14:11:08 GMT+0100 (Horário Padrão da África Ocidental)
        Sat Aug 10 2024 14:11:08 GMT+0100 (Horário Padrão da África Ocidental)
        Sat Aug 10 2024 14:11:08 GMT+0100 (Horário Padrão da África Ocidental)
        Sat Aug 10 2024 14:11:08 GMT+0100 (Horário Padrão da África Ocidental)
        Sat Aug 10 2024 14:11:08 GMT+0100 (Horário Padrão da África Ocidental)
        Sat Aug 10 2024 14:11:08 GMT+0100 (Horário Padrão da África Ocidental)
        Sat Aug 10 2024 14:11:08 GMT+0100 (Horário Padrão da África Ocidental)
        Sat Aug 10 2024 14:11:08 GMT+0100 (Horário Padrão da África Ocidental)
        Sat Aug 10 2024 14:11:08 GMT+0100 (Horário Padrão da África Ocidental)
        Sat Aug 10 2024 14:11:08 GMT+0100 (Horário Padrão da África Ocidental)
        Sat Aug 10 2024 14:11:08 GMT+0100 (Horário Padrão da África Ocidental)
        Sat Aug 10 2024 14:11:08 GMT+0100 (Horário Padrão da África Ocidental)
        Sat Aug 10 2024 14:11:08 GMT+0100 (Horário Padrão da África Ocidental)
        Sat Aug 10 2024 14:11:08 GMT+0100 (Horário Padrão da África Ocidental)
        Sat Aug 10 2024 14:11:08 GMT+0100 (Horário Padrão da África Ocidental)
        Sat Aug 10 2024 14:11:08 GMT+0100 (Horário Padrão da África Ocidental)
        Sat Aug 10 2024 14:11:08 GMT+0100 (Horário Padrão da África Ocidental)
        Sat Aug 10 2024 14:11:08 GMT+0100 (Horário Padrão da África Ocidental)`,
        color: '#FFF',
        id: 'lore',
        isFavorite: false,
        createdAt: 'Sat Aug 10 2024 14:11:08 GMT+0100 (Horário Padrão da África Ocidental)',
        updatedAt: 'Sat Aug 10 2024 14:11:08 GMT+0100 (Horário Padrão da África Ocidental)'
      });

    expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
  });
  it('Tenta Atualizar tarefa com o nome curto', async () => {
    const res1 = await testServer
      .put('/tasks/2')
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
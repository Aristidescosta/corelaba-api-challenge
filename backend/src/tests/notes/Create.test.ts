import { StatusCodes } from 'http-status-codes';

import { INote } from '../../server/database/models';
import { testServer } from '../jest.setup';


describe('Notes - Create', () => {
  describe('Cenários de sucesso', () => {
    it('Cria a nota', async () => {
      const note: Omit<INote, 'id'> = {
        title: 'Nova nota',
        description: 'Teste de nova nota',
        isFavorite: false,
        color: "#FFF",
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const res1 = await testServer
        .post('/notes')
        .send(note);

      expect(res1.body.id).not.toBeNull()
      expect(res1.body).toHaveProperty('id')
      expect(res1.body.id).not.toBeUndefined()
      expect(res1.statusCode).toEqual(StatusCodes.CREATED)
    });
  })

  describe('Cenários de falha', () => {
    it('Tenta criar nota com tamanho muito curto', async () => {
      const note: Omit<INote, 'id'> = {
        title: 'Nov',
        description: 'Teste de nova nota',
        isFavorite: false,
        color: "#FFF",
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const res1 = await testServer
        .post('/notes')
        .send(note);

      expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST)
      expect(res1.body).toHaveProperty('errors.body.title')
    });
    it('Tenta criar nota com descrição muito curto', async () => {
      const note: Omit<INote, 'id'> = {
        title: 'Novo teste',
        description: 'Test',
        isFavorite: false,
        color: "#FFF",
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const res1 = await testServer
        .post('/notes')
        .send(note);

      expect(res1.body).toHaveProperty('errors.body.description')
      expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST)
    });
    it('Tenta criar nota com cor muito curto', async () => {
      const note: Omit<INote, 'id'> = {
        title: 'Novo teste',
        description: 'Teste de nova nota',
        isFavorite: false,
        color: "FF",
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const res1 = await testServer
        .post('/notes')
        .send(note);

      expect(res1.body).toHaveProperty('errors.body.color')
      expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST)
    });
  })

});
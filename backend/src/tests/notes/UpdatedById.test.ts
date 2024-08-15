import { StatusCodes } from 'http-status-codes';

import { INote } from '../../server/database/models';
import { testServer } from '../jest.setup';


describe('Notes - Update', () => {
  describe('Cenários de sucesso', () => {
    it('Atualização da nota', async () => {
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

      const response = await testServer
        .put(`/notes/${res1.body.id}`)
        .send(res1.body)

      expect(response.statusCode).toEqual(StatusCodes.NO_CONTENT)
    });
  })

  describe('Cenários de falha', () => {
    it('Tenta atualizar nota com tamanho muito curto', async () => {
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

      const response = await testServer
        .put(`/notes/${res1.body.id}`)
        .send({ ...res1.body, title: 'No' })

      expect(response.statusCode).toEqual(StatusCodes.BAD_REQUEST)
      expect(response.body).toHaveProperty('errors.body.title')
    });
    it('Tenta atualizar nota com descrição muito curto', async () => {
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

      const response = await testServer
        .put(`/notes/${res1.body.id}`)
        .send({ ...res1.body, description: 'Test' })

      expect(response.body).toHaveProperty('errors.body.description')
      expect(response.statusCode).toEqual(StatusCodes.BAD_REQUEST)
    });
    it('Tenta atualizar nota com cor muito curto', async () => {
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

      const response = await testServer
        .put(`/notes/${res1.body.id}`)
        .send({ ...res1.body, color: 'FF' })

      expect(response.body).toHaveProperty('errors.body.color')
      expect(response.statusCode).toEqual(StatusCodes.BAD_REQUEST)
    });
  })
});
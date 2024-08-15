import { StatusCodes } from 'http-status-codes';

import { INote } from '../../server/database/models';
import { testServer } from '../jest.setup';


describe('Notes - GetAll', () => {
  describe('Cenários de sucesso', () => {
    it('Busca todas as notas', async () => {
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
      .get('/notes')
      .send()

      expect(Number(response.header['x-total-count'])).toBeGreaterThan(0)
      expect(response.statusCode).toEqual(StatusCodes.OK)
      expect(response.body.length).toBeGreaterThan(0)
    });
  })
});
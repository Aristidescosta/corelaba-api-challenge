import { StatusCodes } from 'http-status-codes';

import { INote as INote } from '../../server/database/models';
import { testServer } from '../jest.setup';


describe('Notes - Delete', () => {
  describe('Cenários de sucesso', () => {

    /* Cria a nota */
    it('Apaga a nota', async () => {
      const note: Omit<INote, 'id'> = {
        title: 'Nova nota',
        description: 'Teste de nova nota',
        isFavorite: false,
        color: "#FFF",
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const res1 = await testServer
        .post('/tasks')
        .send(note);

      expect(res1.body.id).not.toBeNull()
      expect(res1.body).toHaveProperty('id')
      expect(res1.body.id).not.toBeUndefined()
      expect(res1.statusCode).toEqual(StatusCodes.CREATED)

      const resDeleted = await testServer
        .delete(`/tasks/${res1.body.id}`)
        .send()


      expect(resDeleted.statusCode).toEqual(StatusCodes.NO_CONTENT)
    });
  })

  describe('Cenários de falha', () => {
    it('Tenta apagar uma nota que não existe', async () => {
      const res1 = await testServer
        .delete('/tasks/99999999')
        .send()

      expect(res1.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR)
      expect(res1.body).toHaveProperty('errors.default')
    });
  })

});
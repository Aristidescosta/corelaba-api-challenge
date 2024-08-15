import { NoteDAO, TNoteWithTotalCount } from "../services/api/Note"
import { INoteType } from "../types"

export const addNote = (note: Omit<INoteType, 'id'>): Promise<INoteType> => {
    return new Promise((resolve, reject) => {
        if (note.title.trim() === '') {
            reject('Insira o titulo da nota')
        } else if (note.description.trim() === '') {
            reject('Insira uma descrição para esta nota')
        } else if (note.description.length < 5) {
            reject('Descrição deve ter pelo menos 5 caracteres')
        }
        else {
            NoteDAO.create(note)
                .then((response) => {
                    if (response instanceof Error) {
                        reject(response)
                    } else {
                        resolve(response)
                    }
                })
                .catch((error) => console.log(error))
        }
    })
}

export const getAllNotes = (page: number, filter: string): Promise<TNoteWithTotalCount> => {
    return new Promise((resolve, reject) => {
        NoteDAO.getAll(page, filter)
            .then((response) => {
                if (response instanceof Error) {
                    reject(response)
                } else {
                    resolve(response)
                }
            })
            .catch((error) => console.log(error))
    })
}

export const updateNote = (note: INoteType): Promise<void> => {
    return new Promise((resolve, reject) => {
        NoteDAO.updateById(note.id, note)
            .then((response) => {
                if (response instanceof Error) {
                    reject(response)
                } else {
                    resolve(response)
                }
            })
            .catch((error) => console.log(error))
    });
}

export const deleteNote = (noteId: number): Promise<void> => {
    return new Promise((resolve, reject) => {
        NoteDAO.deleteById(noteId)
            .then((response) => {
                if (response instanceof Error) {
                    reject(response)
                } else {
                    resolve(response)
                }
            })
            .catch((error) => console.log(error))
    })
}
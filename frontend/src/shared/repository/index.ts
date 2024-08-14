import { TaskDAO } from "../services/api/Task"
import { ITaskType } from "../types"

export const addTask = (task: Omit<ITaskType, 'id'>): Promise<void> => {
    return new Promise((resolve, reject) => {
        if (task.title.trim() === '') {
            reject('Insira o titulo da tarefa')
        } else if (task.description.trim() === '') {
            reject('Insira uma nota para este item')
        }
        else {
            TaskDAO.create(task)
                .then((response) => {
                    if (response instanceof Error) {
                        reject(response)
                    } else {
                        resolve()
                    }
                })
                .catch(reject)
        }
    })
}

export const getAllTasks = async () => {
    try {
        return TaskDAO.getAll()
    } catch (error) {
        throw new Error("Erro ao recuperar os dados" + error);
    }
}
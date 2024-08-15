import { TaskDAO, TTaskWithTotalCount } from "../services/api/Task"
import { ITaskType } from "../types"

export const addTask = (task: Omit<ITaskType, 'id'>): Promise<ITaskType> => {
    return new Promise((resolve, reject) => {
        if (task.title.trim() === '') {
            reject('Insira o titulo da tarefa')
        } else if (task.description.trim() === '') {
            reject('Insira uma nota para este item')
        } else if (task.description.length < 5) {
            reject('Descrição deve ter pelo menos 5 caracteres')
        }
        else {
            TaskDAO.create(task)
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

export const getAllTasks = (page: number, filter: string): Promise<TTaskWithTotalCount> => {
    return new Promise((resolve, reject) => {
        TaskDAO.getAll(page, filter)
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

export const updateTask = (task: ITaskType): Promise<void> => {
    return new Promise((resolve, reject) => {
        TaskDAO.updateById(task.id, task)
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

export const deleteTask = (taskId: number): Promise<void> => {
    return new Promise((resolve, reject) => {
        TaskDAO.deleteById(taskId)
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
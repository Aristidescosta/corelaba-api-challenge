import { TaskDAO, TTaskWithTotalCount } from "../services/api/Task"
import { ITaskType } from "../types"

export const addTask = (task: Omit<ITaskType, 'id'>): Promise<number> => {
    return new Promise((resolve, reject) => {
        if (task.title.trim() === '') {
            reject('Insira o titulo da tarefa')
        } else if (task.description.trim() === '') {
            reject('Insira uma nota para este item')
        }
        else {
            console.log("Tarefa: " + task)
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

export const getAllTasks = (): Promise<TTaskWithTotalCount> => {
    return new Promise((resolve, reject) => {
        TaskDAO.getAll()
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
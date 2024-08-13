import { ITaskProps } from "../components/TaskCard";

const saveTask = (task: ITaskProps): Promise<void> => {
    return new Promise((resolve, reject) => {
        getAllTasks()
            .then(allTasks => {
                localStorage.setItem('tasks', JSON.stringify([...allTasks, task]))
                resolve()
            })
            .catch(reject)
    })
}

const getAllTasks = (): Promise<ITaskProps[]> => {
    return new Promise((resolve, reject) => {
        try {
            const tasks = localStorage.getItem('tasks')
            if (tasks) {
                const parseTasks = JSON.parse(tasks) as ITaskProps[]
                resolve(parseTasks)
            }
            resolve([])
        } catch (error) {
            reject(error)
        }
    })
}

export const TaskDAO = {
    saveTask,
    getAllTasks
}
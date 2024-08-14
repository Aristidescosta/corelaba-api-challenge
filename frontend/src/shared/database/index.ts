import { ITaskType } from "../components/TaskCard";

const saveTask = (task: ITaskType): Promise<void> => {
    return new Promise((resolve, reject) => {
        getAllTasks()
            .then(allTasks => {
                localStorage.setItem('tasks', JSON.stringify([...allTasks, task]))
                resolve()
            })
            .catch(reject)
    })
}

const getAllTasks = (): Promise<ITaskType[]> => {
    return new Promise((resolve, reject) => {
        try {
            const tasks = localStorage.getItem('tasks')
            if (tasks) {
                const parseTasks = JSON.parse(tasks) as ITaskType[]
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
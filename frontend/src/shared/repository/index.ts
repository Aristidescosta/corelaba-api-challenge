import { ITaskProps } from "../components/TaskCard";
import { TaskDAO } from "../database";

export const addTask = (task: ITaskProps) => {
    return new Promise((resolve, reject) => {
        if (task.title.trim() === '') {
            reject('Insira o titulo da tarefa')
        }

        TaskDAO.saveTask(task)
            .then(resolve)
            .catch(reject)
    })
}
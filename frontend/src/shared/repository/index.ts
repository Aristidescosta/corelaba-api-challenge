import { ITaskProps } from "../components/TaskCard";
import { TaskDAO } from "../database";

export const addTask = (task: ITaskProps): Promise<void> => {
    return new Promise((resolve, reject) => {
        if (task.title.trim() === '') {
            reject('Insira o titulo da tarefa')
        } else if (task.description.trim() === '') {
            reject('Insira uma nota para este item')
        }
        else {
            TaskDAO.saveTask(task)
                .then(resolve)
                .catch(reject)
        }
    })
}

export const getAllTasks = async () => {
    try {
        return TaskDAO.getAllTasks()
    } catch (error) {
        throw new Error("Erro ao recuperar os dados" + error);
    }
}
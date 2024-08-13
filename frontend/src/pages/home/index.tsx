import React, { useCallback, useEffect, useState } from "react";

import { ITaskProps, TaskCard } from "../../shared/components/TaskCard";
import { addTask, getAllTasks } from "../../shared/repository";
import { Header } from "../../shared/components/Header";

import { ModalDelete } from "../../shared/components/ModalDelete";
import "../../shared/styles/home.scss";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";

export const Home: React.FC = () => {
  const [tasks, setTasks] = useState<ITaskProps[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const functionThatReturnPromise = () =>
    toast.promise(functionThatReturnPromise, {
      pending: "Promise is pending",
      success: "Promise resolved 👌",
      error: "Promise rejected 🤯",
    });

  const onOpen = () => {
    setIsOpen(true);
  };
  const onClose = () => {
    setIsOpen(false);
  };

  const handleCreateTask = useCallback(async (task: ITaskProps) => {
    addTask(task)
      .then(() => {
        alert(`Tarefa ${task.title} criada com sucesso`);
        setTasks([...tasks, task]);
      })
      .catch((error) => alert(error));
  }, []);

  useEffect(() => {
    const onGetAllTasks = async () => {
      try {
        const allTasks = await getAllTasks();
        setTasks(allTasks);
      } catch (error) {
        let errorMessage = "Houve um erro interno, tente novamente";
        if (error instanceof Error) errorMessage = error.message;
        alert(errorMessage);
      }
    };
    onGetAllTasks();
  }, [handleCreateTask]);

  return (
    <>
      <Header />
      <main>
        <section className="center">
          <p>Enter para salvar</p>
          <p>Shift + Enter para quebra de linha</p>
          <TaskCard toCreate handleCreateTask={handleCreateTask} />
        </section>
        {tasks.filter((task) => task.isFavorite).length > 0 && (
          <article className="center">
            <p>Favoritos</p>

            <div className="list-task">
              {tasks
                .filter((task) => task.isFavorite)
                .map((item, index) => (
                  <TaskCard
                    key={index}
                    task={item}
                    handleCreateTask={handleCreateTask}
                    handleClickToDelete={onOpen}
                  />
                ))}
            </div>
          </article>
        )}

        {tasks.filter((task) => !task.isFavorite).length > 0 && (
          <article className="center">
            <p>Outras</p>

            <div className="list-task">
              {tasks
                .filter((task) => !task.isFavorite)
                .map((item, index) => (
                  <TaskCard
                    key={index}
                    task={item}
                    handleCreateTask={handleCreateTask}
                    handleClickToDelete={onOpen}
                  />
                ))}
            </div>
          </article>
        )}
        {isOpen && <ModalDelete onClose={onClose} />}
      </main>
    </>
  );
};

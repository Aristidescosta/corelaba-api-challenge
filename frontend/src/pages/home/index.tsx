import React, { useCallback, useEffect, useState } from "react";

import { Header, ModalDelete, TaskCard } from "@/shared/components";
import { addTask, getAllTasks } from "@/shared/repository";
import { ITaskType } from "@/shared/types";
import "@/shared/styles/home.scss";

import { toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

export const Home: React.FC = () => {
  const [tasks, setTasks] = useState<ITaskType[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const onOpen = () => {
    setIsOpen(true);
  };
  const onClose = () => {
    setIsOpen(false);
  };

  const handleCreateTask = useCallback(
    async (task: Omit<ITaskType, "id">) => {
      if (!isLoading) {
        setIsLoading(false);
        toast.promise(
          addTask(task)
            .then((id) => {
              setTasks((prevTasks) => [...prevTasks, { ...task, id }]);
            })
            .finally(() => setIsLoading(false)),
          {
            pending: "Criando tarefa...",
            success: `Tarefa "${task.title}" criada com sucesso! 👌`,
            error: {
              render({ data }) {
                console.log(typeof data);
                const errorMessage =
                  typeof data === "string" ? data : "Erro ao criar a tarefa 🤯";
                return data instanceof Error ? data.message : errorMessage;
              },
            },
          }
        );
      }
    },
    [setTasks]
  );

  useEffect(() => {
    const onGetAllTasks = async () => {
      setIsLoading(true);

      toast.promise(
        getAllTasks()
          .then((allTasks) => {
            setTasks(allTasks.data);
          })
          .finally(() => setIsLoading(false)),
        {
          pending: "Carregando a lista de tarefas...",
          success: "Lista de tarefas carregada com sucesso! 👌",
          error: {
            render({ data }) {
              console.log(typeof data);
              const errorMessage =
                typeof data === "string"
                  ? data
                  : "Erro ao carregar a lista de tarefas 🤯";
              return data instanceof Error ? data.message : errorMessage;
            },
          },
        }
      );
    };

    onGetAllTasks();
  }, []);

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

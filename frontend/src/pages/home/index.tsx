import React, { useCallback, useEffect, useMemo, useState } from "react";

import { Header, ModalDelete, TaskCard } from "@/shared/components";
import {
  addTask,
  deleteTask,
  getAllTasks,
  updateTask,
} from "@/shared/repository";
import { ITaskType } from "@/shared/types";
import "@/shared/styles/home.scss";

import { toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import { useTask } from "@/shared/hooks";
import { useTheBounce } from "@/shared/hooks/useTheBounce";
import { useSearchParams } from "react-router-dom";

export const Home: React.FC = () => {
  const [tasks, setTasks] = useState<ITaskType[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const setTask = useTask((state) => state.setTask);
  const isLoading = useTask((state) => state.isLoading);
  const setLoading = useTask((state) => state.setLoading);
  const [searchParams, setSearchParams] = useSearchParams();
  const { theBounce } = useTheBounce();
  const search = useMemo(() => {
    return searchParams.get("filter") || "";
  }, [searchParams]);

  const page = useMemo(() => {
    return Number(searchParams.get("page") || "1");
  }, [searchParams]);

  const onOpen = (task: ITaskType) => {
    setIsOpen(true);
    setTask(task);
  };
  const onClose = () => {
    setIsOpen(false);
  };

  const handleCreateTask = useCallback(
    async (task: Omit<ITaskType, "id">) => {
      if (!isLoading) {
        setLoading(false);
        toast.promise(
          addTask(task)
            .then((response) => {
              setTasks((prevTasks) => [...prevTasks, response]);
            })
            .finally(() => setLoading(false)),
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

  const handleDeleteTask = useCallback(
    async (taskId: number) => {
      setLoading(true);

      toast.promise(
        deleteTask(taskId)
          .then(() => {
            setTasks((prevTasks) =>
              prevTasks.filter((task) => task.id !== taskId)
            );
            onClose();
          })
          .finally(() => setLoading(false)),
        {
          pending: "Excluindo tarefa...",
          success: "Tarefa excluída com sucesso! 👌",
          error: {
            render({ data }) {
              const errorMessage =
                typeof data === "string" ? data : "Erro ao excluir a tarefa 🤯";
              return data instanceof Error ? data.message : errorMessage;
            },
          },
        }
      );
    },
    [setTasks]
  );

  const handleEditTask = useCallback(
    async (task: ITaskType, toFavorite?: boolean) => {
      setLoading(true);

      console.log("Tarefa atualizada: ", task.title, task.id);
      toast.promise(
        updateTask(task)
          .then(() => {
            setTasks((prevTasks) =>
              prevTasks.map((prevTask) =>
                prevTask.id === task.id ? task : prevTask
              )
            );
          })
          .finally(() => setLoading(false)),
        {
          pending: toFavorite
            ? `${
                task.isFavorite ? "Favoritando" : "Removendo dos favoritos a"
              } tarefa `
            : "Atualizando tarefa...",
          success: `Tarefa "${task.title}" atualizada com sucesso! 👌`,
          error: {
            render({ data }) {
              const errorMessage =
                typeof data === "string"
                  ? data
                  : "Erro ao atualizar a tarefa 🤯";
              return data instanceof Error ? data.message : errorMessage;
            },
          },
        }
      );
    },
    [setTasks]
  );

  useEffect(() => {
    const onGetAllTasks = async () => {
      setLoading(true);
      theBounce(() => {
        toast.promise(
          getAllTasks(page, search)
            .then((allTasks) => {
              setTasks(allTasks.data);
            })
            .finally(() => setLoading(false)),
          {
            pending:
              search.trim() !== ""
                ? "Pesquisando por tarefa"
                : "Carregando a lista de tarefas...",
            success:
              search.trim() !== ""
                ? undefined
                : "Lista de tarefas carregada com sucesso! 👌",
            error: {
              render({ data }) {
                const errorMessage =
                  typeof data === "string"
                    ? data
                    : "Erro ao carregar a lista de tarefas 🤯";
                return data instanceof Error ? data.message : errorMessage;
              },
            },
          }
        );
      });
    };

    onGetAllTasks();
  }, [theBounce, search, page]);

  return (
    <>
      <Header
        whenChangingSearchText={(texto) =>
          setSearchParams({ filter: texto, page: "1" }, { replace: true })
        }
        searchText={searchParams.get("filter") ?? ""}
      />
      <main>
        <section className="center">
          <p>Enter para salvar</p>
          <p>Shift + Enter para quebra de linha</p>
          <TaskCard toCreate handleCreateTask={handleCreateTask} />
        </section>

        {tasks.length === 0 ? (
          <p>Nenhuma tarefa cadastrada</p>
        ) : (
          <>
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
                        handleEditTask={handleEditTask}
                      />
                    ))}
                </div>
              </article>
            )}

            {tasks.filter((task) => !task.isFavorite).length > 0 && (
              <article className="center" style={{ paddingBottom: 24 }}>
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
                        handleEditTask={handleEditTask}
                      />
                    ))}
                </div>
              </article>
            )}
          </>
        )}
        {isOpen && (
          <ModalDelete handleDeleteTask={handleDeleteTask} onClose={onClose} />
        )}
      </main>
    </>
  );
};

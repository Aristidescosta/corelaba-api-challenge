import React from "react";
import "../../shared/styles/home.scss";
import { Header } from "../../shared/components/Header";

import { ITaskProps, TaskCard } from "../../shared/components/TaskCard";

export const Home: React.FC = () => {
  const task: ITaskProps = {
    title: "",
    isFavorite: false,
    color: "string",
  };
  return (
    <>
      <Header />
      <main>
        <section className="center">
          <TaskCard task={task} toCreate />
        </section>
        <article className="center">
          <p>Favoritos</p>

          <div className="list-task">
            {[1, 2, 3, 4, 5].map((item, index) => (
              <TaskCard task={task} key={index} />
            ))}
          </div>
        </article>
        <article className="center">
          <p>Outras</p>

          <div className="list-task">
            {[1, 2, 3, 4, 5].map((item, index) => (
              <TaskCard task={task} key={index} />
            ))}
          </div>
        </article>
      </main>
    </>
  );
};

import React from "react";
import "../../shared/styles/home.scss";
import { Header } from "../../shared/components/Header";

import { TaskCard } from "../../shared/components/TaskCard";

export const Home: React.FC = () => {
  return (
    <>
      <Header />
      <main>
        <section className="center">
          <TaskCard toCreate />
        </section>
        <article className="center">
          <p>Favoritos</p>

          <div className="list-task">
            {[1, 2, 3, 4, 5].map((item, index) => (
              <TaskCard key={index} />
            ))}
          </div>
        </article>
        <article className="center">
          <p>Outras</p>

          <div className="list-task">
            {[1, 2, 3, 4, 5].map((item, index) => (
              <TaskCard key={index} />
            ))}
          </div>
        </article>
      </main>
    </>
  );
};

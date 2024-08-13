import React, { useEffect, useRef, useState } from "react";
import { FaRegStar } from "react-icons/fa";
import { FaStar } from "react-icons/fa";
import { CgClose } from "react-icons/cg";

import { DropdownMenuColors } from "../DropdownMenuColors";
import { Divider } from "../Divider";

import "./task-card.scss";
import { Tooltip } from "../Tooltip";

interface ITaskCardProps {
  toCreate?: boolean;
  task?: ITaskProps;
  handleCreateTask: (task: ITaskProps) => Promise<void>;
  handleClickToDelete?: () => void;
}

export interface ITaskProps {
  title: string;
  description: string;
  isFavorite: boolean;
  color: string;
  createdAt: Date;
  updatedAt: Date;
}

export const TaskCard: React.FC<ITaskCardProps> = ({
  handleCreateTask,
  toCreate,
  handleClickToDelete,
  task,
}) => {
  const [cardTitle, setCardTitle] = useState("");
  const [description, setDescription] = useState("");
  const [cardColor, setCardColor] = useState("#FFF");
  const [isFavorite, setIsFavorite] = useState(false);
  const [showMenuColors, setShowMenuColors] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClickToEdit = () => {
    inputRef.current?.focus();
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setShowMenuColors(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (task) {
      setCardTitle(task.title);
      setCardColor(task.color);
      setIsFavorite(task.isFavorite)
    }
  }, [task]);

  const onChangeTaskColor = (color: string) => {
    setCardColor(color);
  };

  const onChangeFavoriteStatus = () => {
    if (task) {
      console.log(task.isFavorite);
      setIsFavorite(!task.isFavorite);
    } else {
      setIsFavorite((state) => !state);
    }
  };

  const onCreateTask = async () => {
    const task: ITaskProps = {
      color: cardColor,
      title: cardTitle,
      isFavorite: isFavorite,
      createdAt: new Date(),
      updatedAt: new Date(),
      description: description,
    };

    await handleCreateTask(task);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter") {
      if (e.shiftKey) {
        setCardTitle((prevText) => prevText + "\n");
      } else {
        e.preventDefault(); // Evita a quebra de linha padrão
        onCreateTask(); // Executa a função ao pressionar Enter
      }
    }
  };
  

  return (
    <div
      className={`card ${toCreate ? "h-32" : ""}`}
      style={{ backgroundColor: cardColor }}
    >
      <div className="flex">
        <Tooltip label={toCreate ? "Insira o título da tarefa" : cardTitle}>
          <input
            placeholder="Insira o título da tarefa"
            type="text"
            defaultValue={cardTitle}
            onChange={(e) => setCardTitle(e.target.value)}
            ref={inputRef}
          />
        </Tooltip>

        {!isFavorite ? (
          <FaRegStar
            size={24}
            cursor={"pointer"}
            onClick={onChangeFavoriteStatus}
          />
        ) : (
          <FaStar
            color={"#FFA000"}
            size={24}
            cursor={"pointer"}
            onClick={onChangeFavoriteStatus}
          />
        )}
      </div>

      <Divider />

      <div className="flex-content">
        <textarea
          onKeyDown={handleKeyDown}
          onChange={(e) => setDescription(e.target.value)}
          name="tasks"
          defaultValue={task?.description}
          placeholder={
            toCreate
              ? "Criar nota..."
              : "Clique ou arraste o arquivo para esta área para fazer upload"
          }
        />
      </div>

      <div className={`bottom`}>
        <div className="flex ">
          <img
            src="pencil.png"
            style={{ cursor: "pointer", height: 17, width: 17 }}
            className={`${toCreate ? "not-visible" : ""}`}
            onClick={handleClickToEdit}
          />

          <img
            src="painter.png"
            style={{ cursor: "pointer", height: 17, width: 17 }}
            onClick={() => setShowMenuColors(true)}
          />
          <div ref={dropdownRef}>
            {showMenuColors && (
              <DropdownMenuColors
                onChangeTaskColor={onChangeTaskColor}
                toCreate={toCreate}
              />
            )}
          </div>
        </div>
        <CgClose
          size={24}
          cursor={"pointer"}
          className={`${toCreate ? "not-visible" : ""}`}
          onClick={handleClickToDelete}
        />
      </div>
    </div>
  );
};

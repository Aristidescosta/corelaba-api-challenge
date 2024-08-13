import React, { useEffect, useRef, useState } from "react";
import { FaRegStar } from "react-icons/fa";
import { FaStar } from "react-icons/fa";
import { Divider } from "../Divider";
import { CgClose } from "react-icons/cg";
import "./task-card.scss";
import { DropdownMenuColors } from "../DropdownMenuColors";

interface ITaskCardProps {
  toCreate?: boolean;
  toEdit?: boolean;
  task: ITaskProps;
}

export interface ITaskProps {
  title?: string;
  isFavorite: boolean;
  color: string;
}

export const TaskCard: React.FC<ITaskCardProps> = ({
  toCreate,
  toEdit,
  task,
}) => {
  const [cardTitle, setCardTitle] = useState("Título");
  const [showMenuColors, setShowMenuColors] = useState(false);

  const removeMenuColors = () => {
    setShowMenuColors(false);
  };

  const dropdownRef = useRef<HTMLDivElement>(null);

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

  return (
    <div className={`card ${toCreate ? "h-32" : ""}`}>
      <div className="flex">
        {toCreate || toEdit ? (
          <input
            placeholder="Insira o título da tarefa"
            type="text"
            defaultValue={cardTitle}
            onChange={(e) => setCardTitle(e.target.value)}
          />
        ) : (
          <h3>{cardTitle}</h3>
        )}

        {!task.isFavorite ? (
          <FaRegStar size={24} />
        ) : (
          <FaStar color={"#FFA000"} size={24} />
        )}
      </div>

      <Divider />

      <div className="flex-content">
        <textarea
          name="tasks"
          placeholder={
            toCreate
              ? "Criar nota..."
              : "Clique ou arraste o arquivo para esta área para fazer upload"
          }
        ></textarea>
      </div>

      <div className={`bottom`}>
        <div className="flex ">
          <img
            src="pencil.png"
            style={{ cursor: "pointer", height: 17, width: 17 }}
            className={`${toCreate ? "not-visible" : ""}`}
          />

          <img
            src="painter.png"
            style={{ cursor: "pointer", height: 17, width: 17 }}
            onClick={() => setShowMenuColors(true)}
          />
          <div ref={dropdownRef}>
            {showMenuColors && <DropdownMenuColors toCreate={toCreate} />}
          </div>
        </div>
        <CgClose
          size={24}
          cursor={"pointer"}
          className={`${toCreate ? "not-visible" : ""}`}
        />
      </div>
    </div>
  );
};

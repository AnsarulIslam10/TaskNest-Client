import React from "react";
import { useDrop } from "react-dnd";
import DraggableTask from "../DraggableTask/DraggableTask";

const Category = ({
  category,
  tasks,
  moveTask,
  onDropTask,
  onEdit,
  onDelete,
}) => {
  const [{ isOver }, drop] = useDrop({
    accept: "TASK",
    drop: (draggedItem, monitor) => {
      if (draggedItem.category !== category) {
        onDropTask(draggedItem, category, tasks.length);
      }
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });
  return (
    <div
      ref={drop}
      className={`drop-shadow-md p-2 min-h-[200px] ${
        isOver ? "bg-[#ffecb3]" : "bg-[#f0f0f0]"
      }`}
    >
      <h2 className="text-2xl font-bold text-center py-2 bg-[#2ad9df]">
        {category.toUpperCase()}
      </h2>
      {tasks.map((task, index) => (
        <DraggableTask
          key={task._id}
          task={task}
          index={index}
          category={category}
          moveTask={moveTask}
          onDropTask={onDropTask}
          onEdit={onEdit}
          onDelete={onDelete}
        ></DraggableTask>
      ))}
    </div>
  );
};

export default Category;

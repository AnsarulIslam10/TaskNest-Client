import React, { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import EditTaskModal from "../Modal/EditTaskModal";
import { FaTrash } from "react-icons/fa6";
import { FaRegClock, FaStickyNote } from "react-icons/fa";
import { IoDocumentTextOutline } from "react-icons/io5";

const DraggableTask = ({
  task,
  index,
  moveTask,
  category,
  onDropTask,
  onEdit,
  onDelete,
}) => {
  const ref = useRef(null);

  const [, drop] = useDrop({
    accept: "TASK",
    hover(draggedItem, monitor) {
      if (draggedItem.category !== category) {
        return;
      }
      const dragIndex = draggedItem.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      moveTask(draggedItem.index, hoverIndex, category);

      draggedItem.index = hoverIndex;
    },
    drop(draggedItem, monitor) {
      if (draggedItem.category !== category) {
        onDropTask(draggedItem, category, index);
      }
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: "TASK",
    item: { ...task, index, category },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  drag(drop(ref));

  const fromattedTimestamp = new Date(task.timestamp).toLocaleString();
  return (
    <div
      ref={ref}
      style={{
        opacity: isDragging ? 0.5 : 1,
      }}
      className="flex justify-between p-2 mb-1 bg-[#16e9aa] cursor-move hover:scale-105 transition-all duration-300 mt-1"
    >
      <div className="flex-1">
        <p className="text-sm text-gray-700 flex items-center gap-1">
          {" "}
          <FaRegClock className="text-gray-400" />
          {fromattedTimestamp}
        </p>
        <h2 className="flex items-center gap-1 text-xl font-semibold text-gray-800">
          <FaStickyNote className="text-blue-500" /> {task.title}
        </h2>
        <p className="flex items-center gap-1 text-sm text-gray-600">
          <IoDocumentTextOutline className="text-green-500" />
          {task.description}
        </p>
      </div>
      <div className="flex gap-3">
        <EditTaskModal task={task} onEdit={onEdit}></EditTaskModal>
        <button onClick={() => onDelete(task)}>
          <FaTrash className="text-xl text-red-500" />
        </button>
      </div>
    </div>
  );
};

export default DraggableTask;

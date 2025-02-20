import React, { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import EditTaskModal from "../Modal/EditTaskModal";

const DraggableTask = ({ task, index, moveTask, category, onDropTask, onEdit, onDelete }) => {
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

  return (
    <div
      ref={ref}
      style={{
        opacity: isDragging ? 0.5 : 1,
        padding: "8px",
        marginBottom: "4px",
        backgroundColor: "#e0f7fa",
        cursor: "move",
      }}
      className="flex justify-between"
    >
      {task.title}
      <div className="flex gap-2">
        <EditTaskModal task={task} onEdit={onEdit}></EditTaskModal>
        <button onClick={()=> onDelete(task)}>delete</button>
      </div>
    </div>
  );
};

export default DraggableTask;

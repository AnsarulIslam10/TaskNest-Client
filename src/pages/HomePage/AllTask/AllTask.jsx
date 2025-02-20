import React, { useEffect, useState } from "react";
import useAxiosPublic from "../../../hooks/useAxiosPulic";
import Category from "../../../components/Category/Category";
import { toast } from "react-toastify";

const AllTask = () => {
  const axiosPublic = useAxiosPublic();
  const [tasks, setTasks] = useState([]);
  useEffect(() => {
    const fetchAllTask = async () => {
      const { data } = await axiosPublic.get("/tasks");
      setTasks(data);
    };
    fetchAllTask();
  }, [axiosPublic]);

  const getTasksByCategory = (category) =>
    tasks.filter((task) => task.category === category);
  const moveTask = (dragIndex, hoverIndex, category) => {
    const categoryTask = getTasksByCategory(category);
    const draggedTask = categoryTask[dragIndex];

    const newCategoryTask = [...categoryTask];
    newCategoryTask.splice(dragIndex, 1);
    newCategoryTask.splice(hoverIndex, 0, draggedTask);
    const newTasks = tasks.filter((task) => task.category !== category);
    setTasks([...newTasks, ...newCategoryTask]);
  };

  const handleDropTask = async (
    draggedTask,
    destinationCategory,
    dropIndex
  ) => {
    if (draggedTask.category !== destinationCategory) {
      const updatedDraggedTask = {
        ...draggedTask,
        category: destinationCategory,
      };
      let newTasks = tasks.filter((task) => task._id !== draggedTask._id);

      const destTask = tasks.filter(
        (task) => task.category === destinationCategory
      );
      destTask.splice(dropIndex, 0, updatedDraggedTask);

      const otherTasks = newTasks.filter(
        (task) => task.category !== destinationCategory
      );
      setTasks([...otherTasks, ...destTask]);

      try {
        await axiosPublic.put(`/tasks/${draggedTask._id}`, {
          category: destinationCategory,
        });
      } catch (error) {
        console.log(error);
      }
    }
  };

  // edit
  const handleEdit = () => {};

  // delete
  const handleDelete = async (task) => {
    await axiosPublic.delete(`/task/${task._id}`);
    setTasks((prev) => prev.filter((t) => t.id !== task._id));
    toast.success("deleted sccessfully")
  };

  const todoTasks = getTasksByCategory("todo");
  const inProgressTasks = getTasksByCategory("inProgress");
  const doneTasks = getTasksByCategory("done");
  return (
    <div className="mt-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        <Category
          category="todo"
          tasks={todoTasks}
          moveTask={moveTask}
          onDropTask={handleDropTask}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
        <Category
          category="inProgress"
          tasks={inProgressTasks}
          moveTask={moveTask}
          onDropTask={handleDropTask}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
        <Category
          category="done"
          tasks={doneTasks}
          moveTask={moveTask}
          onDropTask={handleDropTask}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>
    </div>
  );
};

export default AllTask;

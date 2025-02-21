import React, { useContext, useEffect, useState } from "react";
import useAxiosPublic from "../../../hooks/useAxiosPulic";
import Category from "../../../components/Category/Category";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { AuthContext } from "../../../providers/AuthProvider";
import { useQuery, useQueryClient } from "@tanstack/react-query";

const AllTask = () => {
  const axiosPublic = useAxiosPublic();
  // const [tasks, setTasks] = useState([]);
  const { user } = useContext(AuthContext);
  const queryClient = useQueryClient();

  const { data: tasks = [], refetch } = useQuery({
    queryKey: ["tasks", user?.uid],
    queryFn: async () => {
      const { data } = await axiosPublic.get(`/tasks?userId=${user.uid}`);
      return data;
    },
  });

  const getTasksByCategory = (category) =>
    tasks.filter((task) => task.category === category);
  const moveTask = (dragIndex, hoverIndex, category) => {
    const categoryTask = getTasksByCategory(category);
    const draggedTask = categoryTask[dragIndex];

    const newCategoryTask = [...categoryTask];
    newCategoryTask.splice(dragIndex, 1);
    newCategoryTask.splice(hoverIndex, 0, draggedTask);
    const otherTasks = tasks.filter((task) => task.category !== category);
    const newTasks = [...otherTasks, ...newCategoryTask];

    queryClient.setQueriesData(["tasks", user?.uid], newTasks);
  };

  const handleDropTask = async (
    draggedTask,
    destinationCategory,
    dropIndex
  ) => {
    if (draggedTask.category !== destinationCategory) {
      queryClient.setQueryData(["tasks", user?.uid], (oldTasks = []) => {
        const updatedTask = { ...draggedTask, category: destinationCategory };
        const filteredTasks = oldTasks.filter(
          (task) => task._id !== draggedTask._id
        );
        const destTasks = filteredTasks.filter(
          (task) => task.category === destinationCategory
        );
        destTasks.splice(dropIndex, 0, updatedTask);
        const otherTasks = filteredTasks.filter(
          (task) => task.category !== destinationCategory
        );
        return [...otherTasks, ...destTasks];
      });

      try {
        await axiosPublic.put(`/task/${draggedTask._id}`, {
          category: destinationCategory,
        });
      } catch (error) {
        console.log(error);
      }
    }
  };

  // delete
  const handleDelete = async (task) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await axiosPublic.delete(`/tasks/${task._id}`);
        if (res.data.deletedCount > 0) {
          // setTasks((prev) => prev.filter((t) => t.id !== task._id));
          refetch();
          toast.success("Task Deleted");
        }
      }
    });
  };

  const todoTasks = getTasksByCategory("to-do");
  const inprogressTasks = getTasksByCategory("in-progress");
  const doneTasks = getTasksByCategory("done");
  return (
    <div className="mt-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        <Category
          category="to-do"
          tasks={todoTasks}
          moveTask={moveTask}
          onDropTask={handleDropTask}
          onDelete={handleDelete}
        />
        <Category
          category="in-progress"
          tasks={inprogressTasks}
          moveTask={moveTask}
          onDropTask={handleDropTask}
          onDelete={handleDelete}
        />
        <Category
          category="done"
          tasks={doneTasks}
          moveTask={moveTask}
          onDropTask={handleDropTask}
          onDelete={handleDelete}
        />
      </div>
    </div>
  );
};

export default AllTask;

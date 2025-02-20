import React, { useEffect, useState } from "react";
import useAxiosPublic from "../../../hooks/useAxiosPulic";

const AllTask = () => {
  const axiosPublic = useAxiosPublic();
  const [tasks, setTasks] = useState([]);
  useEffect(() => {
    const fetchAllTask = async () => {
      const { data } = await axiosPublic.get("/tasks");
      setTasks(data);
    };
    fetchAllTask();
  }, []);

  const todoTasks = tasks.filter((task) => task.category === "todo");
  const inProgressTasks = tasks.filter(
    (task) => task.category === "inProgress"
  );
  const doneTasks = tasks.filter((task) => task.category === "done");
  console.log(todoTasks);
  return (
    <div className="mt-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        <div className="text-center">
          <h1 className="text-4xl font-bold">TODO</h1>
          <div>
            {todoTasks.length > 0
              ? todoTasks.map((task) => (
                  <div key={task._id} className="p-4 bg-sky-300">
                    <h2>{task.title}</h2>
                  </div>
                ))
              : ""}
          </div>
        </div>
        <div className="text-center">
          <h1 className="text-4xl font-bold">In Progress</h1>
          <div className="bg-sky-200 h-10">
          {inProgressTasks.length > 0
              ? inProgressTasks.map((task) => (
                  <div key={task._id}>
                    <h2>{task.title}</h2>
                  </div>
                ))
              : ""}
          </div>
        </div>
        <div className="text-center">
          <h1 className="text-4xl font-bold">DONE</h1>
          <div className="bg-sky-200 h-10">
          {doneTasks.length > 0
              ? doneTasks.map((task) => (
                  <div key={task._id} >
                    <h2>{task.title}</h2>
                  </div>
                ))
              : ""}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllTask;

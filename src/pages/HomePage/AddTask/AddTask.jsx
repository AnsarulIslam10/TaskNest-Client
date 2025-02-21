import React, { useContext } from "react";
import { toast } from "react-toastify";
import useAxiosPublic from "../../../hooks/useAxiosPulic";
import { AuthContext } from "../../../providers/AuthProvider";
import { useQueryClient } from "@tanstack/react-query";

const AddTask = () => {
  const axiosPublic = useAxiosPublic();
  const { user } = useContext(AuthContext);
  const queryClient = useQueryClient();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const title = form.title.value;
    const description = form.description.value;
    const category = form.category.value;

    if (!title) {
      toast.warning("Title is required.");
      return;
    }
    if (title.length > 50) {
      toast.warning("Title cannot exceed 50 characters.");
      return;
    }
    if (description.length > 200) {
      toast.warning("Description cannot exceed 200 characters.");
      return;
    }

    const newTask = {
      title,
      description,
      category,
      timestamp: new Date().toISOString(),
      userId: user?.uid,
    };

    try {
      await axiosPublic.post("/tasks", newTask);
      queryClient.invalidateQueries(["tasks", user?.uid]);
      toast.success("Task Added");
      form.reset();
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div>
      <div className="card bg-base-100 w-full shrink-0 border-sky-100 border">
        <form onSubmit={handleSubmit} className="card-body">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Title</span>
            </label>
            <input
              type="text"
              name="title"
              placeholder="title"
              className="input input-bordered"
              required
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Description</span>
            </label>
            <input
              type="text"
              name="description"
              placeholder="description"
              className="input input-bordered"
              required
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Category</span>
            </label>
            <select
              name="category"
              className="select select-bordered w-full max-w-xs"
            >
              <option value={"to-do"}>To-Do</option>
              <option value={"in-progress"}>In Progress</option>
              <option value={"done"}>Done</option>
            </select>
          </div>
          <div className="form-control mt-6">
            <button className="btn btn-primary">Add Task</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTask;

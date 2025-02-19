import React from "react";

const AddTask = () => {
  return (
    <div>
      <div className="card bg-base-100 w-full shrink-0 border-sky-100 border">
        <form className="card-body">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Title</span>
            </label>
            <input
              type="text"
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
              placeholder="description"
              className="input input-bordered"
              required
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Category</span>
            </label>
            <select className="select select-bordered w-full max-w-xs">
              <option value={"todo"}>To-Do</option>
              <option value={"inProgress"}>In Progress</option>
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

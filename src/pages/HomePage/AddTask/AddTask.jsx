import { Button, Dialog, DialogPanel } from "@headlessui/react";
import React, { useContext, useState } from "react";
import { toast } from "react-toastify";
import useAxiosPublic from "../../../hooks/useAxiosPulic";
import { AuthContext } from "../../../providers/AuthProvider";
import { useQueryClient } from "@tanstack/react-query";
import { FaPlus } from "react-icons/fa";
import { FaX } from "react-icons/fa6";

const AddTask = () => {
  let [isOpen, setIsOpen] = useState(false);
  const [titleLength, setTitleLength] = useState(0);
  const [desctiptionLength, setDesctiptionLength] = useState(0);
  const axiosPublic = useAxiosPublic();
  const { user } = useContext(AuthContext);
  const queryClient = useQueryClient();

  const title_limit = 50;
  const description_limit = 200;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const title = form.title.value;
    const description = form.description.value || "";
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
      close();
    } catch (error) {
      toast.error(error.message);
    }
  };

  function open() {
    setIsOpen(true);
  }

  function close() {
    setIsOpen(false);
  }

  const handleTitleChange = (e) => {
    const value = e.target.value;
    if (value.length <= title_limit) {
      setTitleLength(value.length);
    } else {
      e.target.value = value.slice(0, title_limit);
      toast.warning("Title character limit exceeded");
    }
  };
  const handleDescriptionChange = (e) => {
    const value = e.target.value;
    if (value.length <= description_limit) {
      setDesctiptionLength(value.length);
    } else {
      e.target.value = value.slice(0, description_limit);
      toast.warning("Description character limit exceeded");
    }
  };

  return (
    <>
      <Button
        onClick={open}
        className={
          "btn bg-[#16e9aa] hover:bg-[#14d69c] rounded-none drop-shadow-xl border-none"
        }
      >
        Add Task <FaPlus />
      </Button>
      <Dialog
        open={isOpen}
        as="div"
        className="relative z-10 focus:outline-none"
        onClose={close}
        __demoMode
      >
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <DialogPanel
              transition
              className="w-full max-w-2xl rounded-xl sm:p-6 p-2 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0 border"
            >
              <div className="flex justify-end text-gray-600 dark:text-gray-300">
                <Button className="text-2xl" onClick={close}>
                  <FaX />
                </Button>
              </div>
              <form onSubmit={handleSubmit} className="card-body dark:text-white">
                <h1 className="text-xl sm:text-2xl md:text-4xl font-bold text-center">
                  Add Your Task
                </h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 sm:gap-6">
                  <div className="form-control">
                    <label className="label">
                      <span className="text-xl font-semibold">Title</span>
                    </label>
                    <input
                      type="text"
                      name="title"
                      placeholder="Title"
                      className="input input-bordered text-black"
                      required
                      onChange={handleTitleChange}
                    />
                    <p className="text-right text-sm text-gray-500 dark:text-gray-200">
                      {titleLength} / {title_limit}
                    </p>
                  </div>
                  <div className="form-control">
                    <label className="label">
                      <span className="text-xl font-semibold">Category</span>
                    </label>
                    <select
                      name="category"
                      className="select select-bordered w-full max-w-xs text-black"
                    >
                      <option value={"to-do"}>To-Do</option>
                      <option value={"in-progress"}>In Progress</option>
                      <option value={"done"}>Done</option>
                    </select>
                  </div>
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="text-xl font-semibold">Description</span>
                  </label>
                  <input
                    type="text"
                    name="description"
                    placeholder="Write task description"
                    className="textarea textarea-bordered h-20 text-black"
                    onChange={handleDescriptionChange}
                  />
                </div>
                <p className="text-right text-sm text-gray-500 dark:text-gray-200">
                  {desctiptionLength} / {description_limit}
                </p>

                <div className="form-control mt-6">
                  <button className="btn bg-[#16e9aa] hover:bg-[#14d69c] border-none">
                    Add Task
                  </button>
                </div>
              </form>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  );
};

export default AddTask;

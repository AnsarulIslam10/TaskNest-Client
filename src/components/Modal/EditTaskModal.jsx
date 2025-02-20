import { Button, Dialog, DialogPanel } from "@headlessui/react";
import { useState } from "react";

import useAxiosPublic from "../../hooks/useAxiosPulic";
import { FaEdit } from "react-icons/fa";

export default function EditTaskModal({ task, onEdit }) {
  let [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: task.title,
    description: task.description,
    category: task.category,
  });

  const axiosPublic = useAxiosPublic();

  function open() {
    setIsOpen(true);
  }

  function close() {
    setIsOpen(false);
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await axiosPublic.put(`/tasks/${task._id}`, formData);

    if (onEdit) {
      onEdit({ ...task, ...formData });
    }
    close();
  };

  return (
    <>
      <Button onClick={open}>
        <FaEdit className="text-2xl text-sky-500"/>
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
              className="w-full max-w-2xl rounded-xl p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0 bg-sky-600"
            >
              <div className="flex justify-end text-gray-600">
                <Button className="text-2xl" onClick={close}>
                  X
                </Button>
              </div>
              {/* Content */}
              <form onSubmit={handleSubmit} className="card-body">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Title</span>
                  </label>
                  <input
                    type="text"
                    name="title"
                    placeholder="title"
                    value={formData.title}
                    onChange={handleChange}
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
                    value={formData.description}
                    onChange={handleChange}
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
                    value={formData.category}
                    onChange={handleChange}
                    className="select select-bordered w-full max-w-xs"
                  >
                    <option value={"todo"}>To-Do</option>
                    <option value={"inProgress"}>In Progress</option>
                    <option value={"done"}>Done</option>
                  </select>
                </div>
                <div className="form-control mt-6">
                  <button className="btn btn-primary">Add Task</button>
                </div>
              </form>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  );
}

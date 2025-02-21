import { Button, Dialog, DialogPanel } from "@headlessui/react";
import { useContext, useState } from "react";

import useAxiosPublic from "../../hooks/useAxiosPulic";
import { FaEdit } from "react-icons/fa";
import { AuthContext } from "../../providers/AuthProvider";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { FaX } from "react-icons/fa6";

export default function EditTaskModal({ task, onEdit }) {
  let [isOpen, setIsOpen] = useState(false);
  const { user } = useContext(AuthContext);
  const queryClient = useQueryClient();
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
    queryClient.invalidateQueries(["tasks", user?.uid]);
    toast.success("Task Updated");
    close();
  };

  return (
    <>
      <Button onClick={open}>
        <FaEdit className="text-2xl text-sky-500" />
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
              <div className="flex justify-end text-gray-600">
                <Button className="text-2xl" onClick={close}>
                  <FaX />
                </Button>
              </div>
              {/* Content */}
              <form onSubmit={handleSubmit} className="card-body">
                <h1 className="text-xl sm:text-2xl md:text-4xl font-bold text-center">
                  Edit Your Task
                </h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 sm:gap-6">
                  <div className="form-control">
                    <label className="label">
                      <span className="text-xl font-semibold">Title</span>
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
                      <span className="text-xl font-semibold">Category</span>
                    </label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      className="select select-bordered w-full max-w-xs"
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
                    placeholder="description"
                    value={formData.description}
                    onChange={handleChange}
                    className="textarea textarea-bordered h-20"
                    required
                  />
                </div>

                <div className="form-control mt-6">
                  <button className="btn bg-[#16e9aa] hover:bg-[#14d69c] border-none">Edit Task</button>
                </div>
              </form>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  );
}

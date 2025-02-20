import { Button, Dialog, DialogPanel } from "@headlessui/react";
import { useState } from "react";
import { IoClose } from "react-icons/io5";
import { toast } from "react-toastify";
import { FaEdit } from "react-icons/fa";
import { TbFidgetSpinner } from "react-icons/tb";
export default function UpdateProfileModal() {
  let [isOpen, setIsOpen] = useState(false);

 
  const axiosPublic = useAxiosPublic();
  
  function open() {
    setIsOpen(true);
  }

  function close() {
    setIsOpen(false);
  }
 
  return (
    <>
      <Button
        onClick={open}
        className="rounded-md btn disabled:bg-gray-300 bg-primary hover:bg-primary-hover py-2 px-4 text-sm font-medium text-secondary focus:outline-none  data-[focus]:outline-1 data-[focus]:outline-white"
      >
        <FaEdit /> Edit
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
              className="w-full max-w-2xl rounded-xl bg-white dark:bg-slate-900 dark:text-white drop-shadow-2xl text-black p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
            >
              <div className="flex justify-end text-gray-600">
                <Button className="text-2xl" onClick={close}>
                  <IoClose />
                </Button>
              </div>
              {/* Content */}
              
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  );
}
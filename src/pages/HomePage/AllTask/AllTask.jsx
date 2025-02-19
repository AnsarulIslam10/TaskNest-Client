import React from "react";

const AllTask = () => {
  return (
    <div className="mt-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        <div className="text-center">
          <h1 className="text-4xl font-bold">TODO</h1>
          <div className="bg-sky-200 h-10"></div>
        </div>
        <div className="text-center">
          <h1 className="text-4xl font-bold">In Progress</h1>
          <div className="bg-sky-200 h-10"></div>
        </div>
        <div className="text-center">
          <h1 className="text-4xl font-bold">DONE</h1>
          <div className="bg-sky-200 h-10"></div>
        </div>
      </div>
    </div>
  );
};

export default AllTask;

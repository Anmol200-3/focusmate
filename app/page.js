"use client";
import React, { useState } from "react";

const Page = () => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [mainTask, setMainTask] = useState([]);

  const submitHandler = (e) => {
    e.preventDefault();
    setMainTask([...mainTask, { title, desc, completed: false }]);
    setTitle(""); // Clear the title input
    setDesc(""); // Clear the description input
  };

  const deleteHandler = (i) => {
    let copytask = [...mainTask];
    copytask.splice(i, 1);
    setMainTask(copytask);
  };

  const toggleCompleteHandler = (i) => {
    let updatedTasks = [...mainTask];
    updatedTasks[i].completed = !updatedTasks[i].completed;
    setMainTask(updatedTasks);
  };

  let renderTask = <h2>No Task available</h2>;
  if (mainTask.length > 0) {
    renderTask = mainTask.map((t, i) => {
      return (
        <li
          key={i}
          className={`flex items-center justify-between mb-5 ${
            t.completed ? "bg-green-200" : "bg-white"
          } p-4 rounded shadow`}
        >
          <div className="flex flex-col w-2/3">
            <h5
              className={`text-xl font-semibold ${
                t.completed ? "line-through text-gray-500" : ""
              }`}
            >
              {t.title}
            </h5>
            <h6
              className={`text-lg font-medium ${
                t.completed ? "line-through text-gray-500" : ""
              }`}
            >
              {t.desc}
            </h6>
          </div>
          <div className="flex space-x-3">
            <button
              onClick={() => toggleCompleteHandler(i)}
              className={`px-4 py-2 rounded font-bold ${
                t.completed
                  ? "bg-yellow-400 text-white"
                  : "bg-green-400 text-white"
              }`}
            >
              {t.completed ? "Mark Incomplete" : "Mark Complete"}
            </button>
            <button
              onClick={() => deleteHandler(i)}
              className="bg-red-400 text-white px-4 py-2 rounded font-bold"
            >
              Delete
            </button>
          </div>
        </li>
      );
    });
  }

  return (
    <>
      <h1 className="bg-black text-white p-5 text-2xl font-bold text-center">
        Focus Mate
      </h1>

      <form onSubmit={submitHandler} className="flex flex-col items-center">
        <input
          type="text"
          className="text-2xl border-zinc-800 border-4 m-5 px-4 py-2 w-1/2"
          placeholder="Enter Task here"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          type="text"
          className="text-2xl border-zinc-800 border-4 m-5 px-4 py-2 w-1/2"
          placeholder="Enter Description here"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        />

        <button
          type="submit"
          className="bg-black text-white px-4 py-2 text-2xl font-bold rounded m-5"
        >
          Add Task
        </button>
      </form>
      <hr className="m-5" />

      <ul className="m-10">{renderTask}</ul>
    </>
  );
};

export default Page;

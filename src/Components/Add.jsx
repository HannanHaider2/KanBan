import React, { useState } from "react";

function Add(addTask) {
    const [modal, setModal] = useState(false);

    const toggle = () => {
        setModal(!modal);
    };
    const [title, setTitle] = useState();
    const [desc, setDesc] = useState();
    const [status, setStatus] = useState();
    const handleAdd = (e) => {
        e.preventDefault();
        const newTask = { title, desc, status };
        addTask(newTask);
    }

    return (
        <>
            <button
                className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mt-3 ml-5"
                type="button"
                onClick={toggle}
            >
                Create
            </button>

            {modal && (
                <div
                    tabIndex="-1"
                    aria-hidden="true"
                    className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50"
                >
                    <div className="relative p-4 w-full max-w-md bg-white rounded-lg shadow-lg">
                        <div className="flex items-center justify-between p-4 border-b rounded-t  border-gray-200">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-black">
                                Create Task
                            </h3>
                            <button
                                type="button"
                                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                                onClick={toggle}
                            >
                                <svg
                                    className="w-3 h-3"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 14 14"
                                >
                                    <path
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                                    />
                                </svg>
                                <span className="sr-only">Close modal</span>
                            </button>
                        </div>

                        <form className="p-4">
                            <div className="grid gap-4 mb-4 grid-cols-2">
                                <div className="col-span-2">
                                    <label className="block mb-2 text-sm font-medium  dark:text-black">
                                        Title
                                    </label>
                                    <input
                                        type="text"
                                        name="title"
                                        id="name"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-white-600 dark:placeholder-black-400 dark:text-black dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                        placeholder="Task Title"
                                        value={title}
                                        onChange={e => setTitle(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="col-span-2">
                                    <label className="block mb-2 text-sm font-medium  dark:text-black">
                                        Description
                                    </label>
                                    <textarea
                                        id="description"
                                        rows="4"
                                        className="block p-2.5 w-full text-sm text-black-900 bg-white-50 rounded-lg border border-white-300dark:bg-gray-600dark:placeholder-gray-400 "
                                        placeholder="Write Task description here"
                                        value={desc}
                                        onChange={e => setDesc(e.target.value)}
                                    ></textarea>
                                </div>
                                <div className="col-span-2 sm:col-span-1">
                                    <label className="block mb-2 text-sm font-medium  dark:text-black">
                                        Status
                                    </label>
                                    <select
                                        id="category"
                                        className="bg-white-50 border border-white-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-white-600 dark:border-white-500 dark:placeholder-black-400 dark:text-black "
                                        value={status}
                                        onChange={e => setStatus(e.target.value)}
                                    >
                                        <option value="">Select Task Status</option>
                                        <option value="electronics">Todo</option>
                                        <option value="fashion">In Progress</option>
                                        <option value="fashion">Done</option>
                                    </select>
                                </div>

                            </div>
                            <button
                                type="submit"
                                className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                onClick={handleAdd}
                            >
                                <svg
                                    className="me-1 -ms-1 w-5 h-5"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                                        clipRule="evenodd"
                                    ></path>
                                </svg>
                                Add Task
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
    
}

export default Add;

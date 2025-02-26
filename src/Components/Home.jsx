import React from 'react';
import Navbar from './Navbar';

import Card from './Card';

function Home({ Todo, Delete, Update }) {
    return (
        <>
            <div className='flex justify-evenly mt-3 text-2xl font-bold '>
                <div className='h-max bg-green-600   w-1/3 text-center pt-4'>
                    <h2 className="mb-4 text-white ">To Do</h2>
                    <div className="space-y-4 ">
                        {Todo.filter((task) => task && task.status === "ToDo").map((task) => (
                            <Card key={task.title} task={task} Delete={Delete} Update={Update} />
                        ))}
                    </div>
                </div>

                <div className='h-max bg-orange-500 w-1/3 text-center pt-4'>
                    <h2 className="mb-4 text-white">In Progress</h2>
                    <div className="space-y-4 ">
                        {Todo.filter((task) => task && task.status === "In Progress").map((task) => (
                            <Card key={task.title} task={task} Delete={Delete} Update={Update} />
                        ))}
                    </div>
                </div>

                <div className='h-max bg-red-600 w-1/3 text-center pt-4'>
                    <h2 className="mb-4 text-white">Done</h2>
                    <div className="space-y-4">
                        {Todo.filter((task) => task && task.status === "Done").map((task) => (
                            <Card key={task.title} task={task} Delete={Delete} Update={Update} />
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}

export default Home;

import React from 'react';
import Navbar from './Navbar';

import Card from './Card';

function Home({ Todo, Delete, Update, onDragStart, onDrop, onDragOver }) {
    return (
        <>
            <div className='flex justify-evenly mt-3 text-2xl font-bold h-[100vh] '>
                <div className=' bg-green-600 w-1/3 text-center pt-4' onDragOver={onDragOver} onDrop={(e) => {
                    onDrop(e, "ToDo")
                }}>
                    <h2 className="mb-4 text-white ">To Do</h2>
                    <div className="space-y-4 ">
                        {Todo.filter((task) => task && task.status === "ToDo").map((task, index) => (
                            <Card key={task.title} task={task} Delete={Delete} Update={Update} onDragStart={onDragStart} index={index} />
                        ))}
                    </div>
                </div>

                <div className='h-auto bg-orange-500 w-1/3 text-center pt-4' onDragOver={onDragOver} onDrop={(e) => {
                    onDrop(e, "Inprogress")
                }}>
                    <h2 className="mb-4 text-white">Inprogress</h2>
                    <div className="space-y-4 ">
                        {Todo.filter((task) => task && task.status === "Inprogress").map((task, index) => (
                            <Card key={task.title} task={task} Delete={Delete} Update={Update} onDragStart={onDragStart} index={index} />
                        ))}
                    </div>
                </div>

                <div className='h-auto bg-red-600 w-1/3 text-center pt-4' onDragOver={onDragOver} onDrop={(e) => {
                    onDrop(e, "Done")
                }}>
                    <h2 className="mb-4 text-white">Done</h2>
                    <div className="space-y-4">
                        {Todo.filter((task) => task && task.status === "Done").map((task, index) => (
                            <Card key={task.title} task={task} Delete={Delete} Update={Update} onDragStart={onDragStart} index={index} />
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}

export default Home;

import React from 'react';

function Card({ task, Delete, Update, onDragStart, index }) {
    return (
        <div
            className="card block rounded-lg bg-white p-6 ml-12 mr-11 w-58 mb-2 border border-3-black"
            draggable="true"
            onDragStart={(e) => onDragStart(e, task)}
            data-index={index}
        >
            <h4 className="mb-2 text-2xl font-medium leading-tight text-black-800">
                {task.title}
            </h4>
            <div>
                <h3 className="font-bold">Description</h3>
                <p className="mb-4 text-sm text-black-100">{task.desc}</p>
            </div>
            <div>
                <button className="bg-red-800 text-white p-3 rounded-xl mr-1" onClick={() => Delete(task)}>
                    Delete
                </button>
                <button className="bg-lime-700 text-white p-3 rounded-xl" onClick={() => Update(task)}>
                    Update
                </button>
            </div>
        </div>
    );
}

export default Card;

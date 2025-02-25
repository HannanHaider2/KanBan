import React from 'react'

function Card({ Todo }) {
    return (
        <>
            <div
                className="block rounded-lg bg-white p-6 dark:bg-white-700 ml-28 w-64 border border-3-black"
            >
                <h4
                    className="mb-2 text-xl font-medium leading-tight text-black-800 dark:text-black-50">
                    {Todo.title}
                </h4>
                <div>
                    <h3 className='font-bold'>Description</h3>
                    <p className="mb-4 text-base text-white-600 dark:text-black-200">
                        {Todo.desc}
                    </p>
                </div>

            </div>
        </>
    )
}

export default Card
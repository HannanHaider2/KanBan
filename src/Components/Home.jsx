import React from 'react'
import Navbar from './Navbar'
import Add from './Add'
import Card from './Card'

function Home({ Todo }) {

    return (
        <>

            <div className='flex justify-evenly mt-3 text-2xl font-bold '>
                <div className='h-screen bg-slate-500 w-1/4 text-center'>To Do
                    {Todo.filter((obj) => obj.staus === "ToDo").map((obj) => <Card task={obj} />)}
                    {/* { <Card /> } */}
                </div>


                <div className='h-screen bg-slate-500 w-1/4 text-center'>In Progress
                    {/* {{
                        Todo.filter(task => task.status === "In Progress").map(task => (
                            <Card key={task.title} Todo={[task]} />
                        ))
                    }} */}
                </div>
                <div className='h-screen bg-slate-500 w-1/4 text-center'>Done
                    {/* {Todo.filter(task => task.status === "Done").map(task => (
                        <Card key={task.title} Todo={[task]} />
                    ))} */}
                </div>
            </div>
        </>
    )
}

export default Home
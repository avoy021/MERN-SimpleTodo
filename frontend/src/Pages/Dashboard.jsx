import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { reset,createTodo, fetchTodos, removeTodo, updateTodo } from "../features/todos/todoSlice";

const Dashboard = () => {
    const [text,setText] = useState("");
    const [updatedText,setUpdatedText] = useState("");

    const { user } = useSelector(state => state.auth);
    const { todos,isLoading } = useSelector(state => state.userTodo);
    const navigate = useNavigate();
    const dispatch  = useDispatch();

   
   useEffect(() => {
        dispatch(fetchTodos());
    },[])

    useEffect(() => {
        if(!user) {
            navigate('/register');
        }
        console.log("useEffect",todos)
        if(todos){
            dispatch(reset());
        }
        
    },[user,todos,isLoading])

    const handleAddTodo = () => {
        dispatch(createTodo(text));
        setText("");
    }

    const handleDeleteTodo = (e) => {
        console.log(typeof e.target.id,e.target.id);
        dispatch(removeTodo(e.target.id));
    }
    const handleUpdateTodo = (e) => {
        const args = {todoId:e.target.id,content:updatedText}
        dispatch(updateTodo(args));
    }
    const handleOnFocus = (e) => {
        e.target.readOnly = false;
        setUpdatedText(e.target.defaultValue);
    }

    return (
        <>
            <div className="font-bold text-3xl mb-7">Welcome to the Dashboard</div>
            <div className="p-2 mb-7">
                    <input type="text" name="todo" id="todo" 
                        placeholder="Enter your todo here" 
                        value={text} 
                        onChange={(e) => setText(e.target.value)}
                        className="outline-none border-solid border-2 border-black py-2 px-7 rounded mr-4"
                    />
                    <button className="mb-5 py-2 px-3 bg-green-600 rounded text-center text-white" onClick={handleAddTodo}>Add Todo</button>
            </div>
            <div className="">
                {
                    (todos.length>0) ? (
                        todos.map(todo => {
                            return (
                                <>
                                    <li key={todo.id} className="w-fit list-none px-5 py-2 bg-gray-900 rounded m-3">
                                        <input type="text" name="content" id="content" 
                                            className="inline-block font-bold text-white mr-4 px-4 py-2 bg-gray-900 border-solid border-green-400 border-2 rounded"
                                            defaultValue={todo.content}
                                            readOnly={true}
                                            onFocus={handleOnFocus}
                                            onChange={(e) => setUpdatedText(e.target.value)}
                                            onBlur={(e) => {
                                                e.target.value = todo.content;
                                            }}
                                        />
                                        <button 
                                        className="ml-4 py-1 px-2 bg-green-600 rounded text-center text-white" 
                                        onClick={handleUpdateTodo} id={todo.id}>
                                            Update
                                        </button>
                                        <button 
                                        className="ml-4 py-1 px-3 bg-green-600 rounded font-bold text-center text-white" 
                                        onClick={handleDeleteTodo} id={todo.id} >
                                            Mark as done
                                        </button>
                                    </li>
                                </>
                            )
                        })
                    ) : (
                        <div className="font-bold">No todos to show</div>
                    )
                }
            </div>
            {
                isLoading? (
                    <div className="font-bold text-red-500">Wait while the todos are loading</div>
                )
                : null
            }
            

        </>
    )
}

export default Dashboard;
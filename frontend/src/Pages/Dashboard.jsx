import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import {
  reset,
  createTodo,
  fetchTodos,
  removeTodo,
  updateTodo,
} from "../features/todos/todoSlice";

const Dashboard = () => {
  const [text, setText] = useState("");
  const [editableTodos, setEditableTodos] = useState({});
  const [isEditable, setIsEditable] = useState({});

  const { user } = useSelector((state) => state.auth);
  const { todos, isLoading } = useSelector((state) => state.userTodo);
  const navigate = useNavigate();
  const dispatch = useDispatch();

 

  useEffect(() => {
    let isCancelled = false;
    if (user) {
      if(!isCancelled){
        dispatch(fetchTodos());
        // console.log('Fetch post has been executed');
      }
    }

    return () => {
      // console.log('Cleanup says fetch request cancelled');
      isCancelled = true;
    }
  }, []);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
    return () => {
      dispatch(reset());
    }
  }, [user, todos, isLoading]);
  



  const handleAddTodo = () => {
    dispatch(createTodo(text));
    setText("");
  };

  const handleDeleteTodo = (todoId) => {
    dispatch(removeTodo(todoId));
  };
  const handleUpdateTodo = (todoId) => {
    const args = { todoId, content: editableTodos[todoId] };
    dispatch(updateTodo(args));
    setEditableTodos((prevState) => ({ ...prevState, [todoId]: "" }));
  };
  const handleOnFocus = (todoId, content) => {
    setIsEditable((prevState) => ({ ...prevState, [todoId]: true }));
    setEditableTodos((prevState) => ({ ...prevState, [todoId]: content }));
  };
  const handleInputChange = (e, todoId) => {
    const { value } = e.target;
    setEditableTodos((prevState) => ({ ...prevState, [todoId]: value }));
  };

  return (
    <>
      {user ? (
        <>
          <div className="font-bold text-3xl mb-7">
            Welcome to the Dashboard
          </div>
          <div className="p-2 mb-7">
            <input
              type="text"
              name="todo"
              id="todo"
              placeholder="Enter your todo here"
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="outline-none border-solid border-2 border-black py-2 px-7 rounded mr-4"
            />
            <button
              className="mb-5 py-2 px-3 bg-green-600 rounded text-center text-white"
              onClick={handleAddTodo}
            >
              Add Todo
            </button>
          </div>
        </>
      ) : null}

      <div className="">
        {(typeof todos !== 'string') && (todos.length > 0) ? (
          todos.map((todo) => {
            return (
              <>
                <li
                  key={todo.id}
                  className="w-fit list-none px-5 py-2 bg-gray-900 rounded m-3"
                >
                  <input
                    type="text"
                    name="content"
                    id={`input-${todo.id}`}
                    key={`input-${todo.id}`}
                    className="inline-block font-bold text-white mr-4 px-4 py-2 bg-gray-900 border-solid border-green-400 border-2 rounded w-fit"
                    value={
                      isEditable[todo.id]
                        ? editableTodos[todo.id]
                        : todo.content
                    }
                    readOnly={!isEditable[todo.id]}
                    onFocus={() => handleOnFocus(todo.id, todo.content)}
                    onChange={(e) => handleInputChange(e, todo.id)}
                    onBlur={(e) => {
                      setEditableTodos((prevState) => ({
                        ...prevState,
                        [todo.id]: e.target.value,
                      }));
                      setIsEditable((prevState) => ({
                        ...prevState,
                        [todo.id]: false,
                      }));
                    }}
                  />
                  <button
                    className="ml-4 py-1 px-2 bg-green-600 rounded text-center text-white"
                    onClick={() => handleUpdateTodo(todo.id)}
                    id={`update-${todo.id}`}
                    key={`update-${todo.id}`}
                  >
                    Update
                  </button>
                  <button
                    className="ml-4 py-1 px-3 bg-green-600 rounded font-bold text-center text-white"
                    onClick={() => handleDeleteTodo(todo.id)}
                    id={`delete-${todo.id}`}
                    key={`delete-${todo.id}`}
                  >
                    Mark as done
                  </button>
                </li>
              </>
            );
          })
        ) : (
          <div className="font-bold">No todos to show</div>
        )}
      </div>
      {todos.length > 0 && isLoading ? (
        <div className="font-bold text-red-500">
          Wait while the todos are loading
        </div>
      ) : null}
    </>
  );
};

export default Dashboard;

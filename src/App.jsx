import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import { MdDelete } from 'react-icons/md';
import { FaEdit } from 'react-icons/fa';
import ThreeJSBackground from './components/ThreeJSBackground';

function App() {
  const [todo, settodo] = useState('');
  const [todos, settodos] = useState(() => {
    const savedTodos = localStorage.getItem('todos');
    return savedTodos ? JSON.parse(savedTodos) : [];
  });
  const [isEditing, setIsEditing] = useState(null);
  const [showFinished, setshowFinished] = useState(true);

  useEffect(() => {
    const todoString = localStorage.getItem('todos');
    if (todoString) {
      settodos(JSON.parse(todoString));
    }
  }, []);

  const handleEdit = (index) => {
    settodo(todos[index].todo);
    setIsEditing(index);
  };

  const handleDelete = (index) => {
    const updatedTodos = todos.filter((_, i) => i !== index);
    settodos(updatedTodos);
    localStorage.setItem('todos', JSON.stringify(updatedTodos));
  };

  const handleAddOrUpdate = () => {
    if (isEditing !== null) {
      const updatedTodos = todos.map((item, index) =>
        index === isEditing ? { ...item, todo } : item
      );
      settodos(updatedTodos);
      setIsEditing(null);
    } else {
      const newTodos = [...todos, { todo, isCompleted: false }];
      settodos(newTodos);
      localStorage.setItem('todos', JSON.stringify(newTodos));
    }
    settodo('');
  };

  const toggleFinished = () => {
    setshowFinished(!showFinished);
  };

  const handleChange = (e) => {
    settodo(e.target.value);
  };

  const handleToggle = (index) => {
    const updatedTodos = [...todos];
    updatedTodos[index].isCompleted = !updatedTodos[index].isCompleted;
    settodos(updatedTodos);
    localStorage.setItem('todos', JSON.stringify(updatedTodos));
  };

  return (
    <>
      <Navbar />
      <ThreeJSBackground />
      <div
        className="container mx-auto my-5 p-5 rounded-xl bg-gray-900 shadow-2xl max-w-2xl border border-gray-700 relative z-10"
        style={{
          maxHeight: '80vh', // Constrain height to 80% of the viewport
          overflowY: 'auto', // Enable internal scrolling
        }}
      >
        <h1 className="font-bold text-4xl text-center text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400 mb-8">
          DoFlow - Keep Your Productivity Flowing
        </h1>
        <div className="addtodo my-5 flex flex-col gap-4">
          <h2 className="text-xl font-semibold text-cyan-400">
            {isEditing !== null ? 'Edit Todo' : 'Add a Todo'}
          </h2>
          <input
            type="text"
            onChange={handleChange}
            value={todo}
            className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-cyan-400"
            placeholder="Enter a task..."
          />
          <button
            onClick={handleAddOrUpdate}
            disabled={todo.length <= 3}
            className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white p-3 rounded-lg font-semibold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isEditing !== null ? 'Update' : 'Add'}
          </button>
        </div>
        <div className="flex items-center gap-2 mb-5">
          <input
            type="checkbox"
            onChange={toggleFinished}
            checked={showFinished}
            className="accent-cyan-400"
          />
          <span className="text-cyan-400">Show Finished</span>
        </div>
        <h2 className="text-xl font-semibold text-cyan-400 mb-4">Your Todos</h2>
        <div className="todos">
          {todos.length === 0 && (
            <h2 className="text-lg font-bold text-cyan-400 m-5">No Todos</h2>
          )}
          {todos.map((item, index) => {
            return (
              (showFinished || !item.isCompleted) && (
                <div
                  className="todo flex justify-between items-center my-3 p-4 bg-gray-800 rounded-lg border border-gray-700 hover:border-cyan-400 transition-all"
                  key={index}
                >
                  <div className="flex gap-4 items-center">
                    <input
                      type="checkbox"
                      checked={item.isCompleted}
                      onChange={() => handleToggle(index)}
                      className="accent-cyan-400"
                    />
                    <div
                      className={`text-lg ${
                        item.isCompleted ? 'line-through text-gray-400' : 'text-white'
                      }`}
                    >
                      {item.todo}
                    </div>
                  </div>
                  <div className="buttons flex gap-2">
                    <button
                      onClick={() => handleEdit(index)}
                      className="bg-cyan-500 hover:bg-cyan-600 text-white p-2 rounded-lg transition-all duration-300"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => handleDelete(index)}
                      className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-lg transition-all duration-300"
                    >
                      <MdDelete />
                    </button>
                  </div>
                </div>
              )
            );
          })}
        </div>
      </div>
    </>
  );
}

export default App;

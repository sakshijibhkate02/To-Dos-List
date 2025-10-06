import React from 'react';

const TodoItem = ({ todo,onDelete }) => {
  return (
    <>
    <div>
      <h4>{todo.title}</h4>
      <p>{todo.desc}</p>

      <button className="btn  btn-sm btn-danger" onClick={()=>{onDelete(todo)}}>DELETE</button>
    </div>
    <hr/>
    </>
  );
};

export default TodoItem; // ✅ default export

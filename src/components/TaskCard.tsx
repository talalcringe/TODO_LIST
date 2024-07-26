import { useState } from 'react';

import UpdateTask from './UpdateTask';

type Task = {
  _id: number;
  title: string;
  description: string;
  completed: boolean;
};

function TaskCard({ _id, title, description, completed }: Task) {
  const [updatingTask, setUpdatingTask] = useState(false);

  function toggleUpdatingTask() {
    setUpdatingTask((prev) => !prev);
  }

  return (
    <>
      {updatingTask ? (
        <UpdateTask
          toggleUpdatingTask={toggleUpdatingTask}
          _id={_id}
          title={title}
          description={description}
          completed={completed}
        />
      ) : (
        <>
          <div onClick={toggleUpdatingTask}>
            <h3>{title}</h3>
            <p>{description}</p>
            <p>Completed - {completed.toString()}</p>
            <br />
            <button>Delete</button>
            <label htmlFor='completed'>Completed</label>
            <input name='completed' type='checkbox' />
          </div>
        </>
      )}
    </>
  );
}

export default TaskCard;

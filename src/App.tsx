import Tasks from './components/Tasks';
import CreateTask from './components/CreateTask';

import { useState } from 'react';

function App() {
  const [creatingTask, setCreatingTask] = useState(false);

  function toggleCreatingTask() {
    setCreatingTask((prevState) => !prevState);
  }

  return (
    <>
      {creatingTask ? (
        <CreateTask toggleCreatingTask={toggleCreatingTask} />
      ) : (
        <div>
          <h3>TODOList</h3>
          <section>
            <input type='text'></input>
            <button>Filter</button>
          </section>
          <section>
            <br />
            <button onClick={toggleCreatingTask}>Create New Task</button>
            <br />
          </section>
          <Tasks />
        </div>
      )}
    </>
  );
}

export default App;

import Tasks from './components/Tasks';
import CreateTask from './components/CreateTask';

import { useState } from 'react';

// import { useQuery, useMutation, useQueryClient } from 'react-query';
// import { getTasks, addTask, updateTask, deleteTask } from './api/tasksAPI';

function App() {
  const [creatingTask, setCreatingTask] = useState(false);
  // const [newTask, setNewTask] = useState('');
  // const queryClient = useQueryClient();

  // const tasksQuery = useQuery({ queryKey: ['tasks'], queryFn: getTasks });

  // const addTaskMutation = useMutation(addTask, {
  //   onSuccess: () => {
  //     queryClient.invalidateQueries('tasks');
  //   },
  // });

  // const deleteTaskMutation = useMutation(deleteTask, {
  //   onSuccess: () => {
  //     queryClient.invalidateQueries('tasks');
  //   },
  // });

  // const updateTaskMutation = useMutation(updateTask, {
  //   onSuccess: () => {
  //     queryClient.invalidateQueries('tasks');
  //   },
  // });

  // function fetchAllTasks() {
  //   return tasksQuery;
  // }

  // function handleSubmit(e: any) {
  //   e.preventDefault();
  //   addTaskMutation.mutate(() => ({ title: newTask, completed: false }));
  //   setNewTask('');
  // }

  function toggleCreatingTask() {
    setCreatingTask((prevState) => !prevState);
  }

  // function updateNewTask(value: string) {
  //   setNewTask(value);
  // }
  return (
    <>
      {creatingTask ? (
        <CreateTask toggleCreatingTask={toggleCreatingTask} />
      ) : (
        // handleSubmit={handleSubmit}
        // toggleCreatingTask={toggleCreatingTask}
        // newTask={newTask}
        // updateNewTask={updateNewTask}
        // />
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

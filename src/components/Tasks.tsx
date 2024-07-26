import { useQuery, useMutation, useQueryClient } from 'react-query';
import { getTasks, addTask, updateTask, deleteTask } from '../api/tasksAPI';

type Task = {
  id?: number;
  title: string;
  description: string;
  completed: boolean;
};

// type TasksProps = {
//   fetchAllTasks: () => Task;
//   tasks: Task[];
// };

function Tasks() {
  const tasksQuery = useQuery<Task[], Error>({
    queryKey: ['tasks'],
    queryFn: getTasks,
  });

  return tasksQuery.isLoading ? (
    <div>Loading...</div>
  ) : tasksQuery.isError ? (
    <div>Error - {tasksQuery.error.message}</div>
  ) : tasksQuery.data ? (
    tasksQuery.data.map((data) => {
      return (
        <div key={data.id}>
          <h3>{data.title}</h3>
          <p>{data.description}</p>
          <p>Completed - {data.completed.toString()}</p>
        </div>
      );
    })
  ) : null;
  // <div>
  //   {/* {data?.map((task) => (
  //     <div key={task.id}>
  //       <h3>{task.title}</h3>
  //       <p>{task.description}</p>
  //     </div>
  //   ))} */}
  // </div>
}

export default Tasks;

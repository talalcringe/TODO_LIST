import { useQuery } from 'react-query';
import { getTasks } from '../api/tasksAPI';

import TaskCard from './TaskCard';

type Task = {
  _id: number;
  title: string;
  description: string;
  completed: boolean;
};

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
      return <TaskCard key={data._id} {...data} />;
    })
  ) : null;
}

export default Tasks;

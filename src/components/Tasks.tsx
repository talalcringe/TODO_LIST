import { useQuery } from 'react-query';
import { getTasks } from '../api/tasksAPI';

import TaskCard from './TaskCard';

import CircularProgress from '@mui/material/CircularProgress';

type Task = {
  _id: number;
  title: string;
  description: string;
  completed: boolean;
  recording?: string;
};

function Tasks() {
  const tasksQuery = useQuery<Task[], Error>({
    queryKey: ['tasks'],
    queryFn: getTasks,
  });

  return tasksQuery.isLoading ? (
    <CircularProgress variant='indeterminate' />
  ) : tasksQuery.isError ? (
    <div>Error - {tasksQuery.error.message}</div>
  ) : tasksQuery.data ? (
    tasksQuery.data.map((data) => {
      return <TaskCard key={data._id} {...data} />;
    })
  ) : null;
}

export default Tasks;

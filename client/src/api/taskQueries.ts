import { useMutation, useQueryClient, useQuery } from 'react-query';
import { addTask, deleteTask, updateTask, getTasks } from './tasksAPI';

export const useAddTask = () => {
  const queryClient = useQueryClient();
  return useMutation(addTask, {
    onSuccess: () => {
      queryClient.invalidateQueries('tasks');
    },
  });
};

export const useDeleteTask = () => {
  const queryClient = useQueryClient();
  return useMutation(deleteTask, {
    onSuccess: () => {
      queryClient.invalidateQueries('tasks');
    },
  });
};

export const useUpdateTask = () => {
  const queryClient = useQueryClient();
  return useMutation(updateTask, {
    onSuccess: () => {
      queryClient.invalidateQueries('tasks');
    },
  });
};

export const useGetTasks = () => {
  return useQuery('tasks', getTasks);
};

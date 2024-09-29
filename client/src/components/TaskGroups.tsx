import TaskView from './TaskView';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

type Task = {
  _id: number;
  title: string;
  description: string;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
  duedate?: string;
};

function TaskGroups({
  sortedTasks,
  updateShowAlert,
}: {
  sortedTasks: Task[];
  updateShowAlert: (
    value: [boolean, string, 'success' | 'error' | 'info' | 'warning']
  ) => void;
}) {
  let overdue: Task[] = [];
  let today: Task[] = [];
  let future: Task[] = [];
  function splitGroups(Tasks: Task[]) {
    Tasks.forEach((task) => {
      if (task.duedate) {
        // console.log(task.duedate.split('T')[0]);
        // console.log(new Date().toString().split('T')[0]);
        // const overdue = new Date(task.duedate) > new Date();
        // if (task.duedate.split('T')[0] == new Date().toString().split('T')[0]) {
        //   console.log('today');
        if (new Date(task.duedate) < new Date()) {
          overdue.push(task);
        }
        if (new Date(task.duedate) > new Date()) {
          future.push(task);
        } else {
          today.push(task);
        }
      }
    });
  }
  splitGroups(sortedTasks);
  return (
    <Box
      display={'flex'}
      gap={2}
      flexWrap={'wrap'}
      alignItems={'center'}
      justifyContent={'center'}
      overflow={'auto'}
    >
      {/* <Box>
        <Typography variant='h5'>Overdue</Typography>
        <Box
          display={'flex'}
          gap={2}
          flexWrap={'wrap'}
          alignItems={'center'}
          justifyContent={'center'}
          bgcolor={'#ffff'}
          // border={2}
          borderRadius={2}
          padding={2}
        >
          {overdue.map((data: Task) => (
            <TaskView
              key={data._id}
              {...data}
              updateShowAlert={updateShowAlert}
            />
          ))}
        </Box>
      </Box>
      <Box>
        <Typography variant='h5'>Today</Typography>
        <Box
          display={'flex'}
          gap={2}
          flexWrap={'wrap'}
          alignItems={'center'}
          justifyContent={'center'}
          bgcolor={'#ffff'}
          // border={2}
          borderRadius={2}
          padding={2}
        >
          {today.map((data: Task) => (
            <TaskView
              key={data._id}
              {...data}
              updateShowAlert={updateShowAlert}
            />
          ))}
        </Box>
      </Box>
      <Box>
        <Typography variant='h5'>Future</Typography>
        <Box
          display={'flex'}
          gap={2}
          flexWrap={'wrap'}
          alignItems={'center'}
          justifyContent={'center'}
          bgcolor={'#ffff'}
          // border={2}
          borderRadius={2}
          padding={2}
        >
          {future.map((data: Task) => (
            <TaskView
              key={data._id}
              {...data}
              updateShowAlert={updateShowAlert}
            />
          ))}
        </Box>
      </Box> */}

      {sortedTasks.length === 0 ? (
        <Typography variant='h5'>No tasks yet {`:)`}</Typography>
      ) : (
        sortedTasks.map((data: Task) => (
          <TaskView
            key={data._id}
            {...data}
            updateShowAlert={updateShowAlert}
          />
        ))
      )}
    </Box>
  );
}

export default TaskGroups;

import TextField from '@mui/material/TextField';

import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import ToggleButton from '@mui/material/ToggleButton';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';

function Filter({
  search,
  filter,
  sort,
  updateSearch,
  updateFilter,
  updateSort,
}: {
  search: string;
  filter: 'all' | 'active' | 'completed';
  sort: 'updated' | 'created' | 'duedate';
  updateSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
  updateFilter: (value: 'all' | 'active' | 'completed') => void;
  updateSort: (value: 'updated' | 'created' | 'duedate') => void;
}) {
  return (
    <>
      <Box
        mt={'72px'}
        width={'70%'}
        display={'flex'}
        flexDirection={'column'}
        alignItems={'center'}
        justifyContent={'space-between'}
        gap={2}
        padding={'8px 16px'}
      >
        <TextField
          size='small'
          label='Search'
          value={search}
          sx={{ bgcolor: 'white' }}
          onChange={updateSearch}
        />
        <Box
          display={'flex'}
          gap={1}
          alignItems={'center'}
          flexWrap={'wrap'}
          bgcolor={'#fff'}
          borderRadius={2}
          p={1}
        >
          <Box display={'flex'} gap={1}>
            <Typography
              sx={{ m: 1 }}
              variant='subtitle1'
              color={'#007bff'}
              fontWeight={'bold'}
              mr={1}
            >
              FILTER:
            </Typography>
            <ToggleButtonGroup
              color='primary'
              value={filter}
              exclusive
              onChange={(_e, value) => {
                updateFilter(value);
              }}
            >
              <ToggleButton value='all' size='small'>
                All
              </ToggleButton>
              <ToggleButton value='active' size='small'>
                Active
              </ToggleButton>
              <ToggleButton value='completed' size='small'>
                Completed
              </ToggleButton>
            </ToggleButtonGroup>
          </Box>
          <Box display={'flex'} gap={1}>
            <Typography
              sx={{ m: 1 }}
              variant='subtitle1'
              color={'#007bff'}
              fontWeight={'bold'}
              mr={1}
            >
              SORT BY:
            </Typography>
            <ToggleButtonGroup
              color='primary'
              value={sort}
              exclusive
              onChange={(_e, value) => {
                updateSort(value);
              }}
            >
              <ToggleButton value='updated' size='small'>
                Updated At
              </ToggleButton>
              <ToggleButton value='created' size='small'>
                Created At
              </ToggleButton>
              <ToggleButton value='duedate' size='small'>
                Due On
              </ToggleButton>
            </ToggleButtonGroup>
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default Filter;

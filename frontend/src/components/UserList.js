import React from 'react';
import User from './User';
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

const UserList = (props) => {
  return (
    <Stack spacing={.5}>
      <Typography>Users:</Typography>
      {
        props.users.map((user) => (
          <User 
            key={user}
            user={user}
            handleRemoveUser={props.handleRemoveUser}
            stage={props.stage}
          />
        ))
      }
    </Stack>
  )
}

export default UserList;
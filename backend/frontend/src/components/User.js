import React from 'react';
import Chip from '@mui/material/Chip'

const User = (props) => {
  return (
    <div>
      <Chip color="secondary" onDelete={() => { props.handleRemoveUser(props.user)} } label={props.user} />
    </div>
  );
}

export default User;
import React from "react";
import {
  List,
  Datagrid,
  TextField,
  DateField,
  EmailField,
  EditButton,
  DeleteButton,
} from "react-admin";

function AccountList(props) {
  return (
    <List {...props}>
      <Datagrid>
        <TextField source="fullName" />
        <TextField source="userName" />
        <TextField source="password" />
        <TextField source="reviewLocation" />
        <TextField source="ipLocation" />
        <EmailField source="email" />
        <DateField source="createDate" />
        <EditButton basePath="/account/update" label="" />
        <DeleteButton basePath="/account/delete" label="" />
      </Datagrid>
    </List>
  );
}

export default AccountList;

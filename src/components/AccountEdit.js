import React from "react";
import { Edit, TextInput, SimpleForm, NumberInput } from "react-admin";

function AccountEdit(props) {
  return (
    <Edit redirect="/account" {...props}>
      <SimpleForm>
        <TextInput disabled source="id" />
        <TextInput source="fullName" />
        <TextInput source="userName" />
        <TextInput source="password" />
        <TextInput source="ipLocation" label="IP Location" />
        <TextInput source="reviewLocation" />
        <TextInput source="email" />
        <TextInput source="passwordEmail" />
        <NumberInput source="numReviews" label="Number of review" />
        <TextInput source="profileUrl" label="Profile URL" />
        <NumberInput source="numFriends" label="Number of friend" />
        <NumberInput source="numPictures" label="Number of picture" />
      </SimpleForm>
    </Edit>
  );
}

export default AccountEdit;

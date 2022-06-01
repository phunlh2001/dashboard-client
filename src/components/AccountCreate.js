import React from "react";
import { Create, SimpleForm, TextInput, NumberInput } from "react-admin";

const AccountCreate = (props) => {
  return (
    <Create redirect="/account" {...props}>
      <SimpleForm>
        <TextInput source="fullName" required />
        <TextInput source="userName" required />
        <TextInput source="password" required />
        <TextInput source="ipLocation" label="IP Location" required />
        <TextInput source="reviewLocation" required />
        <TextInput source="email" />
        <TextInput source="passwordEmail" />
        <NumberInput source="numReviews" label="Number of Review" />
        <TextInput source="profileUrl" label="Profile URL" />
        <NumberInput source="numFriends" label="Number of friend" />
        <NumberInput source="numPictures" label="Number of picture" />
      </SimpleForm>
    </Create>
  );
};

export default AccountCreate;

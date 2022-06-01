import "./App.css";
import React from "react";
import { Admin, Resource } from "react-admin";
import dataProvider from "./provider/dataProvider";
import AccountList from "./components/AccountList";
import AccountCreate from "./components/AccountCreate";
import AccountEdit from "./components/AccountEdit";
import authProvider from "./provider/authProvider";

function App() {
  return (
    <Admin dataProvider={dataProvider} authProvider={authProvider}>
      <Resource
        name="account"
        list={AccountList}
        create={AccountCreate}
        edit={AccountEdit}
      />
    </Admin>
  );
}

export default App;

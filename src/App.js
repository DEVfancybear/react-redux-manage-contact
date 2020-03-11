import React from "react";
import ContactForm from "./components/ContactForm";
import ContactList from "./components/ContactList";
import EditContact from "./components/EditContact";
import { connect } from "react-redux";

const App = ({ editStatus }) => {
  return (
    <div className="container">
      <h1 className="alert alert-info">React-Redux Manage Contacts</h1>
      <div className="row">
        <div className="col">
          {editStatus ? <EditContact /> : <ContactForm />}
        </div>
        <div className="col">
          <ContactList />
        </div>
      </div>
    </div>
  );
};

const mapStateToprops = state => {
  return {
    editStatus: state.contactsReducer.editStatus
  };
};
export default connect(mapStateToprops, null)(App);

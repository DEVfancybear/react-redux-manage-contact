import React, { useEffect } from "react";
import ContactCard from "./ContactCard";
import { connect } from "react-redux";
import { fetchContacts } from "../actions/index";
const ContactList = props => {
  useEffect(() => {
    props.getAllContacts();
    //eslint-disable-next-line
  }, []);

  let list = null;
  let { contacts } = props;
  console.log(contacts);
  if (contacts instanceof Array && contacts.length > 0) {
    list = contacts.map(c => <ContactCard contact={c} key={c.id} />);
  }
  return <div>{list}</div>;
};
const mapStateToProps = state => {
  return {
    contacts: state.contactsReducer.contacts
  };
};
const mapDispatchToProps = (dispatch, props) => {
  return {
    getAllContacts: () => {
      dispatch(fetchContacts());
    }
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ContactList);

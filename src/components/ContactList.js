import React, { Component } from "react";
import ContactCard from "./ContactCard";
import { connect } from "react-redux";
import { fetchContacts } from "../actions/index";
class ContactList extends Component {
  componentDidMount() {
    this.props.getAllContacts();
  }

  render() {
    let list = null;
    let { contacts } = this.props;
    console.log(contacts);
    if (contacts instanceof Array && contacts.length > 0) {
      list = contacts.map(c => <ContactCard contact={c} key={c.id} />);
    }
    return <div>{list}</div>;
  }
}
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

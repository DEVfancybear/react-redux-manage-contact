import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { editContact, editStatus, getEditData } from "../actions/index";
const EditContact = ({ contact, editContact, editStatus }) => {
  const [form, setForm] = useState({
    id: "",
    name: "",
    email: "",
    phone: "",
    picture: ""
  });
  const [formErrors, setFormErrors] = useState({
    name: "Name is required",
    email: "Email is required",
    phone: "Phone is required"
  });
  const [errorMessages, setErrorMessages] = useState("");
  const { id, name, email, phone, picture } = form;

  useEffect(() => {
    if (contact.id) {
      setForm(contact);
    }
  }, [contact]);
  const tfHandler = e => {
    let { name, value } = e.target;

    switch (name) {
      case "name":
        if (!value || value.length === 0) {
          formErrors.name = "Name is required";
        } else if (value.length < 3) {
          formErrors.name = "Name must be at least 3 letters";
        } else {
          formErrors.name = "";
        }
        break;
      case "email":
        if (!value || value.length === 0) {
          formErrors.email = "Email is required";
        } else if (!value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)) {
          formErrors.email = "Not a valid email id";
        } else {
          formErrors.email = "";
        }
        break;
      case "phone":
        if (!value || value.length === 0) {
          formErrors.phone = "Email is required";
        } else if (!value.match(/^\d{10,12}$/)) {
          formErrors.phone = "Not a valid phone";
        } else {
          formErrors.phone = "";
        }
        break;
      default:
        break;
    }
    setForm({ ...form, [name]: value });
    setFormErrors(formErrors);
  };

  const saveDataEdit = e => {
    e.preventDefault();

    if (contact.id) {
      let info = {};
      info.id = id;
      info.name = name;
      info.email = email;
      info.picture = picture;
      info.phone = phone;
      editContact(id, info);
      editStatus();
    }
  };
  const submitHandler = evt => {
    evt.preventDefault();

    let errorMessages = Object.values(formErrors).map((err, index) =>
      err.length === 0 ? null : <li key={index}>{err}</li>
    );

    setErrorMessages(errorMessages);
  };

  return (
    <div>
      <h3>Edit Contact</h3>
      <form className="form" onSubmit={submitHandler}>
        <div className="form-group row">
          <label htmlFor="" className="control-label col-md-4">
            Name
          </label>
          <div className="col-md-8">
            <input
              defaultValue={name}
              onChange={tfHandler}
              type="text"
              className="form-control"
              name="name"
            />
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="" className="control-label col-md-4">
            Email address
          </label>
          <div className="col-md-8">
            <input
              defaultValue={email}
              onChange={tfHandler}
              type="text"
              className="form-control"
              name="email"
            />
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="" className="control-label col-md-4">
            Phone number
          </label>
          <div className="col-md-8">
            <input
              defaultValue={phone}
              onChange={tfHandler}
              type="text"
              className="form-control"
              name="phone"
            />
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="" className="control-label col-md-4">
            URL to picture/avatar
          </label>
          <div className="col-md-8">
            <input
              defaultValue={picture}
              onChange={tfHandler}
              type="text"
              className="form-control"
              name="picture"
            />
          </div>
        </div>
        <button
          type="submit"
          onClick={e => saveDataEdit(e)}
          className="btn btn-primary"
        >
          Change edit to list
        </button>
      </form>

      {/* <ul>{this.state.errorMessages}</ul> */}
    </div>
  );
};
const mapStateToProps = state => {
  return {
    contact: state.contactsReducer.contact
  };
};
const mapDispatchToProps = (dispatch, props) => {
  return {
    editContact: (id, contact) => {
      dispatch(editContact(id, contact));
    },
    editStatus: () => {
      dispatch(editStatus());
    },
    getPostDetailFetch: contactId => {
      dispatch(getEditData(contactId));
    }
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(EditContact);

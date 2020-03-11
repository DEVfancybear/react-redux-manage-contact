import React, { useState } from "react";
import { connect } from "react-redux";
import { addContact } from "../actions/index";
const ContactForm = props => {
  const [form, setForm] = useState({
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
  const { name, email, phone, picture } = form;

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
    setForm({ ...form, [e.target.name]: e.target.value });
    setFormErrors(formErrors);
  };
  const validateForm = formErrors => {
    let valid = true;
    Object.values(formErrors).forEach(
      val => (valid = valid && val.length === 0)
    );
    return valid;
  };

  const submitHandler = evt => {
    evt.preventDefault();

    let errorMessages = Object.values(formErrors).map((err, index) =>
      err.length === 0 ? null : <li key={index}>{err}</li>
    );

    setErrorMessages(errorMessages);

    if (validateForm(formErrors)) {
      let contact = { name, email, phone, picture };

      props.addContact(contact);

      setForm({
        name: "",
        email: "",
        phone: "",
        picture: ""
      });
      setFormErrors({
        name: "Name is required",
        email: "Email is required",
        phone: "Phone is required"
      });
      setErrorMessages("");
    }
  };

  return (
    <div>
      <h3>Add a new contact</h3>
      <form className="form" onSubmit={submitHandler}>
        <div className="form-group row">
          <label htmlFor="" className="control-label col-md-4">
            Name
          </label>
          <div className="col-md-8">
            <input
              value={name}
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
              value={email}
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
              value={phone}
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
              value={picture}
              onChange={tfHandler}
              type="text"
              className="form-control"
              name="picture"
            />
          </div>
        </div>
        <button className="btn btn-primary">Add to list</button>
      </form>

      <ul>{errorMessages}</ul>
    </div>
  );
};
const mapDispatchToProps = (dispatch, props) => {
  return {
    addContact: contact => {
      dispatch(addContact(contact));
    }
  };
};
export default connect(null, mapDispatchToProps)(ContactForm);

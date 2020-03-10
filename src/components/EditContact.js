import React, { Component } from "react";
import { connect } from "react-redux";
import { editContact, editStatus, getEditData } from "../actions/index";
class EditContact extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.contact.id,
      name: this.props.contact.name,
      email: this.props.contact.email,
      phone: this.props.contact.phone,
      picture: this.props.contact.picture,
      formErrors: {
        name: "Name is required",
        email: "Email is required",
        phone: "Phone is required"
      },
      errorMessages: ""
    };
  }
  componentDidMount = () => {
    this.props.getPostDetailFetch(this.state.id);
  };

  tfHandler = ({ target }) => {
    let { name, value } = target;
    let { formErrors } = this.state;

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
    this.setState({ [name]: value, formErrors });
  };
  validateForm = formErrors => {
    let valid = true;
    Object.values(formErrors).forEach(
      val => (valid = valid && val.length === 0)
    );
    return valid;
  };
  saveDataEdit = e => {
    e.preventDefault();

    let info = {};
    info.id = this.state.id;
    info.name = this.state.name;
    info.email = this.state.email;
    info.picture = this.state.picture;
    info.phone = this.state.phone;
    this.props.editContact(this.state.id, info);
    this.props.editStatus();
  };
  submitHandler = evt => {
    evt.preventDefault();

    let { formErrors } = this.state;
    let errorMessages = Object.values(formErrors).map((err, index) =>
      err.length === 0 ? null : <li key={index}>{err}</li>
    );
    this.setState({ errorMessages });
  };
  render() {
    console.log(this.props.contact);
    return (
      <div>
        <h3>Edit Contact</h3>
        <form className="form" onSubmit={this.submitHandler}>
          <div className="form-group row">
            <label htmlFor="" className="control-label col-md-4">
              Name
            </label>
            <div className="col-md-8">
              <input
                defaultValue={this.state.name}
                onChange={this.tfHandler}
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
                defaultValue={this.state.email}
                onChange={this.tfHandler}
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
                defaultValue={this.state.phone}
                onChange={this.tfHandler}
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
                defaultValue={this.state.picture}
                onChange={this.tfHandler}
                type="text"
                className="form-control"
                name="picture"
              />
            </div>
          </div>
          <button
            type="submit"
            onClick={e => this.saveDataEdit(e)}
            className="btn btn-primary"
          >
            Change edit to list
          </button>
        </form>

        {/* <ul>{this.state.errorMessages}</ul> */}
      </div>
    );
  }
}
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

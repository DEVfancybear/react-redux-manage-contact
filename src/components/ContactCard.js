import React, { Component } from "react";
import { connect } from "react-redux";
import { deleteContact, editStatus, getEditData } from "../actions/index";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";
class ContactCard extends Component {
  deleteContact = id => {
    this.props.deleteContact(id);
  };
  editStatus = contactId => {
    this.props.editStatus();
    this.props.getEditData(contactId);
  };
  render() {
    const { contact } = this.props;
    return (
      <div className="card">
        <div className="row">
          <div className="col-md-4">
            <img
              src={contact.picture}
              alt={contact.name}
              style={{ width: "100px", height: "100px", margin: "10px" }}
              className="card-img"
            />
          </div>
          <div className="col-md-8">
            <div className="card-body">
              <h5 className="card-title">
                {contact.name}

                <button
                  onClick={() => {
                    this.deleteContact(contact.id);
                  }}
                  className="btn btn-link float-right"
                >
                  <FontAwesomeIcon icon={faTrash} />
                </button>
                <button
                  onClick={() => {
                    this.editStatus(contact.id);
                  }}
                  className="btn btn-link float-right"
                >
                  <FontAwesomeIcon icon={faEdit} />
                </button>
              </h5>
              <div className="card-text">{contact.email}</div>
              <div className="card-text">{contact.phone}</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch, props) => {
  return {
    deleteContact: id => {
      dispatch(deleteContact(id));
    },
    editStatus: () => {
      dispatch(editStatus());
    },
    getEditData: contactId => {
      dispatch(getEditData(contactId));
    }
  };
};
export default connect(null, mapDispatchToProps)(ContactCard);

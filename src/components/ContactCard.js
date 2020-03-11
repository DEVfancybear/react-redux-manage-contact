import React from "react";
import { connect } from "react-redux";
import { deleteContact, editStatus, getEditData } from "../actions/index";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";
const ContactCard = props => {
  const deleteContact = id => {
    props.deleteContact(id);
  };
  const editStatus = contactId => {
    props.editStatus();
    props.getEditData(contactId);
  };
  const { contact } = props;

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
                  deleteContact(contact.id);
                }}
                className="btn btn-link float-right"
              >
                <FontAwesomeIcon icon={faTrash} />
              </button>
              <button
                onClick={() => {
                  editStatus(contact.id);
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
};

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

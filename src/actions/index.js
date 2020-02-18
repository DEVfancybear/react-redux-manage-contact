import * as types from "../constants/ActionTypes";

const url = "http://localhost:4000/contacts/";
// lấy data trên server về
export const fetchContacts = () => {
  return async dispatch => {
    let resp = await fetch(url);
    let contacts = await resp.json();
    let action = { type: types.FETCH_CONTACTS, data: contacts };
    dispatch(action);
  };
};
// thêm dữ liệu
export const addContact = contact => async dispatch => {
  let resp = await fetch(url, {
    method: "POST",
    body: JSON.stringify(contact),
    headers: {
      "Content-Type": "application/json"
    }
  });
  let newContact = await resp.json();
  dispatch({ type: types.ADD_CONTACT, data: newContact });
};
// xóa dữ liệu
export const deleteContact = id => async dispatch => {
  await fetch(url + id, { method: "DELETE" });

  dispatch({ type: types.DELETE_CONTACT, data: id });
};
// thay đổi trạng thái form thành sửa/đóng
export const editStatus = () => dispatch => {
  dispatch({
    type: types.EDIT_STATUS
  });
};
// get data theo id khi click vào sửa thì sẽ hiện dữ liệu cũ của data đó
export const getEditData = contactId => async dispatch => {
  await fetch(url + contactId, { method: "GET" });
  dispatch({
    type: types.GET_EDIT_DATA,
    data: contactId
  });
};
// update data lên server
export const editContact = (id, contact) => async dispatch => {
  let resp = await fetch(url + id, {
    method: "PUT",
    body: JSON.stringify(contact),
    headers: {
      "Content-Type": "application/json; charset=UTF-8"
    }
  });
  let newContact = await resp.json();
  dispatch({ type: types.EDIT_CONTACT, data: newContact });
};

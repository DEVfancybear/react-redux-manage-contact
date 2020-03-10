import * as types from "../constants/ActionTypes";
const initialState = {
  contacts: [],
  editStatus: false,
  contact: {}
};
export default (state = initialState, action) => {
  switch (action.type) {
    case types.ADD_CONTACT: {
      let contacts = [...state.contacts];
      // let newId = 1;

      // if (contacts.length > 0) {
      //     newId = Math.max(...contacts.map(c => c.id)) + 1
      // }
      // action.data.id = newId;
      contacts.push(action.data);
      return { ...state, contacts };
    }

    case types.DELETE_CONTACT: {
      let contacts = [...state.contacts];
      let newData = contacts.filter(item => item.id !== action.data);

      return { ...state, newData };
    }

    case types.FETCH_CONTACTS: {
      return { ...state, contacts: action.data };
    }
    case types.EDIT_STATUS: {
      return { ...state, editStatus: !state.editStatus };
    }
    case types.GET_EDIT_DATA: {
      return {
        ...state,
        contact: action.data
      };
    }
    case types.EDIT_CONTACT: {
      // update data và đẩy lên server
      return {
        ...state,
        ...action.data
      };
    }

    default:
      return state;
  }
};

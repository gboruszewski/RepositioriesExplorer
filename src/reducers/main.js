const SET_USERS = "SET_USERS";

export function setUsers(users) {
  return {
    type: SET_USERS,
    payload: {
      users
    },
  }
}

const initialState = {
  users: [],
}

export function mainReducer(state = initialState, action) {
  switch (action.type) {
    case SET_USERS:
      return {
        ...state,
        users: action.payload.users,
      }
    default:
      return state;
  }
}

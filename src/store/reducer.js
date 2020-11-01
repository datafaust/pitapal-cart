import { combineReducers } from 'redux';

const INITIAL_STATE = {
  carts: '',
  id: '',
  menu_name: ''
};

const ourReducer = (state = INITIAL_STATE, action) => {
  const newState = { ...state };

  switch (action.type) {

    case "CARTS":
      return {
        ...state,
        carts: action.value
      }
      break;

    case "STORE_MENU":
      return {
        ...state,
        id: action.value,
        menu_name: action.value1
      }
      break;

  }
  return newState;
};


export default combineReducers({
  reducer: ourReducer,
});

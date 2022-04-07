import { createStore } from "redux";
import rootReducer from './reducers';

const store = createStore(rootReducer); 

store.subscribe(() => {
  // store.getState().userReducer
  localStorage.setItem('store', JSON.stringify(store.getState().userReducer))
})

export default store;
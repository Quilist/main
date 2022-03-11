import { ADD_USER, REMOVE_USER, CHANGE_USER } from "../constants/actionTypes"

export const addUser = (user) => {
  return {
    type: ADD_USER,
    payload: user
  }
}
export const removeUser = (id) => {
  return {
    type: REMOVE_USER,
    payload: id
  }
}
export const changeUser = (changes) => {
  const arr = Object.entries(changes)
  return {
    type: CHANGE_USER,
    payload: arr
  }
}
import { ADD_SEARCH } from "../constants/actionTypes"

export function addSearch(search) {
  return {
    type: ADD_SEARCH,
    payload: search
  }
}
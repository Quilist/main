import {
  RETRIEVE_MONEYS,
  UPDATE_MONEY,
  DELETE_MONEY
} from "../constants/actionMoneyTypes";

export const retrieveMoneys = () => async (dispatch) => {
  try {
    const res = await TutorialDataService.getAll();

    dispatch({
      type: RETRIEVE_TUTORIALS,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
  }
};

export const updateMoney = (id, data) => async (dispatch) => {
  try {
    const res = await TutorialDataService.update(id, data);

    dispatch({
      type: UPDATE_TUTORIAL,
      payload: data,
    });

    return Promise.resolve(res.data);
  } catch (err) {
    return Promise.reject(err);
  }
};

export const deleteMoney = (id) => async (dispatch) => {
  try {
    await TutorialDataService.delete(id);

    dispatch({
      type: DELETE_TUTORIAL,
      payload: { id },
    });
  } catch (err) {
    console.log(err);
  }
};


export const findMoneyById = (title) => async (dispatch) => {
  try {
    const res = await TutorialDataService.findByTitle(title);

    dispatch({
      type: RETRIEVE_TUTORIALS,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
  }
};
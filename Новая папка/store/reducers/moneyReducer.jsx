import {
  RETRIEVE_MONEYS,
  UPDATE_MONEY,
  DELETE_MONEY
} from "../constants/actionMoneyTypes";

const initialState = [];

function moneyReducer(moneys = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case RETRIEVE_MONEYS:
      return payload;

    case UPDATE_MONEY:
      return moneys.map((money) => {
        if (money.id === payload.id) {
          return {
            ...money,
            ...payload,
          };
        } else {
          return money;
        }
      });

    case DELETE_MONEY:
      return moneys.filter(({ id }) => id !== payload.id);

    default:
      return moneys;
  }
}

export default moneyReducer;
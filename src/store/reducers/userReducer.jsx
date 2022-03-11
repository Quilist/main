import { ADD_USER, REMOVE_USER, CHANGE_USER } from "../constants/actionTypes";

function createUser(id, name, address, mobile, duty, mail, company, group, discount, notes) {
  return {
    [id]: {
      name,
      mobile,
      mail,
      company,
      group,
      address,
      duty,
      discount,
      notes
    }
  }
}

const localStorageState = JSON.parse(localStorage.getItem('store'))
let initialState;
if (localStorageState === null) {
  initialState = [
    createUser(1, 'Дівчинка', 'вул. Богатирська 30', [38635674521, '', ''], 400, ['', '', '']),
    createUser(2, 'Валерій Іванович', 'Русанівські Сади, 11 Лінія, буд. 42', [38635674521, '', ''], 0, ['', '', '']),
    createUser(3, 'Андрій, Осокорки', 'Садова 56, уч. 92', [38635674521, '', ''], 160, ['', '', '']),
    createUser(4, 'Олександр', 'Русанівські Сади', [38635674521, '', ''], 0, ['', '', '']),
    createUser(5, 'Максим', 'вул. Університетська 3', [38635674521, '', ''], 0, ['', '', '']),
    createUser(6, 'Ольга,Івана', 'Кочерги 9', [38635674521, '', ''], 2, ['', '', '']),
    createUser(7, 'Ice cream sandwich', '', [38635674521, '', ''], 0, ['', '', '']),
    createUser(8, 'Jelly Bean', '', [38635674521, '', ''], 0, ['', '', '']),
    createUser(9, 'KitKat', '', [38635674521, '', ''], 2600, ['', '', '']),
    createUser(10, 'Lollipop', '', [38635674521, '', ''], 0, ['', '', '']),
    createUser(11, 'Marshmallow', '', [38635674521, '', ''], 0, ['', '', '']),
    createUser(12, 'Nougat', '', [38635674521, '', ''], 1900, ['', '', '']),
    createUser(13, 'Oreo', '', [38635674521, '', ''], 0, ['', '', '']),
  ]
} else {
  initialState = localStorageState
}

const userReducer = (state = initialState, action) => {

  switch (action.type) {
    case ADD_USER:
      return (
        [
          ...state,
          action.payload
        ]
      )
    case REMOVE_USER:
      const newState = []
      state.forEach((elem) => {
        const data = Object.entries(elem)
        const id = data[0][0]
        // eslint-disable-next-line
        if (id != action.payload) {
          newState.push(elem)
        } else {
          return false
        }
      })
      state = newState
      return (
        [
          ...state
        ]
      )
    case CHANGE_USER:
      const params = action.payload[0]
      const [id, data] = params
      const mainState = []
      state.forEach((elem) => {
        const user = Object.entries(elem)
        const idOfUser = Number(user[0][0])
        if (idOfUser === Number(id)) {
          mainState.push({ [idOfUser]: data })
        } else {
          mainState.push(elem)
        }
      })
      state = mainState
      return (
        [
          ...state
        ]
      )
    default:
      return state;
  }

}

export default userReducer;
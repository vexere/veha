const initialState = {
  isAuthenticated: null,
  user: null,
  dataReloadNoti: null
}
export default function commonReducer(state = initialState, action) {
  switch (action.type) {
    case 'SIGN_IN_SUCCESS':
      return {
        ...state,
        user: action.user,
          isAuthenticated: true
      }
      case 'SIGN_OUT':
        return {
          ...state,
          user: null,
            isAuthenticated: false
        }
        case 'CHECK_SIGN_IN':
          return {
            ...state,
            user: action.user,
              isAuthenticated: true
          }
          case 'RELOAD_NOTIFICATION_SUCCESS':
            return {
              ...state,
              dataReloadNoti: action.dataReloadNoti,
            }
            default:
              return state
  }
}
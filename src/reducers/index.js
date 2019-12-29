const initialState = {
    phoneNumber: null,
    total: null,
    paymentMethod: null,
    cardValue: 0
}
export default function commonReducer(state = initialState, action) {
    switch (action.type) {
        case 'SAVE_PHONE_NUMBER':
            return {
                ...state,
                phoneNumber: action.phoneNumber
            }
        case 'SAVE_CARD_VALUE':
            return {
                ...state,
                cardValue: action.cardValue
            }
        case 'SAVE_METHOD':
            return {
                ...state,
                paymentMethod: action.paymentMethod
            }
        default:
            return state
    }
}

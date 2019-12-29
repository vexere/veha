export function savePhoneNumber(phoneNumber) {
    return {
        type: 'SAVE_PHONE_NUMBER',
        phoneNumber: phoneNumber
    }
}
export function saveCardValue(cardValue) {
    return {
        type: 'SAVE_CARD_VALUE',
        cardValue: cardValue
    }
}
export function saveMethod(method) {
    return {
        type: 'SAVE_METHOD',
        paymentMethod: method
    }
}
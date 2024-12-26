export enum OrderState {
    DELIVERED = 'DELIVERED',
    NOT_DELIVERED = 'NOT_DELIVERED',
    RETURNED = 'RETURNED'
}

export const OrderStateList = [
    OrderState.DELIVERED,
    OrderState.NOT_DELIVERED,
    OrderState.RETURNED
]
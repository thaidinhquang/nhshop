export interface IOrder {
    _id: string;
    userId: string | number;
    item: [],
    orderNumber: string,
    customerInfo: object,
    name: string,
    phone: number,
    email: string,
    city: string,
    totalPrice: number,
    status: string
}




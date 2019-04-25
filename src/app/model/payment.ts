export interface IPayment {
  senderIds: number[];
  id: number;
  receiverId: number;
  amount: number;
}

export function isValid(payment: IPayment) {
  return (
    payment.receiverId != undefined &&
    payment.senderIds != undefined &&
    payment.senderIds.length &&
    payment.amount > 0
  );
}

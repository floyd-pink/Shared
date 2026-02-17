// dataTypes/Payment.ts
export interface Payment {
  _id?: string;
  user: string; // User._id
  order: string; // Order._id
  paymentProvider: "stripe" | "esewa";
  transactionId?: string; // Stripe paymentIntent id or eSewa refId
  sessionId?: string;     // Stripe checkout session id
  amount: number;
  currency?: string; // default "NPR"
  status: "pending" | "completed" | "failed" | "refunded";
  paymentResponse?: Record<string, any>; // full stripe/esewa response with key=string and any=value
  paidAt?: string;
  createdAt?: string;
  updatedAt?: string;
}

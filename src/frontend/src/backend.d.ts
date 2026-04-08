import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface SubmitFeedbackRequest {
    orderId: OrderId;
    comment?: string;
    rating: bigint;
}
export interface PlaceOrderRequest {
    customerName: string;
    phone: string;
    items: Array<OrderItem>;
}
export type Timestamp = bigint;
export interface OrderItem {
    name: string;
    quantity: bigint;
    unitPrice: bigint;
    variant: ItemVariant;
}
export interface Feedback {
    id: bigint;
    orderId: OrderId;
    comment?: string;
    timestamp: Timestamp;
    rating: bigint;
}
export interface PlaceOrderResponse {
    orderId: OrderId;
    message: string;
    totalPrice: bigint;
}
export interface Order {
    id: OrderId;
    customerName: string;
    status: OrderStatus;
    timestamp: Timestamp;
    phone: string;
    items: Array<OrderItem>;
    totalPrice: bigint;
}
export interface SubmitFeedbackResponse {
    message: string;
    success: boolean;
}
export type OrderId = bigint;
export enum ItemVariant {
    full = "full",
    half = "half",
    regular = "regular"
}
export enum OrderStatus {
    pending = "pending",
    delivered = "delivered",
    confirmed = "confirmed",
    ready = "ready"
}
export interface backendInterface {
    getFeedbacks(): Promise<Array<Feedback>>;
    getOrders(): Promise<Array<Order>>;
    placeOrder(req: PlaceOrderRequest): Promise<PlaceOrderResponse>;
    submitFeedback(req: SubmitFeedbackRequest): Promise<SubmitFeedbackResponse>;
}

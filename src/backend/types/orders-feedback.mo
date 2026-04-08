import Common "common";

module {
  public type OrderId = Common.OrderId;
  public type Timestamp = Common.Timestamp;

  public type ItemVariant = {
    #half;
    #full;
    #regular;
  };

  public type OrderItem = {
    name : Text;
    variant : ItemVariant;
    quantity : Nat;
    unitPrice : Nat;
  };

  public type OrderStatus = {
    #pending;
    #confirmed;
    #ready;
    #delivered;
  };

  public type Order = {
    id : OrderId;
    customerName : Text;
    phone : Text;
    items : [OrderItem];
    totalPrice : Nat;
    status : OrderStatus;
    timestamp : Timestamp;
  };

  public type PlaceOrderRequest = {
    customerName : Text;
    phone : Text;
    items : [OrderItem];
  };

  public type PlaceOrderResponse = {
    orderId : OrderId;
    totalPrice : Nat;
    message : Text;
  };

  public type Feedback = {
    id : Nat;
    orderId : OrderId;
    rating : Nat;
    comment : ?Text;
    timestamp : Timestamp;
  };

  public type SubmitFeedbackRequest = {
    orderId : OrderId;
    rating : Nat;
    comment : ?Text;
  };

  public type SubmitFeedbackResponse = {
    success : Bool;
    message : Text;
  };

  public type Counters = {
    var nextOrderId : Nat;
    var nextFeedbackId : Nat;
  };
};

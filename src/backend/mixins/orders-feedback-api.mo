import List "mo:core/List";
import Types "../types/orders-feedback";
import OrdersFeedbackLib "../lib/orders-feedback";

mixin (
  orders : List.List<Types.Order>,
  feedbacks : List.List<Types.Feedback>,
  counters : Types.Counters,
) {
  public shared func placeOrder(req : Types.PlaceOrderRequest) : async Types.PlaceOrderResponse {
    let (response, newId) = OrdersFeedbackLib.placeOrder(orders, counters.nextOrderId, req);
    counters.nextOrderId := newId;
    response;
  };

  public shared func submitFeedback(req : Types.SubmitFeedbackRequest) : async Types.SubmitFeedbackResponse {
    let (response, newId) = OrdersFeedbackLib.submitFeedback(feedbacks, counters.nextFeedbackId, req);
    counters.nextFeedbackId := newId;
    response;
  };

  public query func getOrders() : async [Types.Order] {
    OrdersFeedbackLib.getOrders(orders);
  };

  public query func getFeedbacks() : async [Types.Feedback] {
    OrdersFeedbackLib.getFeedbacks(feedbacks);
  };
};

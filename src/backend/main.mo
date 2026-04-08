import List "mo:core/List";
import Types "types/orders-feedback";
import OrdersFeedbackMixin "mixins/orders-feedback-api";

actor {
  let orders = List.empty<Types.Order>();
  let feedbacks = List.empty<Types.Feedback>();
  let counters : Types.Counters = { var nextOrderId = 1; var nextFeedbackId = 1 };

  include OrdersFeedbackMixin(orders, feedbacks, counters);
};

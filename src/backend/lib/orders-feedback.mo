import List "mo:core/List";
import Time "mo:core/Time";
import Runtime "mo:core/Runtime";
import Int "mo:core/Int";
import Types "../types/orders-feedback";

module {
  // Hardcoded menu price validation: returns validated unit price or null if invalid
  func validateMenuPrice(name : Text, variant : Types.ItemVariant) : ?Nat {
    switch (name, variant) {
      case ("Paani Puri", #regular) { ?30 };
      case ("Papdi Chaat", #regular) { ?30 };
      case ("Dahi Puri", #regular) { ?50 };
      case ("Fresh Lime Soda", #regular) { ?25 };
      case ("Aloo Tikki Chaat", #half) { ?40 };
      case ("Aloo Tikki Chaat", #full) { ?60 };
      case ("Chole Chaat", #half) { ?50 };
      case ("Chole Chaat", #full) { ?80 };
      case _ { null };
    };
  };

  public func placeOrder(
    orders : List.List<Types.Order>,
    nextId : Nat,
    req : Types.PlaceOrderRequest,
  ) : (Types.PlaceOrderResponse, Nat) {
    // Validate items and calculate total
    var total : Nat = 0;
    for (item in req.items.values()) {
      switch (validateMenuPrice(item.name, item.variant)) {
        case null {
          Runtime.trap("Invalid menu item: " # item.name);
        };
        case (?expectedPrice) {
          if (item.unitPrice != expectedPrice) {
            Runtime.trap("Invalid price for " # item.name # ": expected " # expectedPrice.toText());
          };
          total += item.unitPrice * item.quantity;
        };
      };
    };

    let order : Types.Order = {
      id = nextId;
      customerName = req.customerName;
      phone = req.phone;
      items = req.items;
      totalPrice = total;
      status = #pending;
      timestamp = Time.now();
    };

    orders.add(order);

    let response : Types.PlaceOrderResponse = {
      orderId = nextId;
      totalPrice = total;
      message = "Order placed successfully! Your order #" # nextId.toText() # " has been received. Total: ₹" # total.toText();
    };
    (response, nextId + 1);
  };

  public func submitFeedback(
    feedbacks : List.List<Types.Feedback>,
    nextId : Nat,
    req : Types.SubmitFeedbackRequest,
  ) : (Types.SubmitFeedbackResponse, Nat) {
    // Validate rating 1-5
    if (req.rating < 1 or req.rating > 5) {
      let response : Types.SubmitFeedbackResponse = {
        success = false;
        message = "Invalid rating. Please provide a rating between 1 and 5.";
      };
      return (response, nextId);
    };

    // Validate comment length (max 500 chars)
    switch (req.comment) {
      case (?c) {
        if (c.size() > 500) {
          let response : Types.SubmitFeedbackResponse = {
            success = false;
            message = "Comment is too long. Maximum 500 characters allowed.";
          };
          return (response, nextId);
        };
      };
      case null {};
    };

    let feedback : Types.Feedback = {
      id = nextId;
      orderId = req.orderId;
      rating = req.rating;
      comment = req.comment;
      timestamp = Time.now();
    };

    feedbacks.add(feedback);

    let response : Types.SubmitFeedbackResponse = {
      success = true;
      message = "Thank you for your feedback! We appreciate you taking the time to share your experience.";
    };
    (response, nextId + 1);
  };

  public func getOrders(
    orders : List.List<Types.Order>,
  ) : [Types.Order] {
    // Sort descending by timestamp
    orders.sort(func(a, b) = Int.compare(b.timestamp, a.timestamp)).toArray();
  };

  public func getFeedbacks(
    feedbacks : List.List<Types.Feedback>,
  ) : [Types.Feedback] {
    feedbacks.toArray();
  };
};

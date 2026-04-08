import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import { createLazyFileRoute } from "@tanstack/react-router";
import { motion } from "motion/react";
import { useEffect, useState } from "react";

export const Route = createLazyFileRoute("/order-confirm")({
  component: OrderConfirmPage,
});

interface OrderItem {
  name: string;
  variant: string;
  qty: number;
  price: number;
}

interface LastOrder {
  orderId: string;
  customerName: string;
  items: OrderItem[];
  subtotal: number;
}

function OrderConfirmPage() {
  const [order, setOrder] = useState<LastOrder | null>(null);

  useEffect(() => {
    const raw = sessionStorage.getItem("chaat-last-order");
    if (raw) {
      try {
        setOrder(JSON.parse(raw) as LastOrder);
      } catch {
        // ignore
      }
    }
  }, []);

  const fireworks = ["🎉", "✨", "🌟", "🎊", "⭐"];

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full">
        {/* Animated checkmark area */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 14 }}
          className="text-center mb-6"
        >
          <div className="relative inline-flex items-center justify-center">
            <div className="w-24 h-24 rounded-full bg-primary/10 border-4 border-primary/20 flex items-center justify-center">
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3, type: "spring" }}
                className="text-5xl"
              >
                ✅
              </motion.span>
            </div>
            {fireworks.map((emoji, i) => (
              <motion.span
                key={emoji}
                initial={{ opacity: 0, scale: 0, x: 0, y: 0 }}
                animate={{
                  opacity: [0, 1, 1, 0],
                  scale: [0, 1.2, 1, 0],
                  x: [0, (i % 2 === 0 ? 1 : -1) * (30 + i * 10)],
                  y: [0, -(20 + i * 8)],
                }}
                transition={{ delay: 0.5 + i * 0.1, duration: 1 }}
                className="absolute text-xl pointer-events-none"
              >
                {emoji}
              </motion.span>
            ))}
          </div>
        </motion.div>

        {/* Main card */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="bg-card rounded-2xl border border-border shadow-warm-lg overflow-hidden"
        >
          {/* Top band */}
          <div className="bg-primary px-6 py-5 text-center">
            <h1 className="font-display font-extrabold text-primary-foreground text-2xl mb-1">
              Order Confirmed! 🎉
            </h1>
            {order && (
              <p className="text-primary-foreground/80 font-body text-sm">
                Hi {order.customerName}, your chaat is on the way!
              </p>
            )}
          </div>

          {/* Order ID */}
          {order && (
            <div className="px-6 py-4 bg-muted/30 border-b border-border text-center">
              <p className="text-muted-foreground text-xs font-body uppercase tracking-wider mb-1">
                Order Reference
              </p>
              <p className="font-display font-extrabold text-primary text-xl tracking-widest">
                {order.orderId}
              </p>
            </div>
          )}

          {/* Items summary */}
          {order && (
            <div className="px-6 py-4 border-b border-border">
              <p className="font-display font-bold text-foreground text-sm mb-3 flex items-center gap-1.5">
                <span>🧾</span> Items Ordered
              </p>
              <div className="flex flex-col gap-2">
                {order.items.map((item) => (
                  <div
                    key={`${item.name}-${item.variant}`}
                    className="flex justify-between text-sm"
                  >
                    <span className="font-body text-foreground">
                      {item.name}
                      {item.variant !== "Plate" &&
                        item.variant !== "Glass" &&
                        item.variant !== "Plate (6 pcs)" && (
                          <span className="text-muted-foreground ml-1">
                            ({item.variant})
                          </span>
                        )}{" "}
                      <span className="text-muted-foreground">×{item.qty}</span>
                    </span>
                    <span className="font-bold font-body text-foreground">
                      ₹{item.price * item.qty}
                    </span>
                  </div>
                ))}
              </div>
              <div className="border-t border-border mt-3 pt-3 flex justify-between">
                <span className="font-body text-muted-foreground text-sm">
                  Total Paid
                </span>
                <span className="font-extrabold text-primary font-body text-lg">
                  ₹{order.subtotal}
                </span>
              </div>
            </div>
          )}

          {/* ETA message */}
          <div className="px-6 py-4 bg-secondary/10 border-b border-border text-center">
            <p className="text-foreground font-body text-sm">
              🏪 Estimated preparation time:{" "}
              <span className="font-bold text-primary">10–15 minutes</span>
            </p>
          </div>

          {/* Actions */}
          <div className="px-6 py-5 flex flex-col gap-3">
            <Link to="/feedback" data-ocid="leave-feedback-btn">
              <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground shadow-warm font-bold font-body text-base">
                ⭐ Leave Feedback
              </Button>
            </Link>
            <Link to="/" data-ocid="order-more-btn">
              <Button
                variant="outline"
                className="w-full border-primary/30 text-primary hover:bg-primary/5 font-bold font-body"
              >
                🛒 Order More
              </Button>
            </Link>
          </div>
        </motion.div>

        <p className="text-center text-muted-foreground text-xs font-body mt-4">
          Thank you for choosing Chaat Paglu! 🌶️
        </p>
      </div>
    </div>
  );
}

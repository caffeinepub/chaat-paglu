import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCartContext } from "@/context/CartContext";
import { Link, useNavigate } from "@tanstack/react-router";
import { createLazyFileRoute } from "@tanstack/react-router";
import { Loader2, ShieldCheck } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";

export const Route = createLazyFileRoute("/checkout")({
  component: CheckoutPage,
});

function CheckoutPage() {
  const { items, subtotal, totalItems, clearCart } = useCartContext();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [nameError, setNameError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [loading, setLoading] = useState(false);

  function validateName() {
    if (!name.trim()) {
      setNameError("Please enter your name");
      return false;
    }
    if (name.trim().length < 2) {
      setNameError("Name must be at least 2 characters");
      return false;
    }
    setNameError("");
    return true;
  }

  function validatePhone() {
    const digits = phone.replace(/\D/g, "");
    if (!phone.trim()) {
      setPhoneError("Please enter your phone number");
      return false;
    }
    if (digits.length < 10) {
      setPhoneError("Enter a valid 10-digit phone number");
      return false;
    }
    setPhoneError("");
    return true;
  }

  async function handlePlaceOrder(e: React.FormEvent) {
    e.preventDefault();
    const validName = validateName();
    const validPhone = validatePhone();
    if (!validName || !validPhone) return;

    setLoading(true);
    // Simulate order placement — backend bindgen has empty interface
    await new Promise((r) => setTimeout(r, 1000));
    const orderId = `CP-${Date.now().toString(36).toUpperCase()}`;
    const orderData = {
      orderId,
      customerName: name.trim(),
      items: items.map((i) => ({
        name: i.menuItem.name,
        variant: i.variant.label,
        qty: i.quantity,
        price: i.variant.price,
      })),
      subtotal,
    };
    sessionStorage.setItem("chaat-last-order", JSON.stringify(orderData));
    clearCart();
    setLoading(false);
    void navigate({ to: "/order-confirm" });
  }

  return (
    <div className="min-h-screen bg-background py-10 px-4">
      <div className="max-w-xl mx-auto">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-3 mb-8"
        >
          <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
            <ShieldCheck className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h1 className="font-display font-extrabold text-foreground text-2xl leading-tight">
              Checkout
            </h1>
            <p className="text-muted-foreground text-sm font-body">
              Review & confirm your order
            </p>
          </div>
        </motion.div>

        {/* Order summary */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-card rounded-2xl border border-border shadow-warm px-5 py-5 mb-5"
        >
          <h2 className="font-display font-bold text-foreground text-base mb-4 flex items-center gap-2">
            <span className="text-xl">🧾</span> Order Summary
          </h2>
          <div className="flex flex-col gap-2.5 mb-4">
            {items.map((cartItem) => (
              <div
                key={`${cartItem.menuItem.id}-${cartItem.variant.label}`}
                className="flex items-center justify-between text-sm"
              >
                <div className="flex items-center gap-2 min-w-0">
                  <span className="text-base">{cartItem.menuItem.emoji}</span>
                  <span className="font-body text-foreground font-medium truncate">
                    {cartItem.menuItem.name}
                    {cartItem.menuItem.variants.length > 1 && (
                      <span className="text-muted-foreground ml-1">
                        ({cartItem.variant.label})
                      </span>
                    )}
                  </span>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <span className="text-muted-foreground font-body">
                    ×{cartItem.quantity}
                  </span>
                  <span className="font-bold font-body text-foreground w-14 text-right">
                    ₹{cartItem.variant.price * cartItem.quantity}
                  </span>
                </div>
              </div>
            ))}
          </div>
          <div className="border-t border-border pt-3 flex items-center justify-between">
            <span className="font-body text-muted-foreground text-sm">
              Total ({totalItems} items)
            </span>
            <span className="font-extrabold text-primary text-xl font-body">
              ₹{subtotal}
            </span>
          </div>
        </motion.div>

        {/* Customer form */}
        <motion.form
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          onSubmit={handlePlaceOrder}
          className="bg-card rounded-2xl border border-border shadow-warm px-5 py-5"
        >
          <h2 className="font-display font-bold text-foreground text-base mb-4 flex items-center gap-2">
            <span className="text-xl">👤</span> Your Details
          </h2>
          <div className="flex flex-col gap-4">
            <div>
              <Label
                htmlFor="customer-name"
                className="font-body font-semibold text-foreground text-sm mb-1.5 block"
              >
                Full Name <span className="text-destructive">*</span>
              </Label>
              <Input
                id="customer-name"
                type="text"
                placeholder="e.g. Rahul Sharma"
                value={name}
                onChange={(e) => setName(e.target.value)}
                onBlur={validateName}
                className={`font-body bg-input border-input focus:border-primary ${nameError ? "border-destructive" : ""}`}
                data-ocid="name-input"
              />
              {nameError && (
                <p className="text-destructive text-xs mt-1 font-body">
                  {nameError}
                </p>
              )}
            </div>

            <div>
              <Label
                htmlFor="phone"
                className="font-body font-semibold text-foreground text-sm mb-1.5 block"
              >
                Phone Number <span className="text-destructive">*</span>
              </Label>
              <div className="flex items-center gap-2">
                <span className="flex items-center justify-center px-3 py-2 bg-muted rounded-xl border border-border text-foreground font-body text-sm shrink-0">
                  🇮🇳 +91
                </span>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="98765 43210"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  onBlur={validatePhone}
                  className={`font-body bg-input border-input focus:border-primary ${phoneError ? "border-destructive" : ""}`}
                  data-ocid="phone-input"
                />
              </div>
              {phoneError && (
                <p className="text-destructive text-xs mt-1 font-body">
                  {phoneError}
                </p>
              )}
            </div>
          </div>

          <div className="flex gap-3 mt-6">
            <Link to="/cart" className="flex-1">
              <Button
                type="button"
                variant="outline"
                className="w-full border-primary/30 text-primary hover:bg-primary/5 font-bold font-body"
                disabled={loading}
              >
                ← Edit Cart
              </Button>
            </Link>
            <Button
              type="submit"
              disabled={loading || items.length === 0}
              className="flex-2 flex-1 bg-primary hover:bg-primary/90 text-primary-foreground shadow-warm font-bold font-body text-base"
              data-ocid="place-order-btn"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Placing Order…
                </span>
              ) : (
                "🎉 Place Order"
              )}
            </Button>
          </div>
        </motion.form>
      </div>
    </div>
  );
}

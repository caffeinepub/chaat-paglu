import { Button } from "@/components/ui/button";
import { useCartContext } from "@/context/CartContext";
import { Link } from "@tanstack/react-router";
import { createLazyFileRoute } from "@tanstack/react-router";
import {
  Minus,
  Plus,
  ShoppingCart,
  Trash2,
  UtensilsCrossed,
} from "lucide-react";
import { motion } from "motion/react";

export const Route = createLazyFileRoute("/cart")({
  component: CartPage,
});

function CartPage() {
  const { items, updateQuantity, removeItem, clearCart, subtotal, totalItems } =
    useCartContext();

  return (
    <div className="min-h-screen bg-background py-10 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header row */}
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-6"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
              <ShoppingCart className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h1 className="font-display font-extrabold text-foreground text-2xl leading-tight">
                Your Cart
              </h1>
              <p className="text-muted-foreground text-sm font-body">
                {totalItems} {totalItems === 1 ? "item" : "items"} selected
              </p>
            </div>
          </div>
          {items.length > 0 && (
            <button
              type="button"
              onClick={clearCart}
              className="flex items-center gap-1.5 text-sm text-destructive font-semibold font-body hover:bg-destructive/5 px-3 py-1.5 rounded-lg transition-smooth"
              data-ocid="clear-cart-btn"
            >
              <Trash2 className="w-4 h-4" />
              Clear all
            </button>
          )}
        </motion.div>

        {/* Empty state */}
        {items.length === 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-card rounded-2xl border border-border shadow-warm py-16 text-center"
            data-ocid="empty-cart"
          >
            <UtensilsCrossed className="w-14 h-14 text-muted-foreground/40 mx-auto mb-4" />
            <h2 className="font-display font-bold text-foreground text-xl mb-2">
              Your cart is empty
            </h2>
            <p className="text-muted-foreground font-body text-sm mb-6 max-w-xs mx-auto">
              Looks like you haven't added any delicious chaat yet!
            </p>
            <Link to="/" data-ocid="browse-menu-btn">
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-warm font-bold font-body">
                🥘 Browse Menu
              </Button>
            </Link>
          </motion.div>
        )}

        {/* Cart items */}
        {items.length > 0 && (
          <>
            <div className="flex flex-col gap-3 mb-6">
              {items.map((cartItem, index) => (
                <motion.div
                  key={`${cartItem.menuItem.id}-${cartItem.variant.label}`}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.06 }}
                  className="bg-card rounded-2xl border border-border shadow-warm px-4 py-4 flex items-center gap-4"
                  data-ocid={`cart-item-${cartItem.menuItem.id}`}
                >
                  {/* Emoji */}
                  <div className="w-12 h-12 rounded-xl bg-primary/8 flex items-center justify-center text-2xl shrink-0">
                    {cartItem.menuItem.emoji}
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <p className="font-display font-bold text-foreground text-sm leading-tight truncate">
                      {cartItem.menuItem.name}
                    </p>
                    {cartItem.menuItem.variants.length > 1 && (
                      <p className="text-xs text-muted-foreground font-body mt-0.5">
                        {cartItem.variant.label}
                      </p>
                    )}
                    <p className="text-primary font-extrabold text-sm font-body mt-0.5">
                      ₹{cartItem.variant.price} each
                    </p>
                  </div>

                  {/* Quantity controls */}
                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      type="button"
                      onClick={() =>
                        updateQuantity(
                          cartItem.menuItem.id,
                          cartItem.variant.label,
                          cartItem.quantity - 1,
                        )
                      }
                      className="w-7 h-7 rounded-lg bg-muted flex items-center justify-center text-foreground hover:bg-primary/10 hover:text-primary transition-smooth"
                      aria-label="Decrease quantity"
                      data-ocid={`qty-minus-${cartItem.menuItem.id}`}
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="w-6 text-center font-bold font-body text-foreground text-sm">
                      {cartItem.quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() =>
                        updateQuantity(
                          cartItem.menuItem.id,
                          cartItem.variant.label,
                          cartItem.quantity + 1,
                        )
                      }
                      className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center text-primary hover:bg-primary hover:text-primary-foreground transition-smooth"
                      aria-label="Increase quantity"
                      data-ocid={`qty-plus-${cartItem.menuItem.id}`}
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Line total */}
                  <div className="text-right shrink-0 w-16">
                    <p className="font-extrabold text-foreground font-body text-base">
                      ₹{cartItem.variant.price * cartItem.quantity}
                    </p>
                    <button
                      type="button"
                      onClick={() =>
                        removeItem(cartItem.menuItem.id, cartItem.variant.label)
                      }
                      className="text-muted-foreground hover:text-destructive transition-colors mt-0.5"
                      aria-label="Remove item"
                      data-ocid={`remove-item-${cartItem.menuItem.id}`}
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Summary card */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-card rounded-2xl border border-border shadow-warm-lg px-6 py-5"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="font-body text-muted-foreground text-sm">
                  Subtotal ({totalItems} items)
                </span>
                <span className="font-extrabold text-foreground font-body text-xl">
                  ₹{subtotal}
                </span>
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  to="/"
                  className="flex-1"
                  data-ocid="continue-shopping-btn"
                >
                  <Button
                    variant="outline"
                    className="w-full border-primary/30 text-primary hover:bg-primary/5 font-bold font-body"
                  >
                    ← Add More
                  </Button>
                </Link>
                <Link
                  to="/checkout"
                  className="flex-1"
                  data-ocid="checkout-btn"
                >
                  <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground shadow-warm font-bold font-body text-base">
                    Proceed to Checkout →
                  </Button>
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </div>
    </div>
  );
}

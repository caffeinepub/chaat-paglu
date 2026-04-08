import { Button } from "@/components/ui/button";
import { useCartContext } from "@/context/CartContext";
import { MENU_ITEMS } from "@/data/menu";
import type { MenuItem, MenuItemVariant } from "@/types";
import { Link } from "@tanstack/react-router";
import { createLazyFileRoute } from "@tanstack/react-router";
import { ShoppingCart } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";

export const Route = createLazyFileRoute("/")({
  component: MenuPage,
});

function MenuCard({ item, index }: { item: MenuItem; index: number }) {
  const { addItem } = useCartContext();
  const [added, setAdded] = useState<string | null>(null);

  function handleAdd(variant: MenuItemVariant) {
    addItem(item, variant);
    setAdded(variant.label);
    setTimeout(() => setAdded(null), 900);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      className="bg-card rounded-2xl border border-border shadow-warm overflow-hidden flex flex-col card-lift group"
      data-ocid={`menu-card-${item.id}`}
    >
      {/* Emoji banner */}
      <div className="h-28 flex items-center justify-center bg-primary/8 border-b border-border">
        <span
          className="text-6xl select-none"
          role="img"
          aria-label={item.name}
        >
          {item.emoji}
        </span>
      </div>

      {/* Info */}
      <div className="flex-1 px-4 pt-3 pb-4 flex flex-col gap-3">
        <div>
          <h3 className="font-display font-bold text-foreground text-base leading-tight mb-1">
            {item.name}
          </h3>
          <p className="text-muted-foreground text-xs font-body leading-relaxed line-clamp-2">
            {item.description}
          </p>
        </div>

        {/* Variant buttons */}
        <div className="flex flex-col gap-2 mt-auto">
          {item.variants.map((variant) => {
            const isAdded = added === variant.label;
            return (
              <button
                key={variant.label}
                type="button"
                onClick={() => handleAdd(variant)}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl border text-sm font-semibold font-body transition-smooth ${
                  isAdded
                    ? "bg-secondary text-secondary-foreground border-secondary shadow-warm"
                    : "bg-primary/5 border-primary/20 text-primary hover:bg-primary hover:text-primary-foreground hover:shadow-warm active:scale-[0.97]"
                }`}
                data-ocid={`add-to-cart-${item.id}-${variant.label.toLowerCase().replace(/\s/g, "-")}`}
              >
                <span className="flex items-center gap-1.5">
                  {isAdded ? (
                    <>✓ Added!</>
                  ) : (
                    <>
                      <ShoppingCart className="w-3.5 h-3.5" />
                      {item.variants.length > 1
                        ? `Add ${variant.label}`
                        : "Add to Cart"}
                    </>
                  )}
                </span>
                <span className="font-extrabold text-base">
                  ₹{variant.price}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}

function MenuPage() {
  const { totalItems, subtotal } = useCartContext();

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="relative overflow-hidden bg-primary py-14 px-4">
        {/* Decorative blobs */}
        <div className="absolute inset-0 pointer-events-none select-none overflow-hidden">
          <div className="absolute -top-12 -right-12 w-64 h-64 rounded-full bg-secondary/20 blur-3xl" />
          <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full bg-accent/15 blur-2xl" />
        </div>
        <div className="relative max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ scale: 0.7, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, type: "spring" }}
            className="text-6xl mb-3"
          >
            🍽️
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="font-display font-extrabold text-primary-foreground text-4xl md:text-5xl leading-tight mb-2"
          >
            Chaat Paglu
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-primary-foreground/80 font-body text-lg mb-6"
          >
            Crispy · Tangy · Always Fresh — Mumbai's Favourite Indian Street
            Food
          </motion.p>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
            className="flex flex-wrap justify-center gap-3"
          >
            <a
              href="#menu"
              className="inline-flex items-center gap-2 bg-primary-foreground text-primary px-6 py-2.5 rounded-full font-bold font-display text-sm shadow-warm hover:shadow-warm-lg transition-smooth hover:-translate-y-0.5"
            >
              🥘 View Menu
            </a>
            {totalItems > 0 && (
              <Link
                to="/cart"
                className="inline-flex items-center gap-2 bg-secondary text-secondary-foreground px-6 py-2.5 rounded-full font-bold font-display text-sm shadow-warm hover:shadow-warm-lg transition-smooth hover:-translate-y-0.5"
                data-ocid="hero-cart-link"
              >
                <ShoppingCart className="w-4 h-4" />
                Cart ({totalItems}) · ₹{subtotal}
              </Link>
            )}
          </motion.div>
        </div>
      </section>

      {/* Menu Grid */}
      <section id="menu" className="max-w-6xl mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, x: -16 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="flex items-center gap-3 mb-8"
        >
          <div className="w-1 h-8 rounded-full bg-primary" />
          <h2 className="font-display font-extrabold text-foreground text-2xl">
            Our Menu
          </h2>
          <span className="ml-1 text-muted-foreground font-body text-sm">
            — {MENU_ITEMS.length} items
          </span>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-4 md:gap-5">
          {MENU_ITEMS.map((item, i) => (
            <MenuCard key={item.id} item={item} index={i} />
          ))}
        </div>
      </section>

      {/* Floating cart bar when items in cart */}
      {totalItems > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50"
        >
          <Link to="/cart" data-ocid="floating-cart-btn">
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-warm-lg px-6 py-3 rounded-full font-bold font-display flex items-center gap-3 text-base transition-smooth hover:-translate-y-0.5">
              <ShoppingCart className="w-5 h-5" />
              <span>View Cart · {totalItems} items</span>
              <span className="bg-primary-foreground/20 rounded-full px-2 py-0.5 text-sm font-extrabold">
                ₹{subtotal}
              </span>
            </Button>
          </Link>
        </motion.div>
      )}
    </div>
  );
}

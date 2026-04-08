import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useCartContext } from "@/context/CartContext";
import { Link, useRouterState } from "@tanstack/react-router";
import { Flame, MapPin, ShoppingCart } from "lucide-react";
import type { ReactNode } from "react";

export function Layout({ children }: { children: ReactNode }) {
  const { totalItems } = useCartContext();
  const router = useRouterState();
  const isHome = router.location.pathname === "/";

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Top promo bar */}
      <div className="bg-primary text-primary-foreground text-center text-xs py-1.5 px-4 font-body font-semibold tracking-wide">
        🌶️ Order fresh, get served fast! Free delivery on orders above ₹150 🌶️
      </div>

      {/* Header */}
      <header className="sticky top-0 z-50 bg-card border-b border-border shadow-warm">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group shrink-0">
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center shadow-warm text-2xl select-none">
              🍽️
            </div>
            <div className="flex flex-col leading-tight">
              <span className="font-display font-extrabold text-lg text-primary tracking-tight leading-none">
                Chaat Paglu
              </span>
              <span className="text-[10px] font-body text-muted-foreground tracking-widest uppercase">
                Indian Street Food
              </span>
            </div>
          </Link>

          {/* Nav links */}
          <nav className="hidden md:flex items-center gap-1">
            <NavLink to="/" label="Menu" active={isHome} />
            <NavLink to="/cart" label="Cart" />
          </nav>

          {/* Cart button */}
          <Link to="/cart" data-ocid="nav-cart-btn">
            <Button
              variant="default"
              className="relative flex items-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground shadow-warm transition-smooth"
            >
              <ShoppingCart className="w-4 h-4" />
              <span className="font-semibold">Cart</span>
              {totalItems > 0 && (
                <Badge
                  className="absolute -top-2 -right-2 min-w-5 h-5 flex items-center justify-center rounded-full bg-secondary text-secondary-foreground text-[10px] px-1 border-2 border-card"
                  data-ocid="cart-badge"
                >
                  {totalItems}
                </Badge>
              )}
            </Button>
          </Link>
        </div>
      </header>

      {/* Page content */}
      <main className="flex-1">{children}</main>

      {/* Footer */}
      <footer className="bg-card border-t border-border mt-auto">
        <div className="max-w-6xl mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-2xl">🍽️</span>
              <span className="font-display font-extrabold text-primary text-lg">
                Chaat Paglu
              </span>
            </div>
            <p className="text-muted-foreground font-body leading-relaxed">
              Authentic Indian street food — crispy, tangy & always fresh!
            </p>
          </div>
          <div>
            <p className="font-display font-bold text-foreground mb-2 flex items-center gap-1">
              <Flame className="w-4 h-4 text-primary" /> Quick Links
            </p>
            <div className="flex flex-col gap-1 text-muted-foreground font-body">
              <Link to="/" className="hover:text-primary transition-colors">
                Menu
              </Link>
              <Link to="/cart" className="hover:text-primary transition-colors">
                Cart
              </Link>
              <Link
                to="/feedback"
                className="hover:text-primary transition-colors"
              >
                Feedback
              </Link>
              <Link to="/qr" className="hover:text-primary transition-colors">
                📱 QR Code
              </Link>
            </div>
          </div>
          <div>
            <p className="font-display font-bold text-foreground mb-2 flex items-center gap-1">
              <MapPin className="w-4 h-4 text-primary" /> Find Us
            </p>
            <p className="text-muted-foreground font-body leading-relaxed mb-3">
              Street Stall No. 7, Chowpatty Market
              <br />
              Mumbai, Maharashtra 400007
            </p>
            {/* QR Code */}
            <Link
              to="/qr"
              className="inline-block group"
              data-ocid="footer-qr-link"
              title="Scan to open menu"
            >
              <div className="w-20 h-20 bg-card rounded-lg border-2 border-primary/20 overflow-hidden shadow-warm group-hover:shadow-warm-lg transition-smooth p-1">
                <img
                  src="/assets/generated/qr-code-chaat-paglu.dim_300x300.png"
                  alt="QR code to open Chaat Paglu"
                  className="w-full h-full object-contain"
                />
              </div>
              <p className="text-[10px] text-muted-foreground text-center mt-1 font-body">
                Scan to order
              </p>
            </Link>
          </div>
        </div>
        <div className="border-t border-border">
          <div className="max-w-6xl mx-auto px-4 py-4 flex flex-col md:flex-row items-center justify-between gap-2 text-xs text-muted-foreground font-body">
            <span>
              © {new Date().getFullYear()} Chaat Paglu. All rights reserved.
            </span>
            <span>
              Built with love using{" "}
              <a
                href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                caffeine.ai
              </a>
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}

function NavLink({
  to,
  label,
  active,
}: { to: string; label: string; active?: boolean }) {
  return (
    <Link
      to={to}
      className={`px-3 py-1.5 rounded-lg text-sm font-semibold font-body transition-smooth ${
        active
          ? "bg-primary/10 text-primary"
          : "text-foreground hover:bg-muted hover:text-primary"
      }`}
    >
      {label}
    </Link>
  );
}

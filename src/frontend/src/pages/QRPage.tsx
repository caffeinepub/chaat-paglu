import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import { ArrowLeft, Download, Smartphone } from "lucide-react";
import { motion } from "motion/react";
import QRCode from "qrcode";
import { useEffect, useRef, useState } from "react";

// Generates a QR code dynamically using window.location.origin
export function QRPage() {
  const url =
    typeof window !== "undefined"
      ? window.location.origin
      : "https://chaat-paglu.icp";
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    QRCode.toCanvas(canvas, url, {
      width: 300,
      margin: 2,
      color: {
        dark: "#1a0a00",
        light: "#fffcf7",
      },
      errorCorrectionLevel: "H",
    })
      .then(() => {
        setIsReady(true);
      })
      .catch((err: unknown) => {
        console.error("QR generation failed:", err);
      });
  }, [url]);

  function handleDownload() {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement("a");
    link.download = "chaat-paglu-qr.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 py-16">
      <div className="max-w-md w-full text-center">
        {/* Back link */}
        <motion.div
          initial={{ opacity: 0, x: -8 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-muted-foreground hover:text-primary transition-colors text-sm font-semibold mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Menu
          </Link>
        </motion.div>

        {/* Card */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-card rounded-[1.5rem] shadow-warm-lg border border-border overflow-hidden"
        >
          {/* Top band */}
          <div className="bg-primary px-6 py-5">
            <div className="flex items-center justify-center gap-2 mb-1">
              <span className="text-3xl">🍽️</span>
              <h1 className="font-display font-extrabold text-primary-foreground text-2xl tracking-tight">
                Chaat Paglu
              </h1>
            </div>
            <p className="text-primary-foreground/80 text-sm font-body">
              Scan to open our menu &amp; order fresh chaat!
            </p>
          </div>

          {/* QR Code display */}
          <div className="px-8 py-8 flex flex-col items-center gap-6">
            <div className="relative">
              <motion.div
                initial={{ scale: 0.85 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3, type: "spring" }}
                className="w-60 h-60 bg-card rounded-2xl border-4 border-primary/20 overflow-hidden shadow-warm flex items-center justify-center"
              >
                {!isReady && (
                  <div className="absolute inset-0 flex items-center justify-center bg-card rounded-2xl">
                    <div className="w-8 h-8 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
                  </div>
                )}
                <canvas
                  ref={canvasRef}
                  className="w-full h-full object-contain"
                  style={{
                    opacity: isReady ? 1 : 0,
                    transition: "opacity 0.3s",
                  }}
                  data-ocid="qr-canvas"
                />
              </motion.div>
              {/* Corner QR decorations */}
              <div className="absolute -top-2 -left-2 w-5 h-5 border-t-4 border-l-4 border-primary rounded-tl-lg pointer-events-none" />
              <div className="absolute -top-2 -right-2 w-5 h-5 border-t-4 border-r-4 border-primary rounded-tr-lg pointer-events-none" />
              <div className="absolute -bottom-2 -left-2 w-5 h-5 border-b-4 border-l-4 border-primary rounded-bl-lg pointer-events-none" />
              <div className="absolute -bottom-2 -right-2 w-5 h-5 border-b-4 border-r-4 border-primary rounded-br-lg pointer-events-none" />
            </div>

            {/* Instructions */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="flex items-center gap-2 bg-muted/50 rounded-xl px-4 py-3 text-sm text-muted-foreground font-body w-full"
            >
              <Smartphone className="w-4 h-4 text-primary shrink-0" />
              <span>
                Point your phone camera at this QR code to open the Chaat Paglu
                menu and order instantly
              </span>
            </motion.div>

            {/* URL */}
            <div className="w-full bg-muted rounded-xl px-4 py-2.5 text-xs font-mono text-muted-foreground text-center truncate border border-border">
              {url}
            </div>

            {/* Actions */}
            <div className="flex gap-3 w-full">
              <Button
                type="button"
                onClick={handleDownload}
                disabled={!isReady}
                variant="outline"
                className="flex-1 flex items-center gap-2 border-primary/30 text-primary hover:bg-primary/5 font-bold font-body"
                data-ocid="download-qr-btn"
              >
                <Download className="w-4 h-4" />
                Download
              </Button>
              <Link to="/" className="flex-1">
                <Button
                  type="button"
                  variant="default"
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground shadow-warm font-bold font-body"
                  data-ocid="go-to-menu-btn"
                >
                  🛒 Order Now
                </Button>
              </Link>
            </div>
          </div>

          {/* Bottom promo strip */}
          <div className="bg-muted/40 border-t border-border px-6 py-3 text-center text-xs text-muted-foreground font-body">
            🌶️ Crispy · Tangy · Always Fresh — Mumbai's Favourite Chaat! 🌶️
          </div>
        </motion.div>
      </div>
    </div>
  );
}

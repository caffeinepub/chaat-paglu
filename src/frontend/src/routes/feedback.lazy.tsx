import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Link } from "@tanstack/react-router";
import { createLazyFileRoute } from "@tanstack/react-router";
import { Loader2 } from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useState } from "react";

export const Route = createLazyFileRoute("/feedback")({
  component: FeedbackPage,
});

const RATING_LABELS: Record<number, string> = {
  1: "😢 Poor",
  2: "😕 Fair",
  3: "😊 Good",
  4: "😄 Very Good",
  5: "🤩 Excellent!",
};

const RATING_EMOJIS = ["😢", "😕", "😊", "😄", "🤩"];

function FeedbackPage() {
  const [orderId, setOrderId] = useState("");
  const [rating, setRating] = useState(0);
  const [hovered, setHovered] = useState(0);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const raw = sessionStorage.getItem("chaat-last-order");
    if (raw) {
      try {
        const parsed = JSON.parse(raw) as { orderId: string };
        setOrderId(parsed.orderId ?? "");
      } catch {
        // ignore
      }
    }
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (rating === 0) return;
    setLoading(true);
    // Simulate backend submitFeedback
    await new Promise((r) => setTimeout(r, 800));
    setLoading(false);
    setSubmitted(true);
  }

  const displayRating = hovered || rating;

  if (submitted) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <motion.div
          initial={{ scale: 0.85, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring" }}
          className="max-w-sm w-full text-center"
          data-ocid="feedback-success"
        >
          <motion.div
            animate={{ rotate: [0, -10, 10, -10, 10, 0] }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-7xl mb-4"
          >
            🙏
          </motion.div>
          <h2 className="font-display font-extrabold text-foreground text-2xl mb-2">
            Thanks for the feedback!
          </h2>
          <p className="text-muted-foreground font-body text-sm mb-6">
            Your {RATING_LABELS[rating]} rating helps us serve you better. See
            you again at Chaat Paglu!
          </p>
          <div className="flex flex-col gap-3">
            <Link to="/" data-ocid="back-to-menu-after-feedback">
              <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground shadow-warm font-bold font-body text-base">
                🥘 Back to Menu
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-10 px-4 flex items-start justify-center">
      <div className="max-w-md w-full">
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <span className="text-5xl">⭐</span>
          <h1 className="font-display font-extrabold text-foreground text-2xl mt-2 mb-1">
            How was your order?
          </h1>
          <p className="text-muted-foreground font-body text-sm">
            {orderId ? (
              <>
                Order <span className="font-bold text-primary">{orderId}</span>{" "}
                — share your experience
              </>
            ) : (
              "Share your Chaat Paglu experience!"
            )}
          </p>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          onSubmit={handleSubmit}
          className="bg-card rounded-2xl border border-border shadow-warm-lg px-6 py-6"
        >
          {/* Star rating */}
          <div className="mb-6">
            <p className="font-body font-semibold text-foreground text-sm mb-3">
              Your Rating <span className="text-destructive">*</span>
            </p>
            <div
              className="flex items-center justify-center gap-3"
              data-ocid="star-rating"
              onMouseLeave={() => setHovered(0)}
            >
              {RATING_EMOJIS.map((emoji, idx) => {
                const val = idx + 1;
                const active = displayRating >= val;
                return (
                  <button
                    key={val}
                    type="button"
                    onClick={() => setRating(val)}
                    onMouseEnter={() => setHovered(val)}
                    className={`text-3xl transition-smooth select-none focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded ${
                      active
                        ? "scale-125"
                        : "scale-100 opacity-50 hover:opacity-80"
                    }`}
                    aria-label={`Rate ${val} out of 5`}
                    data-ocid={`star-${val}`}
                  >
                    {emoji}
                  </button>
                );
              })}
            </div>
            {displayRating > 0 && (
              <motion.p
                key={displayRating}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center font-bold font-body text-primary text-sm mt-2"
              >
                {RATING_LABELS[displayRating]}
              </motion.p>
            )}
          </div>

          {/* Comment */}
          <div className="mb-6">
            <label
              htmlFor="feedback-comment"
              className="font-body font-semibold text-foreground text-sm mb-1.5 block"
            >
              Comments{" "}
              <span className="text-muted-foreground font-normal">
                (optional)
              </span>
            </label>
            <Textarea
              id="feedback-comment"
              placeholder="Tell us what you loved (or didn't)..."
              value={comment}
              onChange={(e) => setComment(e.target.value.slice(0, 500))}
              rows={4}
              className="font-body resize-none bg-input border-input focus:border-primary"
              data-ocid="feedback-comment"
            />
            <p className="text-xs text-muted-foreground text-right mt-1 font-body">
              {comment.length}/500
            </p>
          </div>

          {/* Buttons */}
          <div className="flex gap-3">
            <Link to="/" className="flex-1">
              <Button
                type="button"
                variant="outline"
                className="w-full border-primary/30 text-primary hover:bg-primary/5 font-bold font-body"
                disabled={loading}
              >
                Skip
              </Button>
            </Link>
            <Button
              type="submit"
              disabled={rating === 0 || loading}
              className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground shadow-warm font-bold font-body text-base disabled:opacity-50"
              data-ocid="submit-feedback-btn"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Sending…
                </span>
              ) : (
                "Submit ⭐"
              )}
            </Button>
          </div>
          {rating === 0 && (
            <p className="text-xs text-muted-foreground text-center mt-2 font-body">
              Please select a rating to submit
            </p>
          )}
        </motion.form>
      </div>
    </div>
  );
}

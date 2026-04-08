# Design Brief: Chaat Paglu

**Purpose & Context**: Vibrant Indian street food ordering platform celebrating festive, celebratory street vendor culture. Warm, energetic, maximalist aesthetic.

**Tone**: Bold maximalism — warm, celebratory, energetic, approachable, joyful.

**Differentiation**: Warm festive Indian color language (saffron, orange, red, yellow) with hand-crafted feel; celebrates food ordering as a celebration, not a utility.

## Palette

| Token          | OKLCH         | Use                              |
| -------------- | ------------- | -------------------------------- |
| primary        | 0.58 0.16 37  | CTAs, order buttons, active state |
| secondary      | 0.68 0.18 35  | Accent highlights, badges        |
| accent         | 0.65 0.2 45   | Price highlights, festive pops    |
| background     | 0.98 0.01 70  | Cream base (warm, not stark)     |
| foreground     | 0.2 0.05 30   | Text, dark accents               |
| card           | 1.0 0 0       | Pure white food item cards       |
| muted          | 0.92 0.02 60  | Secondary surfaces, dividers     |
| destructive    | 0.55 0.22 25  | Remove/delete actions            |

## Typography

Display: Bricolage Grotesque (bold, geometric, playful, 700–900 weight for headers); Body: Nunito (friendly, accessible, 400–600 weight for copy). Type scale: h1 3.5rem, h2 2.75rem, h3 2rem, body 1rem, small 0.875rem.

## Elevation & Depth

Card shadow (warm): `0 4px 12px rgba(180, 100, 40, 0.12)`. Elevated shadow (warm): `0 12px 32px rgba(180, 100, 40, 0.15)`. Borders: soft, `border: 1px solid var(--border)`. No harsh borders.

## Structural Zones

| Zone          | Background              | Treatment                            |
| ------------- | ----------------------- | ------------------------------------ |
| Header        | primary (saffron/orange) | Festive banner, white text, elevated |
| Main Content  | background (cream)      | Clean, breathing space               |
| Food Cards    | card (white)            | Shadow lift, rounded 1.5rem, hover   |
| Buttons       | primary/secondary       | Rounded, generous padding, hover glow |
| Footer        | muted/20                | Subtle, border-top, secondary text   |

## Spacing & Rhythm

Base unit: 1rem. Margins: 2rem (header), 3rem (section), 2rem (card gap). Padding: 2rem (container), 1.5rem (card), 1rem (button). Breathing room: generous, not cramped.

## Component Patterns

Menu cards: 3-column grid (lg), 2-column (md), 1-column (sm). Food item card: image placeholder, name (display font), price (accent), quantity controls. Buttons: primary (saffron), secondary (warm red), all with rounded corners. Forms: clean inputs with card styling, submit buttons primary color.

## Motion & Interaction

Smooth transition default (`all 0.3s cubic-bezier(0.4, 0, 0.2, 1)`). Card hover: lift effect (`-translate-y-1`) + shadow elevation. Button hover: subtle glow, brightness increase. No bouncy animations; refined, purposeful movement.

## Constraints

No harsh blacks; use foreground token (0.2 0.05 30). No default greys; all neutrals from palette. No raw hex values. Icon sizes: 20px (sm), 24px (md), 32px (lg). No more than 3 accent colors per view. Border radius consistent: 0 (utility), 0.5rem (small), 1rem (medium), 1.5rem (cards/buttons), full (pills/avatars).

## Signature Detail

Warm shadow palette specific to Indian spice tones (saffron/turmeric warmth in shadow color); creates tactile, hand-crafted feel. Card lift on hover with warm shadow elevation — every interaction feels like celebrating food.

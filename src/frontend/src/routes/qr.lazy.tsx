import { QRPage } from "@/pages/QRPage";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/qr")({
  component: QRPage,
});

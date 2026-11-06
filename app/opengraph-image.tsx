import { shareImage } from "./ShareImage";

export const alt = "American Friends for Ukraine. Help Americans stand with Ukraine.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return shareImage(
    "Help Americans stand with Ukraine.",
    "A U.S. nonprofit funding medical supplies and relief for Ukrainian families.",
  );
}

import { shareImage } from "../ShareImage";

export const alt = "Photos from Ukraine. The damage, and the people rebuilding. American Friends for Ukraine.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return shareImage("Photos from Ukraine", "The damage, and the people rebuilding.");
}

import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

// Brand-only cards keep withdrawn photos out of link previews.
const markData = await readFile(join(process.cwd(), "public/brand/mark.svg"), "base64");
const markSrc = `data:image/svg+xml;base64,${markData}`;

export function shareImage(title: string, description: string) {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex", flexDirection: "column", width: "100%", height: "100%",
          background: "#fefaf4", color: "#0A2348", padding: "54px 64px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 22 }}>
          {/* ImageResponse renders ordinary img elements, not next/image. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={markSrc} alt="" width={100} height={100} />
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 32, fontWeight: 700 }}>American Friends</div>
            <div style={{ fontSize: 19, letterSpacing: 6, marginTop: 6 }}>FOR UKRAINE</div>
          </div>
        </div>
        <div style={{ display: "flex", fontSize: 68, fontWeight: 700, lineHeight: 1.1, maxWidth: 1000, marginTop: 46 }}>
          {title}
        </div>
        <div style={{ display: "flex", fontSize: 28, lineHeight: 1.4, color: "#536173", maxWidth: 960, marginTop: 28 }}>
          {description}
        </div>
        <div style={{ display: "flex", position: "absolute", bottom: 0, left: 0, width: "100%", height: 18 }}>
          <div style={{ width: "50%", background: "#0057B7" }} />
          <div style={{ width: "50%", background: "#FFD500" }} />
        </div>
      </div>
    ),
    { width: 1200, height: 630 },
  );
}

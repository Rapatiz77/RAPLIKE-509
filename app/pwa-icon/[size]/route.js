import { ImageResponse } from "next/og";

export async function GET(request, { params }) {
  const s = Number(params.size) === 192 ? 192 : 512;
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #1f3fff, #05050a 50%, #e11129)",
          color: "#ffffff",
          fontSize: Math.round(s * 0.36),
          fontWeight: 900,
        }}
      >
        509
      </div>
    ),
    { width: s, height: s }
  );
}

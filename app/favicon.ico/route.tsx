import { ImageResponse } from "next/og"

export const runtime = "edge"

export async function GET() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#0d9488",
      }}
    >
      <div
        style={{
          fontSize: 24,
          fontWeight: "bold",
          color: "white",
          fontFamily: "sans-serif",
        }}
      >
        EA
      </div>
    </div>,
    {
      width: 32,
      height: 32,
    },
  )
}

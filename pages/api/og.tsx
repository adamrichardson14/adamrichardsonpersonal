import { ImageResponse } from "@vercel/og";
import { NextRequest } from "next/server";

export const config = {
  runtime: "experimental-edge",
};

export default function handler(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    console.log("searchParams", searchParams);
    const hasTitle = searchParams.has("title");
    const title = hasTitle
      ? searchParams.get("title")?.slice(0, 100)
      : "Adam Richardson - Fullstack Developer, Course Creator, and Data Enthusiast";

    return new ImageResponse(
      (
        <div
          style={{
            backgroundColor: "#171717",
            backgroundSize: "150px 150px",
            height: "100%",
            width: "100%",
            display: "flex",
            textAlign: "center",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            flexWrap: "nowrap",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              justifyItems: "center",
            }}
          >
            <svg
              id="e5eRSYMwQty1"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              viewBox="0 0 113 69"
              style={{
                height: "100px",
                width: "100px",
              }}
              shapeRendering="geometricPrecision"
              textRendering="geometricPrecision"
            >
              <path
                id="e5eRSYMwQty2"
                d="M38.7031,54.75L42.6875,69h13.875L34.625,0.75h-11.9531L0.3125,69h13.875l4.0313-14.25h20.4843Zm-17.25-11.2031l7.1719-25.125l6.9844,25.125h-14.1563Zm64.5-.0469L98.7969,69h14.1091v-.6094L98.2344,40.2188c1.8746-.8438,3.5626-1.8438,5.0626-3c1.531-1.1563,2.844-2.5157,3.937-4.0782c1.063-1.5312,1.875-3.2656,2.438-5.2031.594-1.9687.89-4.1719.89-6.6094c0-3.375-.593-6.3437-1.781-8.9062-1.156-2.56252-2.812-4.70315-4.969-6.4219C101.625,4.28125,99,2.98438,95.9375,2.10938C92.875,1.20312,89.4531,0.75,85.6719,0.75h-22.875v68.25h13.1719v-25.5h9.9843ZM75.9688,32.8125v-21.375h9.7031c1.8125,0,3.4219.2187,4.8281.6563c1.4062.4374,2.5938,1.0624,3.5625,1.875c1.0937.9062,1.9063,2.0624,2.4375,3.4687.5625,1.375.8438,2.9687.8438,4.7813c0,1.5-.2188,2.8593-.6563,4.0781-.4063,1.2187-1.0156,2.2656-1.8281,3.1406-.9688,1.0937-2.2344,1.9375-3.7969,2.5313-1.5313.5624-3.3125.8437-5.3437.8437h-9.75Z"
                opacity="0"
                fill="#f7f7f7"
              />
            </svg>
          </div>
          <div
            style={{
              fontSize: 60,
              fontStyle: "normal",
              letterSpacing: "-0.025em",
              color: "white",
              marginTop: 30,
              padding: "0 120px",
              lineHeight: 1.4,
              whiteSpace: "pre-wrap",
            }}
          >
            {title}
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (e: any) {
    console.log(`${e.message}`);
    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }
}

import { google } from "googleapis";
import { NextResponse } from "next/server";

const { GOOGLE_CLIENT_EMAIL, GOOGLE_PRIVATE_KEY } = process.env;

if (!GOOGLE_CLIENT_EMAIL || !GOOGLE_PRIVATE_KEY) {
  throw new Error("Missing required environment variables");
}

export async function POST({
  req,
  sheetId,
}: {
  req: Request;
  sheetId: string;
}) {
  if (req.method !== "POST") {
    return NextResponse.json(
      { error: "Only POST requests allowed" },
      { status: 405 },
    );
  }

  try {
    const body = await req.json();

    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: GOOGLE_CLIENT_EMAIL,
        private_key: GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
      },
      scopes: [
        "https://www.googleapis.com/auth/drive",
        "https://www.googleapis.com/auth/drive.file",
        "https://www.googleapis.com/auth/spreadsheets",
      ],
    });

    const sheets = google.sheets({ auth, version: "v4" });

    await sheets.spreadsheets.values.append({
      spreadsheetId: sheetId,
      range: "A2",
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: [[...body]],
      },
    });

    return NextResponse.json({ status: 201 });
  } catch (error: unknown) {
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Google request failed",
      },
      { status: 500 },
    );
  }
}

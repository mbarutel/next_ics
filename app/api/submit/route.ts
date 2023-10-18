import { google } from "googleapis";
import { NextResponse } from "next/server";

type SheetForm = {
  date: string;
  email: string;
};

export async function POST(
  req: Request,
  _res: Response,
) {
  if (req.method !== "POST") {
    return NextResponse.json({ error: "Only POST requests allowed" }, {
      status: 405,
    });
  }

  const passedValue = await new Response(req.body).text();
  const body = JSON.parse(passedValue) as SheetForm;

  try {
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_CLIENT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
      },
      scopes: [
        "https://www.googleapis.com/auth/drive",
        "https://www.googleapis.com/auth/drive.file",
        "https://www.googleapis.com/auth/spreadsheets",
      ],
    });

    const sheets = google.sheets({
      auth,
      version: "v4",
    });

    await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range: "A2:B2",
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: [
          [body.date, body.email],
        ],
      },
    });

    return NextResponse.json({
      message: "Subscribing Success!",
    }, { status: 201 });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json({
        error: "Subscribing unsuccesful. Please try again later.",
      }, { status: 500 });
    }
  }
}

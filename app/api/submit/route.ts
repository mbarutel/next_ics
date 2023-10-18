import type { NextApiRequest, NextApiResponse } from "next";
import { google } from "googleapis";
import { NextResponse } from "next/server";

type SheetForm = {
  date: string;
  email: string;
};

export async function POST(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== "POST") {
    return res.status(405).send({ message: "Only POST requests allowed" });
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
      message: "Subscribing was succesful. Thank you.",
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json({
        error: error.message,
        message: "Subscribing was unsuccesful. Please try again later.",
      });
    }
  }
}

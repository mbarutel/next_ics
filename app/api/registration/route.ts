import dayjs from "dayjs";
import { google } from "googleapis";
import { NextResponse } from "next/server";
import { RegistrationType } from "@/lib/types";

// Validate required environment variables
const {
  GOOGLE_CLIENT_EMAIL,
  GOOGLE_PRIVATE_KEY,
  GOOGLE_REGISTRATION_SHEET_ID,
} = process.env;

if (
  !GOOGLE_CLIENT_EMAIL ||
  !GOOGLE_PRIVATE_KEY ||
  !GOOGLE_REGISTRATION_SHEET_ID
) {
  throw new Error("Missing required environment variables");
}

export async function POST(req: Request) {
  if (req.method !== "POST") {
    return NextResponse.json(
      { error: "Only POST requests allowed" },
      { status: 405 },
    );
  }

  try {
    const body = (await req.json()) as RegistrationType;

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

    const date = dayjs().format("DD MMMM, YYYY");
    const priceDueDate = dayjs(body.priceDueDate).format("DD MMMM, YYYY");

    await sheets.spreadsheets.values.append({
      spreadsheetId: GOOGLE_REGISTRATION_SHEET_ID,
      range: "A2",
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: [
          [
            body.reference,
            date,
            body.conference,
            body.mainParticipant.name,
            body.mainParticipant.position,
            body.company,
            body.address,
            body.mainParticipant.phone,
            body.mainParticipant.email,
            body.extraParticipants,
            body.events,
            body.dinnerParticipants,
            body.masterclass,
            body.agreement === true ? "Agree" : "Disagree",
            body.discount,
            body.accomodation,
            body.priceValue,
            body.dinnerPrice,
            body.masterclassPrice,
            body.total + body.total * 0.1,
            priceDueDate,
          ],
        ],
      },
    });

    return NextResponse.json(
      { message: "Submission in Google Sheets" },
      { status: 201 },
    );
  } catch (error: unknown) {
    console.error(error);
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Registration unsuccessful. Please try again later.",
      },
      { status: 500 },
    );
  }
}

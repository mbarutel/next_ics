import dayjs from "dayjs";
import { google } from "googleapis";
import { NextResponse } from "next/server";
import { RegistrationType } from "@/lib/types";

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
  const body = JSON.parse(passedValue) as RegistrationType;

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

    const date = new Date();
    await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.GOOGLE_REGISTRATION_SHEET_ID,
      range: "A2:B2",
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: [
          [
            dayjs(date).format("DD MMMM, YYYY"),
            body.conference,
            body.mainParticipant.name,
            body.mainParticipant.position,
            body.company,
            body.address,
            body.mainParticipant.phone,
            body.mainParticipant.email,
            body.priceValue,
            dayjs(body.priceDueDate).format("DD MMMM, YYYY"),
            body.extraParticipants,
            body.events,
            body.dinnerParticipants,
            body.masterclass,
            body.paymentMethod,
            body.accomodation,
            body.discount,
            body.agreement === true ? "Agree" : "Disagree",
          ],
        ],
      },
    });

    return NextResponse.json({
      message: "Registration Success!",
    }, { status: 201 });
  } catch (error: unknown) {
    console.log(error);
    if (error instanceof Error) {
      return NextResponse.json({
        error: "Registration unsuccesful. Please try again later.",
      }, { status: 500 });
    }
  }
}

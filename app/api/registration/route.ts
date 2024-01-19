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
    console.log(body);

    const date = new Date();
    const events = body.events.join("\n");
    // const extraParticipants = body.extraParticipants.map((item) =>
    //   item.name.concat(` | ${item.position}`)
    // ).join("\n");
    // const price = body.price.price?.toString().concat(
    //   ` | ${body.fee.dueDate ? body.fee.dueDate.toString() : "NULL"}\n`,
    // );
    // const dinner = body.dinner.map((item) =>
    //   item.name.concat(` | ${item.diet}`)
    // ).join("\n");
    //
    
    // date
    // Conferece
    // rego number ID - First three letters of conference
    // name
    // position
    // company
    // address
    // phone
    // email
    // fee
    // dinner
    // masterclass
    // GST 10%
    // Surcharge
    // accomodation
    // Total
    // Manual
    // Remark
    // Status

    await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.GOOGLE_REGISTRATION_SHEET_ID,
      range: "A2:B2",
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: [
          [
            date,
            body.conference,
            body.mainParticipant.name,
            body.mainParticipant.position,
            body.company,
            body.address,
            body.mainParticipant.phone,
            body.mainParticipant.email,
            events,
            // extraParticipants,
            body.masterclass,
            body.accomodation,
            body.discount,
            body.agreement === true ? "I agree" : "",
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

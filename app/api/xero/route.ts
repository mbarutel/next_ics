import dayjs from "dayjs";
import { xero } from "@/xero/client";
import { NextResponse } from "next/server";
import { RegistrationType } from "@/lib/types";
import { Invoice, LineAmountTypes } from "xero-node";
import { contactCheck, generateLineItems } from "@/lib/xero-utils";

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
    await xero.getClientCredentialsToken();

    const contactId = await contactCheck(body);

    const invoices = {
      invoices: [
        {
          type: Invoice.TypeEnum.ACCREC,
          reference: body.reference,
          contact: {
            contactID: contactId,
          },
          date: dayjs(new Date()).format("YYYY-MM-DD"),
          dueDate: dayjs(body.priceDueDate).format("YYYY-MM-DD"),
          lineAmountTypes: LineAmountTypes.Exclusive,
          lineItems: generateLineItems({ body }),
          totalTax: body.total * 0.1,
          status: Invoice.StatusEnum.DRAFT,
        },
      ],
    };

    await xero.accountingApi.createInvoices(
      "",
      invoices,
    );

    return NextResponse.json({
      message: "Invoice created",
    }, { status: 201 });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({
        error: error.message,
      }, { status: 500 });
    }
  }
}

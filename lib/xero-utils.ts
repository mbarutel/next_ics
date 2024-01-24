import { xero } from "@/xero/client";
import { RegistrationType } from "./types";
import { Contacts, LineItem } from "xero-node";

export function generateLineItems({ body }: { body: RegistrationType }) {
  let objects: LineItem[] = [{
    taxType: "OUTPUT",
    accountCode: "200",
    description: "Registration Fee",
    quantity: body.extraParticipants.length + 1,
    unitAmount: body.priceValue,
    // lineAmount: body.fee.price * (body.group.length + 1),
  }];

  if (body.dinnerParticipants.length > 0) {
    objects = [
      ...objects,
      {
        taxType: "OUTPUT",
        accountCode: "200",
        description: "Conference Networking Dinner",
        quantity: body.dinnerParticipants.length,
        unitAmount: body.dinnerPrice,
        // lineAmount: 150.0 * (body.group.length + 1),
      },
    ];
  }

  if (body.masterclass !== "no") {
    objects = [
      ...objects,
      {
        taxType: "OUTPUT",
        accountCode: "200",
        description: "Post-Conference Masterclass",
        unitAmount: body.masterclassPrice,
        // lineAmount: 150.0 * (body.group.length + 1),
      },
    ];
  }

  return objects;
}

export async function contactCheck(
  body: RegistrationType,
) {
  const contacts = await xero.accountingApi.getContacts("");

  console.log(contacts.body.contacts);

  const matchedName = contacts.body.contacts &&
    contacts.body.contacts.find((contact) =>
      contact.name?.toLowerCase() === body.company.toLowerCase()
    );

  console.log("is matchedName found");
  console.log(matchedName);

  const name = body.mainParticipant.name.split(" ");
  const firstName = name.slice(0, name.length - 1).join(" ");
  const lastName = name[name.length - 1];

  if (matchedName && matchedName.contactID) {
    if (
      firstName !== matchedName.firstName || lastName !== matchedName.lastName
    ) {
      const contactObject: Contacts = {
        contacts: [
          {
            ...matchedName,
            firstName,
            lastName,
            emailAddress: body.mainParticipant.email,
          },
        ],
      };

      console.log("About to update contact");

      await xero.accountingApi.updateContact(
        "",
        matchedName.contactID,
        contactObject,
      );
    }

    return matchedName.contactID;
  }

  const contactObject = {
    contacts: [
      {
        name: body.company,
        firstName: firstName,
        lastName: lastName,
        emailAddress: body.mainParticipant.email,
      },
    ],
  };

  console.log("About to make new contact");

  const newContact = await xero.accountingApi.createContacts(
    "",
    contactObject,
  );

  console.log("success making new contact");

  if (!newContact.body.contacts) {
    throw new Error("Error Creating New Contact");
  }

  return newContact.body.contacts[0].contactID;
}

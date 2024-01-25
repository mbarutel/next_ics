import { xero } from "@/xero/client";
import { RegistrationType } from "./types";
import { Contacts, LineItem } from "xero-node";

export function generateLineItems({ body }: { body: RegistrationType }) {
  const extraParticipants = body.extraParticipants.split("\n");
  const dinnerParticipants = body.dinnerParticipants.split("\n");

  let objects: LineItem[] = [{
    taxType: "OUTPUT",
    accountCode: "200",
    description: "Registration Fee",
    quantity: extraParticipants.length + 1,
    unitAmount: body.priceValue,
  }];

  if (dinnerParticipants.length > 0) {
    objects = [
      ...objects,
      {
        taxType: "OUTPUT",
        accountCode: "200",
        description: "Conference Networking Dinner",
        quantity: dinnerParticipants.length,
        unitAmount: body.dinnerPrice,
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
      },
    ];
  }

  if (body.discount !== "") {
    objects = [
      ...objects,
      {
        taxType: "OUTPUT",
        accountCode: "200",
        description: "Discount Code: " + body.discount,
        unitAmount: 0,
      },
    ];
  }

  return objects;
}

export async function contactCheck(
  body: RegistrationType,
) {
  const contacts = await xero.accountingApi.getContacts("");

  const matchedName = contacts.body.contacts &&
    contacts.body.contacts.find((contact) =>
      contact.name?.toLowerCase() === body.company.toLowerCase()
    );

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

  const newContact = await xero.accountingApi.createContacts(
    "",
    contactObject,
  );

  if (!newContact.body.contacts) {
    throw new Error("Error Creating New Contact");
  }

  return newContact.body.contacts[0].contactID;
}

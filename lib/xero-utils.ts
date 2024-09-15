import { xero } from "@/xero/client";
import { RegistrationType } from "./types";
import { ContactGroup, ContactGroups, Contacts, LineItem } from "xero-node";

export function generateLineItems({ body }: { body: RegistrationType }) {
  let objects: LineItem[] = [
    {
      taxType: "OUTPUT",
      accountCode: "200",
      description: "Registration Fee",
      quantity:
        body.extraParticipants === ""
          ? 1
          : body.extraParticipants.split("\n").length + 1,
      unitAmount: body.priceValue,
    },
  ];

  if (body.dinnerParticipants !== "") {
    const quantity = body.dinnerParticipants.split("\n").length;
    objects = [
      ...objects,
      {
        taxType: "OUTPUT",
        accountCode: "200",
        description: "Conference Networking Dinner",
        quantity: quantity,
        unitAmount: body.dinnerPrice / quantity,
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

export async function contactCheck(body: RegistrationType) {
  // TODO : Ultimately we want to query a single contact
  // rather than all of them.
  const contacts = await xero.accountingApi.getContacts("");

  // Check name of registration to contact.name
  const matchedName =
    contacts.body.contacts &&
    contacts.body.contacts.find(
      (contact) =>
        contact.name?.toLowerCase() === body.mainParticipant.name.toLowerCase(),
    );

  const name = body.mainParticipant.name.split(" ");
  const firstName = name.slice(0, name.length - 1).join(" ");
  const lastName = name[name.length - 1];
  const contactObject = {
    contacts: [
      {
        name: body.mainParticipant.name,
        firstName: firstName,
        lastName: lastName,
        emailAddress: body.mainParticipant.email,
      },
    ],
  };

  if (matchedName && matchedName.contactID) {
    if (matchedName.emailAddress != body.mainParticipant.email) {
      const updatedContact = await xero.accountingApi.updateContact(
        "",
        matchedName.contactID,
        contactObject,
      );

      if (!updatedContact.body.contacts) {
        throw new Error("Error Updating Contact");
      }

      return updatedContact.body.contacts[0].contactID;
    }

    return matchedName.contactID;
  }

  const newContact = await xero.accountingApi.createContacts("", contactObject);

  if (!newContact.body.contacts) {
    throw new Error("Error Creating New Contact");
  }

  return newContact.body.contacts[0].contactID;
}

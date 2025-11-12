import { xero } from "@/xero/client";
import { RegistrationType } from "./types";
import { ContactGroup, ContactGroups, Contacts, LineItem } from "xero-node";

export function generateLineItems({ body }: { body: RegistrationType }) {
  // Check if using new delegates structure
  const useDelegates = body.delegates && body.delegates.length > 0;

  // Calculate registration quantity
  const registrationQty = useDelegates
    ? body.delegates.length
    : (body.extraParticipants === "" ? 1 : body.extraParticipants.split("\n").length + 1);

  let objects: LineItem[] = [
    {
      taxType: "OUTPUT",
      accountCode: "200",
      description: "Registration Fee",
      quantity: registrationQty,
      unitAmount: body.priceValue,
    },
  ];

  // Handle dinner participants
  const dinnerQty = useDelegates
    ? body.delegates.filter(d => d.dinner).length
    : (body.dinnerParticipants === "" ? 0 : body.dinnerParticipants.split("\n").length);

  if (dinnerQty > 0) {
    objects = [
      ...objects,
      {
        taxType: "OUTPUT",
        accountCode: "200",
        description: "Conference Networking Dinner",
        quantity: dinnerQty,
        unitAmount: body.dinnerPrice / dinnerQty,
      },
    ];
  }

  // Handle masterclass
  const masterclassQty = useDelegates
    ? body.delegates.filter(d => d.masterclass !== null && d.masterclass !== "").length
    : (body.masterclass !== "no" ? 1 : 0);

  if (masterclassQty > 0) {
    objects = [
      ...objects,
      {
        taxType: "OUTPUT",
        accountCode: "200",
        description: "Post-Conference Masterclass",
        quantity: masterclassQty,
        unitAmount: body.masterclassPrice / masterclassQty,
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

  // Check if using new delegates structure
  const useDelegates = body.delegates && body.delegates.length > 0;

  let firstName: string;
  let lastName: string;
  let fullName: string;
  let email: string;

  if (useDelegates) {
    // Use first delegate for contact
    firstName = body.delegates[0].firstName;
    lastName = body.delegates[0].lastName;
    fullName = `${firstName} ${lastName}`;
    email = body.delegates[0].email;
  } else {
    // Use old structure
    fullName = body.mainParticipant.name;
    email = body.mainParticipant.email;
    const name = fullName.split(" ");
    firstName = name.slice(0, name.length - 1).join(" ");
    lastName = name[name.length - 1];
  }

  // Check name of registration to contact.name
  const matchedName =
    contacts.body.contacts &&
    contacts.body.contacts.find(
      (contact) =>
        contact.name?.toLowerCase() === fullName.toLowerCase(),
    );

  const contactObject = {
    contacts: [
      {
        name: fullName,
        firstName: firstName,
        lastName: lastName,
        emailAddress: email,
      },
    ],
  };

  if (matchedName && matchedName.contactID) {
    if (matchedName.emailAddress != email) {
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

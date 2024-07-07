import type { ChainModifiers, Entry, EntryFieldTypes, EntrySkeletonType, LocaleCode } from "contentful";
import type { TypeEventSkeleton } from "./TypeEvent";
import type { TypeMasterclassSkeleton } from "./TypeMasterclass";
import type { TypeSpeakerSkeleton } from "./TypeSpeaker";
import type { TypeSponsorSkeleton } from "./TypeSponsor";

export interface TypeConferencesFields {
    title: EntryFieldTypes.Symbol;
    slug: EntryFieldTypes.Symbol;
    invoiceReference: EntryFieldTypes.Symbol;
    startDate?: EntryFieldTypes.Date;
    endDate?: EntryFieldTypes.Date;
    venue: EntryFieldTypes.Symbol;
    coverImage: EntryFieldTypes.AssetLink;
    events: EntryFieldTypes.Array<EntryFieldTypes.EntryLink<TypeEventSkeleton>>;
    speakers?: EntryFieldTypes.Array<EntryFieldTypes.EntryLink<TypeSpeakerSkeleton>>;
    masterclass?: EntryFieldTypes.Array<EntryFieldTypes.EntryLink<TypeMasterclassSkeleton>>;
    submitAPaperLink?: EntryFieldTypes.Symbol;
    externalForm?: EntryFieldTypes.Symbol;
    prices?: EntryFieldTypes.Object;
    agenda?: EntryFieldTypes.Object;
    sponsor?: EntryFieldTypes.Array<EntryFieldTypes.EntryLink<TypeSponsorSkeleton>>;
}

export type TypeConferencesSkeleton = EntrySkeletonType<TypeConferencesFields, "conferences">;
export type TypeConferences<Modifiers extends ChainModifiers, Locales extends LocaleCode = LocaleCode> = Entry<TypeConferencesSkeleton, Modifiers, Locales>;

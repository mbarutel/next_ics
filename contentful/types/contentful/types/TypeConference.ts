import type { ChainModifiers, Entry, EntryFieldTypes, EntrySkeletonType, LocaleCode } from "contentful";

export interface TypeConferenceFields {
    title: EntryFieldTypes.Symbol;
    content: EntryFieldTypes.RichText;
    tags?: EntryFieldTypes.Array<EntryFieldTypes.Symbol>;
    startDate: EntryFieldTypes.Date;
    endDate: EntryFieldTypes.Date;
    media?: EntryFieldTypes.Array<EntryFieldTypes.AssetLink>;
    slug: EntryFieldTypes.Symbol;
    coverImage: EntryFieldTypes.AssetLink;
    venueName: EntryFieldTypes.Symbol;
    venueAddress: EntryFieldTypes.Location;
    description: EntryFieldTypes.Text;
}

export type TypeConferenceSkeleton = EntrySkeletonType<TypeConferenceFields, "conference">;
export type TypeConference<Modifiers extends ChainModifiers, Locales extends LocaleCode> = Entry<TypeConferenceSkeleton, Modifiers, Locales>;

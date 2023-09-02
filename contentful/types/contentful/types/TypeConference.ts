import type { ChainModifiers, Entry, EntryFieldTypes, EntrySkeletonType, LocaleCode } from "contentful";

export interface TypeConferenceFields {
    title: EntryFieldTypes.Symbol;
    content: EntryFieldTypes.RichText;
    tags?: EntryFieldTypes.Array<EntryFieldTypes.Symbol>;
    startDate?: EntryFieldTypes.Date;
    endDate?: EntryFieldTypes.Date;
    venue?: EntryFieldTypes.Location;
    media?: EntryFieldTypes.Array<EntryFieldTypes.AssetLink>;
    slug: EntryFieldTypes.Symbol;
    coverImage?: EntryFieldTypes.AssetLink;
}

export type TypeConferenceSkeleton = EntrySkeletonType<TypeConferenceFields, "conference">;
export type TypeConference<Modifiers extends ChainModifiers, Locales extends LocaleCode> = Entry<TypeConferenceSkeleton, Modifiers, Locales>;

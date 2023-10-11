import type { ChainModifiers, Entry, EntryFieldTypes, EntrySkeletonType, LocaleCode } from "contentful";

export interface TypeConferencesFields {
    title?: EntryFieldTypes.Symbol;
    coverImage?: EntryFieldTypes.AssetLink;
    description?: EntryFieldTypes.RichText;
    registrationLink?: EntryFieldTypes.Symbol;
    events?: EntryFieldTypes.Array<EntryFieldTypes.EntryLink<EntrySkeletonType>>;
    venue?: EntryFieldTypes.Symbol;
    location?: EntryFieldTypes.Location;
    startDate?: EntryFieldTypes.Date;
    endDate?: EntryFieldTypes.Date;
    slug?: EntryFieldTypes.Symbol;
}

export type TypeConferencesSkeleton = EntrySkeletonType<TypeConferencesFields, "conferences">;
export type TypeConferences<Modifiers extends ChainModifiers, Locales extends LocaleCode> = Entry<TypeConferencesSkeleton, Modifiers, Locales>;

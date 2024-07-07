import type { ChainModifiers, Entry, EntryFieldTypes, EntrySkeletonType, LocaleCode } from "contentful";

export interface TypeSponsorFields {
    name: EntryFieldTypes.Symbol;
    logo: EntryFieldTypes.AssetLink;
    link: EntryFieldTypes.Symbol;
}

export type TypeSponsorSkeleton = EntrySkeletonType<TypeSponsorFields, "sponsor">;
export type TypeSponsor<Modifiers extends ChainModifiers, Locales extends LocaleCode = LocaleCode> = Entry<TypeSponsorSkeleton, Modifiers, Locales>;

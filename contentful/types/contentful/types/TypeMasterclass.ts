import type { ChainModifiers, Entry, EntryFieldTypes, EntrySkeletonType, LocaleCode } from "contentful";

export interface TypeMasterclassFields {
    title: EntryFieldTypes.Symbol;
    slug: EntryFieldTypes.Symbol;
    description: EntryFieldTypes.RichText;
    asset?: EntryFieldTypes.AssetLink;
}

export type TypeMasterclassSkeleton = EntrySkeletonType<TypeMasterclassFields, "masterclass">;
export type TypeMasterclass<Modifiers extends ChainModifiers, Locales extends LocaleCode = LocaleCode> = Entry<TypeMasterclassSkeleton, Modifiers, Locales>;

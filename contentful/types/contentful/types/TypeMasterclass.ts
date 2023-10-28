import type { ChainModifiers, Entry, EntryFieldTypes, EntrySkeletonType, LocaleCode } from "contentful";

export interface TypeMasterclassFields {
    title: EntryFieldTypes.Symbol;
    slug: EntryFieldTypes.Symbol;
    description: EntryFieldTypes.RichText;
    video?: EntryFieldTypes.Symbol;
}

export type TypeMasterclassSkeleton = EntrySkeletonType<TypeMasterclassFields, "masterclass">;
export type TypeMasterclass<Modifiers extends ChainModifiers, Locales extends LocaleCode> = Entry<TypeMasterclassSkeleton, Modifiers, Locales>;

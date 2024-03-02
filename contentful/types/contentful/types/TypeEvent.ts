import type { ChainModifiers, Entry, EntryFieldTypes, EntrySkeletonType, LocaleCode } from "contentful";
import type { TypeConferencesSkeleton } from "./TypeConferences";

export interface TypeEventFields {
    title: EntryFieldTypes.Symbol;
    slug: EntryFieldTypes.Symbol;
    description: EntryFieldTypes.Text;
    content: EntryFieldTypes.RichText;
    media?: EntryFieldTypes.Array<EntryFieldTypes.AssetLink>;
    coverImage: EntryFieldTypes.AssetLink;
    conference: EntryFieldTypes.EntryLink<TypeConferencesSkeleton>;
}

export type TypeEventSkeleton = EntrySkeletonType<TypeEventFields, "event">;
export type TypeEvent<Modifiers extends ChainModifiers, Locales extends LocaleCode> = Entry<TypeEventSkeleton, Modifiers, Locales>;

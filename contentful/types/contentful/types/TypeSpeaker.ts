import type { ChainModifiers, Entry, EntryFieldTypes, EntrySkeletonType, LocaleCode } from "contentful";

export interface TypeSpeakerFields {
    name: EntryFieldTypes.Symbol;
    photo: EntryFieldTypes.AssetLink;
    jobTitle: EntryFieldTypes.Symbol;
    organization: EntryFieldTypes.Symbol;
    biography: EntryFieldTypes.RichText;
    slug: EntryFieldTypes.Symbol;
}

export type TypeSpeakerSkeleton = EntrySkeletonType<TypeSpeakerFields, "speaker">;
export type TypeSpeaker<Modifiers extends ChainModifiers, Locales extends LocaleCode> = Entry<TypeSpeakerSkeleton, Modifiers, Locales>;

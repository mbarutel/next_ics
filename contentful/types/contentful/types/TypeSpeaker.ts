import type { ChainModifiers, Entry, EntryFieldTypes, EntrySkeletonType, LocaleCode } from "contentful";

export interface TypeSpeakerFields {
    name: EntryFieldTypes.Symbol;
    jobTitle: EntryFieldTypes.Symbol;
    organization: EntryFieldTypes.Symbol;
    photo: EntryFieldTypes.AssetLink;
    biography: EntryFieldTypes.RichText;
}

export type TypeSpeakerSkeleton = EntrySkeletonType<TypeSpeakerFields, "speaker">;
export type TypeSpeaker<Modifiers extends ChainModifiers, Locales extends LocaleCode> = Entry<TypeSpeakerSkeleton, Modifiers, Locales>;

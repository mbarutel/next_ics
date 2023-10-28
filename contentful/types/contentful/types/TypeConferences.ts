import type { ChainModifiers, Entry, EntryFieldTypes, EntrySkeletonType, LocaleCode } from "contentful";
import type { TypeEventSkeleton } from "./TypeEvent";
import type { TypeMasterclassSkeleton } from "./TypeMasterclass";
import type { TypeSpeakerSkeleton } from "./TypeSpeaker";

export interface TypeConferencesFields {
    title: EntryFieldTypes.Symbol;
    coverImage: EntryFieldTypes.AssetLink;
    registrationLink: EntryFieldTypes.Symbol;
    events: EntryFieldTypes.Array<EntryFieldTypes.EntryLink<TypeEventSkeleton>>;
    venue: EntryFieldTypes.Symbol;
    location?: EntryFieldTypes.Location;
    startDate: EntryFieldTypes.Date;
    endDate: EntryFieldTypes.Date;
    slug: EntryFieldTypes.Symbol;
    speakers: EntryFieldTypes.Array<EntryFieldTypes.EntryLink<TypeSpeakerSkeleton>>;
    masterclass?: EntryFieldTypes.Array<EntryFieldTypes.EntryLink<TypeMasterclassSkeleton>>;
}

export type TypeConferencesSkeleton = EntrySkeletonType<TypeConferencesFields, "conferences">;
export type TypeConferences<Modifiers extends ChainModifiers, Locales extends LocaleCode> = Entry<TypeConferencesSkeleton, Modifiers, Locales>;

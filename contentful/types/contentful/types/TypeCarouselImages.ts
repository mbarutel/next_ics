import type { ChainModifiers, Entry, EntryFieldTypes, EntrySkeletonType, LocaleCode } from "contentful";

export interface TypeCarouselImagesFields {
    images?: EntryFieldTypes.Array<EntryFieldTypes.AssetLink>;
    title: EntryFieldTypes.Symbol;
}

export type TypeCarouselImagesSkeleton = EntrySkeletonType<TypeCarouselImagesFields, "carouselImages">;
export type TypeCarouselImages<Modifiers extends ChainModifiers, Locales extends LocaleCode = LocaleCode> = Entry<TypeCarouselImagesSkeleton, Modifiers, Locales>;

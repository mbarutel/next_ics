"use client";

import { DelegateType, SpeakerParticipantType, MasterclassType } from "@/lib/types";
import { IoSettingsOutline } from "react-icons/io5";
import FormLabel from "@/components/form-label";
import FieldGroupLabel from "@/components/field-group-label";

type ParticipantType = DelegateType | SpeakerParticipantType;

interface EventPreferencesSectionProps {
  index: number;
  participant: ParticipantType;
  onFieldChange: (index: number, field: keyof ParticipantType, value: string) => void;
  masterclasses?: MasterclassType[];
  dietOptions?: string[];
}

export default function EventPreferencesSection({
  index,
  participant,
  onFieldChange,
  masterclasses,
  dietOptions = ["normal", "vegan", "vegetarian", "gluten free"],
}: EventPreferencesSectionProps) {
  return (
    <div>
      <FieldGroupLabel icon={<IoSettingsOutline className="icon-sm sm:w-5 sm:h-5" />}>
        <span className="text-white">Event Preferences</span>
      </FieldGroupLabel>
      <div className="grid-cols-responsive">
        <label className="block">
          <FormLabel htmlFor={`participant-${index}-diet`}>
            <span className="text-white">Dietary Requirements</span>
          </FormLabel>
          <select
            id={`participant-${index}-diet`}
            name="diet"
            value={participant.diet}
            onChange={(e) => onFieldChange(index, "diet", e.target.value)}
            className="form-input bg-stone-900 text-white border-stone-600 [&>option]:bg-white [&>option]:text-black"
          >
            {dietOptions.map((option) => (
              <option key={option} value={option}>
                {option.charAt(0).toUpperCase() + option.slice(1)}
              </option>
            ))}
          </select>
        </label>

        <label className="block">
          <FormLabel htmlFor={`participant-${index}-dinner`}>
            <span className="text-white">Gala Dinner Attendance</span>
          </FormLabel>
          <select
            id={`participant-${index}-dinner`}
            name="dinner"
            value={participant.dinner.toString()}
            onChange={(e) => onFieldChange(index, "dinner", e.target.value)}
            className="form-input bg-stone-900 text-white border-stone-600 [&>option]:bg-white [&>option]:text-black"
          >
            <option value="true">Yes, I will attend</option>
            <option value="false">No, I will not attend</option>
          </select>
        </label>

        <label className="block">
          <FormLabel htmlFor={`participant-${index}-masterclass`}>
            <span className="text-white">Masterclass Selection</span>
          </FormLabel>
          <select
            id={`participant-${index}-masterclass`}
            name="masterclass"
            value={participant.masterclass ?? ""}
            onChange={(e) => onFieldChange(index, "masterclass", e.target.value)}
            className="form-input bg-stone-900 text-white border-stone-600 [&>option]:bg-white [&>option]:text-black"
          >
            <option value="">No masterclass</option>
            {masterclasses?.map((mc) => (
              <option key={mc.slug} value={mc.title}>
                {mc.title}
              </option>
            ))}
          </select>
        </label>

        <label className="block">
          <FormLabel htmlFor={`participant-${index}-accommodationNights`}>
            <span className="text-white">Accommodation Nights</span>
          </FormLabel>
          <select
            id={`participant-${index}-accommodationNights`}
            name="accommodationNights"
            value={participant.accommodationNights.toString()}
            onChange={(e) => onFieldChange(index, "accommodationNights", e.target.value)}
            className="form-input bg-stone-900 text-white border-stone-600 [&>option]:bg-white [&>option]:text-black"
          >
            {[0, 1, 2, 3, 4, 5].map((n) => (
              <option key={n} value={n}>
                {n === 0 ? "No accommodation needed" : `${n} night${n > 1 ? "s" : ""}`}
              </option>
            ))}
          </select>
        </label>
      </div>
    </div>
  );
}

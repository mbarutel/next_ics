"use client";

import { SponsorSubmissionType, SponsorPackageTier } from "@/lib/types";
import { SPONSOR_PACKAGES, PRICING } from "@/helpers/data";
import FieldGroupLabel from "@/components/field-group-label";
import ErrorMessage from "@/components/error-message";
import { IoRibbonOutline } from "react-icons/io5";

export default function PackageSelection({
  submission,
  setSubmission,
  errors,
}: {
  submission: SponsorSubmissionType;
  setSubmission: React.Dispatch<React.SetStateAction<SponsorSubmissionType>>;
  errors?: {
    selectedPackage?: string;
  };
}) {
  const handlePackageSelect = (packageTier: SponsorPackageTier) => {
    const selectedPackage = SPONSOR_PACKAGES[packageTier];
    setSubmission((prev) => ({
      ...prev,
      selectedPackage: packageTier,
      packagePrice: selectedPackage.price,
    }));
  };

  const packages: SponsorPackageTier[] = ['gold', 'silver', 'bronze'];

  return (
    <div className="w-full form_section_wrapper">
      <div className="form-section-spacing">
        <FieldGroupLabel icon={<IoRibbonOutline className="icon-sm sm:w-5 sm:h-5" />}>
          <span className="text-white">Sponsorship Packages</span>
        </FieldGroupLabel>

        <div className="mb-6">
          <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
            All sponsors and supporting organizations will be promoted via a range of initiatives reflecting your support for this impactful national conference.
          </p>
        </div>

        {errors?.selectedPackage && (
          <ErrorMessage>{errors.selectedPackage}</ErrorMessage>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {packages.map((tier) => {
            const pkg = SPONSOR_PACKAGES[tier];
            const isSelected = submission.selectedPackage === tier;
            
            // Color-specific styles
            const colorStyles = {
              gold: {
                border: 'border-yellow-500',
                bg: 'bg-yellow-500/10',
                button: 'bg-yellow-600 hover:bg-yellow-700',
                selectedBorder: 'border-yellow-400',
                selectedBg: 'bg-yellow-500/5',
              },
              silver: {
                border: 'border-gray-400',
                bg: 'bg-gray-400/10',
                button: 'bg-gray-600 hover:bg-gray-700',
                selectedBorder: 'border-gray-300',
                selectedBg: 'bg-gray-400/5',
              },
              bronze: {
                border: 'border-amber-600',
                bg: 'bg-amber-600/10',
                button: 'bg-amber-700 hover:bg-amber-800',
                selectedBorder: 'border-amber-500',
                selectedBg: 'bg-amber-600/5',
              },
            };

            const colors = colorStyles[pkg.id as keyof typeof colorStyles];

            return (
              <div
                key={pkg.id}
                className={`
                  rounded-lg border-2 p-6 transition-all duration-200 flex flex-col
                  ${isSelected 
                    ? `${colors.selectedBorder} ${colors.selectedBg}` 
                    : 'border-stone-700 bg-stone-900/50'
                  }
                `}
              >
                {/* Package Header */}
                <div className="text-center mb-4">
                  <div className="text-4xl mb-2">{pkg.badge}</div>
                  <h3 className="text-xl font-bold text-white mb-2">
                    {pkg.name}
                  </h3>
                  <p className="text-3xl font-bold text-white">
                    ${pkg.price.toLocaleString()}
                  </p>
                </div>

                {/* Benefits Section */}
                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-white mb-3 text-center">
                    What&apos;s in it for your organization?
                  </h4>
                  
                  {/* Visual callout for inclusions */}
                  <div className="bg-gradient-to-r from-green-500/10 to-blue-500/10 border border-green-500/30 rounded-lg p-4 mb-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-center gap-2">
                        <span className="text-xl">✓</span>
                        <p className="text-sm font-semibold text-green-300">
                          {pkg.includedRepresentatives} Complimentary Staff Representative{pkg.includedRepresentatives > 1 ? 's' : ''}
                        </p>
                      </div>
                      <div className="flex items-center justify-center gap-2">
                        <span className="text-xl">✓</span>
                        <p className="text-sm font-semibold text-blue-300">
                          {pkg.includedDinners} Complimentary Dinner{pkg.includedDinners > 1 ? 's' : ''}
                        </p>
                      </div>
                      <p className="text-center text-xs text-gray-300 mt-2 pt-2 border-t border-gray-600">
                        Additional representatives: ${PRICING.sponsorRegistration} each<br/>
                        Additional dinners: ${PRICING.dinner} each
                      </p>
                    </div>
                  </div>
                  
                  <ul className="space-y-2">
                    {pkg.benefits.map((benefit, index) => (
                      <li key={index} className="flex items-start text-sm text-gray-300">
                        <span className="text-green-400 mr-2 mt-0.5 flex-shrink-0">✓</span>
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Select Button */}
                <button
                  type="button"
                  onClick={() => handlePackageSelect(tier)}
                  className={`
                    w-full py-3 px-4 rounded-md font-semibold text-white transition-colors mt-auto
                    ${isSelected 
                      ? `${colors.button} ring-2 ring-white ring-offset-2 ring-offset-stone-900` 
                      : 'bg-stone-700 hover:bg-stone-600'
                    }
                  `}
                >
                  {isSelected ? 'Selected' : 'Select Package'}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

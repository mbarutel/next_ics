export const PRICING = {
  dinner: 150,
  masterclass: 350,
  accommodation: 350,
  delegateRegistration: 2500,
  speakerRegistration: 850,
  exhibitorRegistration: 850,
  sponsorRegistration: 850,
};

export const SPONSOR_PACKAGES = {
  gold: {
    id: 'gold' as const,
    name: 'Gold Sponsor',
    price: 10000,
    badge: '🥇',
    color: 'yellow',
    includedRepresentatives: 3,
    includedDinners: 3,
    benefits: [
      'Exposure prior and during the conference',
      'Organization logo on all conference materials and dedicated webpage on conference website',
      'Verbal acknowledgment at all plenary sessions',
      '(1) Reserved spot for keynote session/presentation',
      '(3) Complimentary staff representative registrations (includes conference access, morning tea, lunch and afternoon tea)',
      '(3) Complimentary networking dinner tickets (included with staff representatives)',
      '(2) Trade stall/exhibitor table at conference foyer',
      '(1) Dedicated newsletter highlight distributed to more than 250,000 email mailing lists',
      "Achievement of your organization's RAP deliverables and commitment to reconciliation and fostering corporate social responsibility"
    ]
  },
  silver: {
    id: 'silver' as const,
    name: 'Silver Sponsor',
    price: 7000,
    badge: '🥈',
    color: 'gray',
    includedRepresentatives: 2,
    includedDinners: 2,
    benefits: [
      'Exposure prior and during the conference',
      'Organization logo on all conference materials and dedicated webpage on conference website',
      'Verbal acknowledgment at all plenary sessions',
      '(1) Reserved spot for keynote session/presentation',
      '(2) Complimentary staff representative registrations (includes conference access, morning tea, lunch and afternoon tea)',
      '(2) Complimentary networking dinner tickets (included with staff representatives)',
      '(1) Trade stall at conference foyer',
      '(1) Dedicated newsletter highlight distributed to more than 250,000 email mailing lists',
      "Achievement of your organization's RAP deliverables and commitment to reconciliation and fostering corporate social responsibility"
    ]
  },
  bronze: {
    id: 'bronze' as const,
    name: 'Bronze Sponsor',
    price: 5000,
    badge: '🥉',
    color: 'amber',
    includedRepresentatives: 1,
    includedDinners: 1,
    benefits: [
      'Exposure prior and during the conference',
      'Organization logo on all conference materials and on conference website',
      'Verbal acknowledgment at all plenary sessions',
      '(1) Reserved spot for concurrent session/presentation',
      '(1) Complimentary staff representative registration (includes conference access, morning tea, lunch and afternoon tea)',
      '(1) Complimentary networking dinner ticket (included with staff representative)',
      '(1) Trade stall at conference foyer',
      '(1) Dedicated newsletter highlight distributed to more than 250,000 email mailing lists',
      "Achievement of your organization's RAP deliverables and commitment to reconciliation and fostering corporate social responsibility"
    ]
  }
} as const;

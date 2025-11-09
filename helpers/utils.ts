export type PriceTier = {
  date: string;
  price: number;
};

export function ConferenceDatesConverter({
  startDate,
  endDate,
}: {
  startDate?: Date;
  endDate?: Date;
}): string | null {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  if (!startDate || !endDate) {
    return null;
  }

  const startDay = startDate.getDate();
  const endDay = endDate.getDate();
  const startMonth = months[startDate.getMonth()];
  const endMonth = months[endDate.getMonth()];
  const endYear = endDate.getFullYear();

  return `${startDay} ${startMonth} - ${endDay} ${endMonth}, ${endYear}`;
}

export function generateMidEndMonthPriceTiers(options: {
  walkInDate: Date;
  walkInPrice: number;
  steps: number; // how many discount levels before walk-in
  discountPerStep: number; // fixed or percentage
  isPercentageDiscount?: boolean;
}): PriceTier[] {
  const {
    walkInDate,
    walkInPrice,
    steps,
    discountPerStep,
    isPercentageDiscount = false,
  } = options;

  const cutoffDates: Date[] = [];
  const walkYear = walkInDate.getFullYear();
  const walkMonth = walkInDate.getMonth();

  // Build list of 15th and end-of-month dates before the walk-in date
  for (let m = 0; m < 12 && cutoffDates.length < steps; m++) {
    const date = new Date(walkYear, walkMonth - m, 1);
    const mid = new Date(date.getFullYear(), date.getMonth(), 15);
    const end = new Date(date.getFullYear(), date.getMonth() + 1, 0); // last day of the month

    // Insert in descending order (latest first)
    [end, mid].forEach((d) => {
      if (d < walkInDate && cutoffDates.length < steps) {
        cutoffDates.push(d);
      }
    });
  }

  // Sort dates ascending for pricing
  const sortedDates = cutoffDates.sort((a, b) => a.getTime() - b.getTime());

  const tiers: PriceTier[] = [];

  sortedDates.forEach((date, i) => {
    let price: number;

    if (isPercentageDiscount) {
      const discountFactor = 1 - (discountPerStep * (steps - i)) / 100;
      price = Math.round(walkInPrice * discountFactor);
    } else {
      price = walkInPrice - discountPerStep * (steps - i);
    }

    price = Math.max(price, 0);

    tiers.push({
      date: date.toISOString().split("T")[0],
      price,
    });
  });

  // Add walk-in as final tier
  tiers.push({
    date: walkInDate.toISOString().split("T")[0],
    price: walkInPrice,
  });

  return tiers;
}

/**
 * Finds the current applicable price tier based on today's date.
 * Returns the first tier whose date is >= today (i.e., not expired).
 * If all tiers are expired, returns the last tier (walk-in price).
 */
export function getCurrentPriceTier(tiers: PriceTier[]): PriceTier | null {
  if (tiers.length === 0) return null;

  const dateNow = new Date();

  // Find the first non-expired tier (first tier where today <= tier.date)
  const currentTier = tiers.find((tier) => dateNow <= new Date(tier.date));

  // If all tiers are expired, return the last tier (walk-in price)
  return currentTier || tiers[tiers.length - 1];
}

/**
 * Integration Tests for Price Calculations
 * Tests various delegate combinations and their price calculations
 */

import { ConferenceType, FormValuesType, DelegateType } from "@/lib/types";
import { registrationObjectApiParser } from "@/lib/utils";

const mockConference: ConferenceType = {
  slug: "price-test",
  title: "Price Test Conference",
  venue: "Test Venue",
  date: {
    startDate: new Date("2025-07-01"),
    endDate: new Date("2025-07-03"),
  },
  formLink: "/registration/price-test",
  invoiceRef: "PTC2025",
  events: [],
  agenda: [],
  coverImage: { src: "/test.jpg", alt: "Test" },
  speakers: [],
  prices: {
    base: [
      { price: 1000, dueDate: new Date("2025-06-01") },
      { price: 1200, dueDate: new Date("2025-06-15") },
    ],
    dinner: 100,
    walkIn: 1500,
    masterclass: 300,
  },
  masterclass: [],
  submitPaperLink: undefined,
  sponsors: [],
};

describe("Price Calculation Integration Tests", () => {
  describe("Basic Price Calculations", () => {
    test("should calculate price for single delegate with no extras", () => {
      const formValues: FormValuesType = {
        name: "",
        company: "",
        position: "",
        phone: "",
        email: "",
        address: undefined,
        events: [],
        extraParticipants: [],
        price: { priceChoice: 1000, dueDate: new Date("2025-06-01") },
        dinnerParticipants: [],
        masterclass: "no",
        accomodation: 0,
        discount: "",
        referral: "",
        agreement: true,
        delegates: [
          {
            firstName: "Solo",
            lastName: "Attendee",
            jobTitle: "Individual",
            organization: "Self",
            email: "solo@test.com",
            phone: "1111111111",
            diet: "normal",
            dinner: false,
            masterclass: null,
            accommodationNights: 0,
          },
        ],
      };

      const result = registrationObjectApiParser({
        values: formValues,
        conference: mockConference,
      });

      expect(result.total).toBe(1000);
      expect(result.dinnerPrice).toBe(0);
      expect(result.masterclassPrice).toBe(0);
    });

    test("should calculate price for single delegate with all extras", () => {
      const formValues: FormValuesType = {
        name: "",
        company: "",
        position: "",
        phone: "",
        email: "",
        address: undefined,
        events: [],
        extraParticipants: [],
        price: { priceChoice: 1000, dueDate: new Date("2025-06-01") },
        dinnerParticipants: [],
        masterclass: "no",
        accomodation: 0,
        discount: "",
        referral: "",
        agreement: true,
        delegates: [
          {
            firstName: "Full",
            lastName: "Package",
            jobTitle: "Manager",
            organization: "Company",
            email: "full@test.com",
            phone: "2222222222",
            diet: "normal",
            dinner: true,
            masterclass: "Test MC",
            accommodationNights: 3,
          },
        ],
      };

      const result = registrationObjectApiParser({
        values: formValues,
        conference: mockConference,
      });

      // Registration: 1000 + Dinner: 100 + Masterclass: 300 = 1400
      expect(result.total).toBe(1400);
      expect(result.dinnerPrice).toBe(100);
      expect(result.masterclassPrice).toBe(300);
      expect(result.accomodation).toBe(3);
    });
  });

  describe("Multiple Delegate Price Combinations", () => {
    test("should calculate for 2 delegates: both attending dinner, one masterclass", () => {
      const formValues: FormValuesType = {
        name: "",
        company: "",
        position: "",
        phone: "",
        email: "",
        address: undefined,
        events: [],
        extraParticipants: [],
        price: { priceChoice: 1000, dueDate: new Date("2025-06-01") },
        dinnerParticipants: [],
        masterclass: "no",
        accomodation: 0,
        discount: "",
        referral: "",
        agreement: true,
        delegates: [
          {
            firstName: "First",
            lastName: "Delegate",
            jobTitle: "Manager",
            organization: "Corp",
            email: "first@test.com",
            phone: "1111111111",
            diet: "normal",
            dinner: true,
            masterclass: "Test MC",
            accommodationNights: 2,
          },
          {
            firstName: "Second",
            lastName: "Delegate",
            jobTitle: "Developer",
            organization: "Corp",
            email: "second@test.com",
            phone: "2222222222",
            diet: "vegan",
            dinner: true,
            masterclass: null,
            accommodationNights: 2,
          },
        ],
      };

      const result = registrationObjectApiParser({
        values: formValues,
        conference: mockConference,
      });

      // Registration: 2×1000 = 2000
      // Dinner: 2×100 = 200
      // Masterclass: 1×300 = 300
      // Total = 2500
      expect(result.total).toBe(2500);
      expect(result.dinnerPrice).toBe(200);
      expect(result.masterclassPrice).toBe(300);
      expect(result.accomodation).toBe(4);
    });

    test("should calculate for 3 delegates with different tier pricing", () => {
      const formValues: FormValuesType = {
        name: "",
        company: "",
        position: "",
        phone: "",
        email: "",
        address: undefined,
        events: [],
        extraParticipants: [],
        price: { priceChoice: 1200, dueDate: new Date("2025-06-15") }, // Later tier
        dinnerParticipants: [],
        masterclass: "no",
        accomodation: 0,
        discount: "",
        referral: "",
        agreement: true,
        delegates: [
          {
            firstName: "D1",
            lastName: "Late",
            jobTitle: "Role1",
            organization: "LateReg Inc",
            email: "d1@test.com",
            phone: "1111111111",
            diet: "normal",
            dinner: false,
            masterclass: "Test MC",
            accommodationNights: 0,
          },
          {
            firstName: "D2",
            lastName: "Late",
            jobTitle: "Role2",
            organization: "LateReg Inc",
            email: "d2@test.com",
            phone: "2222222222",
            diet: "vegetarian",
            dinner: true,
            masterclass: "Test MC",
            accommodationNights: 1,
          },
          {
            firstName: "D3",
            lastName: "Late",
            jobTitle: "Role3",
            organization: "LateReg Inc",
            email: "d3@test.com",
            phone: "3333333333",
            diet: "gluten free",
            dinner: true,
            masterclass: null,
            accommodationNights: 1,
          },
        ],
      };

      const result = registrationObjectApiParser({
        values: formValues,
        conference: mockConference,
      });

      // Registration: 3×1200 = 3600
      // Dinner: 2×100 = 200
      // Masterclass: 2×300 = 600
      // Total = 4400
      expect(result.total).toBe(4400);
      expect(result.dinnerPrice).toBe(200);
      expect(result.masterclassPrice).toBe(600);
      expect(result.accomodation).toBe(2);
    });

    test("should calculate for 4 delegates: all different dietary needs, mixed attendance", () => {
      const formValues: FormValuesType = {
        name: "",
        company: "",
        position: "",
        phone: "",
        email: "",
        address: undefined,
        events: [],
        extraParticipants: [],
        price: { priceChoice: 1000, dueDate: new Date("2025-06-01") },
        dinnerParticipants: [],
        masterclass: "no",
        accomodation: 0,
        discount: "",
        referral: "",
        agreement: true,
        delegates: [
          {
            firstName: "Normal",
            lastName: "Diet",
            jobTitle: "Person1",
            organization: "Team",
            email: "normal@test.com",
            phone: "1111111111",
            diet: "normal",
            dinner: true,
            masterclass: "Test MC",
            accommodationNights: 5,
          },
          {
            firstName: "Vegan",
            lastName: "Diet",
            jobTitle: "Person2",
            organization: "Team",
            email: "vegan@test.com",
            phone: "2222222222",
            diet: "vegan",
            dinner: true,
            masterclass: "Test MC",
            accommodationNights: 3,
          },
          {
            firstName: "Vegetarian",
            lastName: "Diet",
            jobTitle: "Person3",
            organization: "Team",
            email: "vegetarian@test.com",
            phone: "3333333333",
            diet: "vegetarian",
            dinner: false,
            masterclass: null,
            accommodationNights: 0,
          },
          {
            firstName: "Gluten",
            lastName: "Free",
            jobTitle: "Person4",
            organization: "Team",
            email: "gluten@test.com",
            phone: "4444444444",
            diet: "gluten free",
            dinner: true,
            masterclass: null,
            accommodationNights: 2,
          },
        ],
      };

      const result = registrationObjectApiParser({
        values: formValues,
        conference: mockConference,
      });

      // Registration: 4×1000 = 4000
      // Dinner: 3×100 = 300 (Normal, Vegan, Gluten Free)
      // Masterclass: 2×300 = 600 (Normal, Vegan)
      // Total = 4900
      expect(result.total).toBe(4900);
      expect(result.dinnerPrice).toBe(300);
      expect(result.masterclassPrice).toBe(600);
      expect(result.accomodation).toBe(10); // 5+3+0+2
    });
  });

  describe("Walk-in Price Calculations", () => {
    test("should calculate walk-in price for single delegate", () => {
      const formValues: FormValuesType = {
        name: "",
        company: "",
        position: "",
        phone: "",
        email: "",
        address: undefined,
        events: [],
        extraParticipants: [],
        price: { priceChoice: 1500, dueDate: new Date("2025-07-01") }, // Walk-in price
        dinnerParticipants: [],
        masterclass: "no",
        accomodation: 0,
        discount: "",
        referral: "",
        agreement: true,
        delegates: [
          {
            firstName: "Walk",
            lastName: "In",
            jobTitle: "LastMinute",
            organization: "Urgent Corp",
            email: "walkin@test.com",
            phone: "9999999999",
            diet: "normal",
            dinner: true,
            masterclass: "Test MC",
            accommodationNights: 1,
          },
        ],
      };

      const result = registrationObjectApiParser({
        values: formValues,
        conference: mockConference,
      });

      // Registration: 1500 + Dinner: 100 + Masterclass: 300 = 1900
      expect(result.total).toBe(1900);
    });
  });

  describe("Large Group Calculations", () => {
    test("should calculate for 10 delegates with varied options", () => {
      const delegates: DelegateType[] = Array.from({ length: 10 }, (_, i) => ({
        firstName: `Delegate${i + 1}`,
        lastName: `Last${i + 1}`,
        jobTitle: `Role${i + 1}`,
        organization: "Large Group Inc",
        email: `delegate${i + 1}@test.com`,
        phone: `${1000000000 + i}`,
        diet: ["normal", "vegan", "vegetarian", "gluten free"][i % 4],
        dinner: i % 2 === 0, // 5 attending dinner
        masterclass: i % 3 === 0 ? "Test MC" : null, // 4 attending masterclass (0,3,6,9)
        accommodationNights: i % 5, // 0,1,2,3,4,0,1,2,3,4
      }));

      const formValues: FormValuesType = {
        name: "",
        company: "",
        position: "",
        phone: "",
        email: "",
        address: undefined,
        events: [],
        extraParticipants: [],
        price: { priceChoice: 1000, dueDate: new Date("2025-06-01") },
        dinnerParticipants: [],
        masterclass: "no",
        accomodation: 0,
        discount: "",
        referral: "",
        agreement: true,
        delegates,
      };

      const result = registrationObjectApiParser({
        values: formValues,
        conference: mockConference,
      });

      // Registration: 10×1000 = 10000
      // Dinner: 5×100 = 500
      // Masterclass: 4×300 = 1200
      // Total = 11700
      expect(result.total).toBe(11700);
      expect(result.dinnerPrice).toBe(500);
      expect(result.masterclassPrice).toBe(1200);

      // Accommodation: 0+1+2+3+4+0+1+2+3+4 = 20
      expect(result.accomodation).toBe(20);
    });
  });

  describe("Special Scenarios", () => {
    test("should handle all delegates declining all extras", () => {
      const formValues: FormValuesType = {
        name: "",
        company: "",
        position: "",
        phone: "",
        email: "",
        address: undefined,
        events: [],
        extraParticipants: [],
        price: { priceChoice: 1000, dueDate: new Date("2025-06-01") },
        dinnerParticipants: [],
        masterclass: "no",
        accomodation: 0,
        discount: "",
        referral: "",
        agreement: true,
        delegates: [
          {
            firstName: "Minimal",
            lastName: "One",
            jobTitle: "Basic",
            organization: "Min Corp",
            email: "min1@test.com",
            phone: "1111111111",
            diet: "normal",
            dinner: false,
            masterclass: null,
            accommodationNights: 0,
          },
          {
            firstName: "Minimal",
            lastName: "Two",
            jobTitle: "Basic",
            organization: "Min Corp",
            email: "min2@test.com",
            phone: "2222222222",
            diet: "normal",
            dinner: false,
            masterclass: null,
            accommodationNights: 0,
          },
        ],
      };

      const result = registrationObjectApiParser({
        values: formValues,
        conference: mockConference,
      });

      // Only registration fees
      expect(result.total).toBe(2000);
      expect(result.dinnerPrice).toBe(0);
      expect(result.masterclassPrice).toBe(0);
      expect(result.accomodation).toBe(0);
    });

    test("should handle all delegates accepting all extras", () => {
      const formValues: FormValuesType = {
        name: "",
        company: "",
        position: "",
        phone: "",
        email: "",
        address: undefined,
        events: [],
        extraParticipants: [],
        price: { priceChoice: 1000, dueDate: new Date("2025-06-01") },
        dinnerParticipants: [],
        masterclass: "no",
        accomodation: 0,
        discount: "",
        referral: "",
        agreement: true,
        delegates: [
          {
            firstName: "Maximum",
            lastName: "One",
            jobTitle: "VIP",
            organization: "Max Corp",
            email: "max1@test.com",
            phone: "1111111111",
            diet: "normal",
            dinner: true,
            masterclass: "Test MC",
            accommodationNights: 5,
          },
          {
            firstName: "Maximum",
            lastName: "Two",
            jobTitle: "VIP",
            organization: "Max Corp",
            email: "max2@test.com",
            phone: "2222222222",
            diet: "vegan",
            dinner: true,
            masterclass: "Test MC",
            accommodationNights: 5,
          },
          {
            firstName: "Maximum",
            lastName: "Three",
            jobTitle: "VIP",
            organization: "Max Corp",
            email: "max3@test.com",
            phone: "3333333333",
            diet: "vegetarian",
            dinner: true,
            masterclass: "Test MC",
            accommodationNights: 5,
          },
        ],
      };

      const result = registrationObjectApiParser({
        values: formValues,
        conference: mockConference,
      });

      // Registration: 3×1000 = 3000
      // Dinner: 3×100 = 300
      // Masterclass: 3×300 = 900
      // Total = 4200
      expect(result.total).toBe(4200);
      expect(result.dinnerPrice).toBe(300);
      expect(result.masterclassPrice).toBe(900);
      expect(result.accomodation).toBe(15);
    });
  });
});

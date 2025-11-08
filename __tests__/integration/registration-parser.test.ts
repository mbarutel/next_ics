/**
 * Integration Tests for Registration Object Parser
 * Tests the conversion of form values to registration objects with new delegate structure
 */

import { registrationObjectApiParser } from "@/lib/utils";
import { FormValuesType, ConferenceType, DelegateType } from "@/lib/types";

// Mock conference data
const mockConference: ConferenceType = {
  slug: "test-conference",
  title: "Test Conference 2025",
  venue: "Test Venue",
  date: {
    startDate: new Date("2025-06-01"),
    endDate: new Date("2025-06-03"),
  },
  formLink: "/registration/test",
  invoiceRef: "TC2025",
  events: [],
  agenda: [],
  coverImage: { src: "/test.jpg", alt: "Test" },
  speakers: [],
  prices: {
    base: [
      { price: 1200, dueDate: new Date("2025-05-01") },
      { price: 1400, dueDate: new Date("2025-05-15") },
    ],
    dinner: 150,
    walkIn: 1600,
    masterclass: 350,
  },
  masterclass: [
    { title: "Test Masterclass", slug: "test-mc", description: {} as any, asset: undefined },
  ],
  submitPaperLink: undefined,
  sponsors: [],
};

describe("registrationObjectApiParser - Integration Tests", () => {
  describe("Single Delegate Submission", () => {
    test("should correctly parse single delegate with all options", () => {
      const formValues: FormValuesType = {
        name: "John Doe",
        company: "Test Company",
        position: "Manager",
        phone: "1234567890",
        email: "john@test.com",
        address: "123 Test St",
        events: ["Event 1", "Event 2"],
        extraParticipants: [],
        price: { priceChoice: 1200, dueDate: new Date("2025-05-01") },
        dinnerParticipants: [],
        masterclass: "no",
        accomodation: 0,
        discount: "",
        referral: "Google",
        agreement: true,
        delegates: [
          {
            firstName: "John",
            lastName: "Doe",
            jobTitle: "Manager",
            organization: "Test Company",
            email: "john@test.com",
            phone: "1234567890",
            diet: "normal",
            dinner: true,
            masterclass: "Test Masterclass",
            accommodationNights: 2,
          },
        ],
      };

      const result = registrationObjectApiParser({
        values: formValues,
        conference: mockConference,
      });

      // Verify delegate-based calculation
      expect(result.delegates).toHaveLength(1);
      expect(result.mainParticipant.name).toBe("John Doe");
      expect(result.mainParticipant.email).toBe("john@test.com");

      // Verify price calculations
      expect(result.total).toBe(1200 + 150 + 350); // Registration + Dinner + Masterclass
      expect(result.dinnerPrice).toBe(150);
      expect(result.masterclassPrice).toBe(350);
      expect(result.accomodation).toBe(2);
    });

    test("should handle delegate without optional items", () => {
      const formValues: FormValuesType = {
        name: "",
        company: "Test Company",
        position: "",
        phone: "",
        email: "",
        address: undefined,
        events: ["Event 1"],
        extraParticipants: [],
        price: { priceChoice: 1200, dueDate: new Date("2025-05-01") },
        dinnerParticipants: [],
        masterclass: "no",
        accomodation: 0,
        discount: "",
        referral: "Google",
        agreement: true,
        delegates: [
          {
            firstName: "Jane",
            lastName: "Smith",
            jobTitle: "Developer",
            organization: "Tech Corp",
            email: "jane@test.com",
            phone: "9876543210",
            diet: "vegan",
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

      expect(result.total).toBe(1200); // Only registration fee
      expect(result.dinnerPrice).toBe(0);
      expect(result.masterclassPrice).toBe(0);
      expect(result.accomodation).toBe(0);
      expect(result.address).toBe("");
    });
  });

  describe("Multiple Delegates Submission", () => {
    test("should correctly parse multiple delegates with mixed options", () => {
      const formValues: FormValuesType = {
        name: "",
        company: "",
        position: "",
        phone: "",
        email: "",
        address: undefined,
        events: ["Event 1"],
        extraParticipants: [],
        price: { priceChoice: 1200, dueDate: new Date("2025-05-01") },
        dinnerParticipants: [],
        masterclass: "no",
        accomodation: 0,
        discount: "EARLY10",
        referral: "Friend",
        agreement: true,
        delegates: [
          {
            firstName: "Alice",
            lastName: "Johnson",
            jobTitle: "CEO",
            organization: "Big Corp",
            email: "alice@bigcorp.com",
            phone: "1111111111",
            diet: "normal",
            dinner: true,
            masterclass: "Test Masterclass",
            accommodationNights: 3,
          },
          {
            firstName: "Bob",
            lastName: "Williams",
            jobTitle: "CTO",
            organization: "Big Corp",
            email: "bob@bigcorp.com",
            phone: "2222222222",
            diet: "vegetarian",
            dinner: true,
            masterclass: null,
            accommodationNights: 3,
          },
          {
            firstName: "Carol",
            lastName: "Davis",
            jobTitle: "Developer",
            organization: "Big Corp",
            email: "carol@bigcorp.com",
            phone: "3333333333",
            diet: "gluten free",
            dinner: false,
            masterclass: "Test Masterclass",
            accommodationNights: 0,
          },
        ],
      };

      const result = registrationObjectApiParser({
        values: formValues,
        conference: mockConference,
      });

      // Verify 3 delegates
      expect(result.delegates).toHaveLength(3);

      // Verify price calculations
      // 3 delegates × $1200 = $3600
      // 2 dinners × $150 = $300
      // 2 masterclasses × $350 = $700
      // Total = $4600
      expect(result.total).toBe(3600 + 300 + 700);
      expect(result.dinnerPrice).toBe(300);
      expect(result.masterclassPrice).toBe(700);
      expect(result.accomodation).toBe(6); // 3 + 3 + 0

      // Verify discount is preserved
      expect(result.discount).toBe("EARLY10");

      // Verify main participant is first delegate
      expect(result.mainParticipant.name).toBe("Alice Johnson");
      expect(result.mainParticipant.email).toBe("alice@bigcorp.com");
    });

    test("should handle 5 delegates with all different preferences", () => {
      const delegates: DelegateType[] = [
        {
          firstName: "Delegate",
          lastName: "One",
          jobTitle: "Role 1",
          organization: "Org A",
          email: "d1@test.com",
          phone: "1111111111",
          diet: "normal",
          dinner: true,
          masterclass: "Test Masterclass",
          accommodationNights: 1,
        },
        {
          firstName: "Delegate",
          lastName: "Two",
          jobTitle: "Role 2",
          organization: "Org A",
          email: "d2@test.com",
          phone: "2222222222",
          diet: "vegan",
          dinner: true,
          masterclass: "Test Masterclass",
          accommodationNights: 2,
        },
        {
          firstName: "Delegate",
          lastName: "Three",
          jobTitle: "Role 3",
          organization: "Org A",
          email: "d3@test.com",
          phone: "3333333333",
          diet: "vegetarian",
          dinner: true,
          masterclass: null,
          accommodationNights: 3,
        },
        {
          firstName: "Delegate",
          lastName: "Four",
          jobTitle: "Role 4",
          organization: "Org A",
          email: "d4@test.com",
          phone: "4444444444",
          diet: "gluten free",
          dinner: false,
          masterclass: "Test Masterclass",
          accommodationNights: 0,
        },
        {
          firstName: "Delegate",
          lastName: "Five",
          jobTitle: "Role 5",
          organization: "Org A",
          email: "d5@test.com",
          phone: "5555555555",
          diet: "normal",
          dinner: false,
          masterclass: null,
          accommodationNights: 5,
        },
      ];

      const formValues: FormValuesType = {
        name: "",
        company: "",
        position: "",
        phone: "",
        email: "",
        address: undefined,
        events: ["Event 1"],
        extraParticipants: [],
        price: { priceChoice: 1400, dueDate: new Date("2025-05-15") },
        dinnerParticipants: [],
        masterclass: "no",
        accomodation: 0,
        discount: "",
        referral: "Conference",
        agreement: true,
        delegates,
      };

      const result = registrationObjectApiParser({
        values: formValues,
        conference: mockConference,
      });

      // 5 delegates × $1400 = $7000
      // 3 dinners × $150 = $450
      // 3 masterclasses × $350 = $1050
      // Total = $8500
      expect(result.total).toBe(7000 + 450 + 1050);
      expect(result.dinnerPrice).toBe(450);
      expect(result.masterclassPrice).toBe(1050);
      expect(result.accomodation).toBe(11); // 1+2+3+0+5
    });
  });

  describe("Backward Compatibility with Old Structure", () => {
    test("should handle old form structure without delegates array", () => {
      const formValues: FormValuesType = {
        name: "Old User",
        company: "Old Company",
        position: "Old Position",
        phone: "1234567890",
        email: "old@test.com",
        address: "123 Old St",
        events: ["Event 1"],
        extraParticipants: [
          { name: "Extra 1", email: "extra1@test.com", position: "Position 1" },
        ] as any,
        price: { priceChoice: 1200, dueDate: new Date("2025-05-01") },
        dinnerParticipants: [
          { name: "Old User", diet: "normal" },
        ] as any,
        masterclass: "Test Masterclass",
        accomodation: 2,
        discount: "",
        referral: "Google",
        agreement: true,
        delegates: [], // Empty delegates array
      };

      const result = registrationObjectApiParser({
        values: formValues,
        conference: mockConference,
      });

      // Should use old structure calculations
      expect(result.mainParticipant.name).toBe("Old User");
      expect(result.total).toBe(1200 * 2 + 150 + 350); // 2 participants, 1 dinner, 1 masterclass
    });
  });

  describe("Edge Cases", () => {
    test("should handle empty discount code", () => {
      const formValues: FormValuesType = {
        name: "",
        company: "",
        position: "",
        phone: "",
        email: "",
        address: undefined,
        events: ["Event 1"],
        extraParticipants: [],
        price: { priceChoice: 1200, dueDate: new Date("2025-05-01") },
        dinnerParticipants: [],
        masterclass: "no",
        accomodation: 0,
        discount: "",
        referral: "Google",
        agreement: true,
        delegates: [
          {
            firstName: "Test",
            lastName: "User",
            jobTitle: "Tester",
            organization: "Test Org",
            email: "test@test.com",
            phone: "1234567890",
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

      expect(result.discount).toBe("");
    });

    test("should handle maximum accommodation nights", () => {
      const formValues: FormValuesType = {
        name: "",
        company: "",
        position: "",
        phone: "",
        email: "",
        address: undefined,
        events: ["Event 1"],
        extraParticipants: [],
        price: { priceChoice: 1200, dueDate: new Date("2025-05-01") },
        dinnerParticipants: [],
        masterclass: "no",
        accomodation: 0,
        discount: "",
        referral: "Google",
        agreement: true,
        delegates: [
          {
            firstName: "Test",
            lastName: "User",
            jobTitle: "Tester",
            organization: "Test Org",
            email: "test@test.com",
            phone: "1234567890",
            diet: "normal",
            dinner: false,
            masterclass: null,
            accommodationNights: 5,
          },
        ],
      };

      const result = registrationObjectApiParser({
        values: formValues,
        conference: mockConference,
      });

      expect(result.accomodation).toBe(5);
    });
  });
});

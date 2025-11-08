/**
 * Integration Tests for Xero Integration
 * Tests the Xero line item generation with new delegate structure
 */

import { generateLineItems } from "@/lib/xero-utils";
import { RegistrationType, DelegateType } from "@/lib/types";

describe("Xero Integration Tests", () => {
  describe("Line Items Generation with Delegates", () => {
    test("should generate correct line items for single delegate with all options", () => {
      const registration: RegistrationType = {
        reference: "TEST-001",
        conference: "Test Conference",
        events: "Event 1\nEvent 2",
        address: "123 Test St",
        company: "Test Company",
        discount: "",
        referral: "Google",
        priceValue: 1200,
        priceDueDate: new Date("2025-06-01"),
        masterclass: "Test Masterclass",
        accomodation: 2,
        mainParticipant: {
          name: "John Doe",
          email: "john@test.com",
          position: "Manager",
          phone: "1234567890",
        },
        dinnerParticipants: "John Doe | normal",
        extraParticipants: "",
        agreement: true,
        dinnerPrice: 150,
        masterclassPrice: 350,
        total: 1700,
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

      const lineItems = generateLineItems({ body: registration });

      // Should have 3 items: Registration, Dinner, Masterclass
      expect(lineItems).toHaveLength(3);

      // Registration fee
      expect(lineItems[0]).toMatchObject({
        taxType: "OUTPUT",
        accountCode: "200",
        description: "Registration Fee",
        quantity: 1,
        unitAmount: 1200,
      });

      // Dinner
      expect(lineItems[1]).toMatchObject({
        taxType: "OUTPUT",
        accountCode: "200",
        description: "Conference Networking Dinner",
        quantity: 1,
        unitAmount: 150,
      });

      // Masterclass
      expect(lineItems[2]).toMatchObject({
        taxType: "OUTPUT",
        accountCode: "200",
        description: "Post-Conference Masterclass",
        quantity: 1,
        unitAmount: 350,
      });
    });

    test("should generate correct line items for multiple delegates", () => {
      const registration: RegistrationType = {
        reference: "TEST-002",
        conference: "Test Conference",
        events: "Event 1",
        address: "",
        company: "Big Corp",
        discount: "",
        referral: "Friend",
        priceValue: 1200,
        priceDueDate: new Date("2025-06-01"),
        masterclass: "Test Masterclass",
        accomodation: 6,
        mainParticipant: {
          name: "Alice Johnson",
          email: "alice@bigcorp.com",
          position: "CEO",
          phone: "1111111111",
        },
        dinnerParticipants: "Alice Johnson | normal\nBob Williams | vegetarian",
        extraParticipants: "1. Alice Johnson | alice@bigcorp.com | CEO at Big Corp\n2. Bob Williams | bob@bigcorp.com | CTO at Big Corp\n3. Carol Davis | carol@bigcorp.com | Developer at Big Corp",
        agreement: true,
        dinnerPrice: 300, // 2 dinners × 150
        masterclassPrice: 700, // 2 masterclasses × 350
        total: 4600, // 3×1200 + 300 + 700
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

      const lineItems = generateLineItems({ body: registration });

      expect(lineItems).toHaveLength(3);

      // Registration for 3 delegates
      expect(lineItems[0]).toMatchObject({
        description: "Registration Fee",
        quantity: 3,
        unitAmount: 1200,
      });

      // Dinner for 2 delegates
      expect(lineItems[1]).toMatchObject({
        description: "Conference Networking Dinner",
        quantity: 2,
        unitAmount: 150,
      });

      // Masterclass for 2 delegates
      expect(lineItems[2]).toMatchObject({
        description: "Post-Conference Masterclass",
        quantity: 2,
        unitAmount: 350,
      });
    });

    test("should generate line items with discount code", () => {
      const registration: RegistrationType = {
        reference: "TEST-003",
        conference: "Test Conference",
        events: "Event 1",
        address: "",
        company: "Discount Corp",
        discount: "EARLY10",
        referral: "Email",
        priceValue: 1000,
        priceDueDate: new Date("2025-05-01"),
        masterclass: "no",
        accomodation: 0,
        mainParticipant: {
          name: "Early Bird",
          email: "early@test.com",
          position: "Saver",
          phone: "9999999999",
        },
        dinnerParticipants: "",
        extraParticipants: "",
        agreement: true,
        dinnerPrice: 0,
        masterclassPrice: 0,
        total: 1000,
        delegates: [
          {
            firstName: "Early",
            lastName: "Bird",
            jobTitle: "Saver",
            organization: "Discount Corp",
            email: "early@test.com",
            phone: "9999999999",
            diet: "normal",
            dinner: false,
            masterclass: null,
            accommodationNights: 0,
          },
        ],
      };

      const lineItems = generateLineItems({ body: registration });

      // Should have 2 items: Registration and Discount marker
      expect(lineItems).toHaveLength(2);

      expect(lineItems[0]).toMatchObject({
        description: "Registration Fee",
        quantity: 1,
        unitAmount: 1000,
      });

      expect(lineItems[1]).toMatchObject({
        description: "Discount Code: EARLY10",
        unitAmount: 0,
      });
    });

    test("should handle delegates with only dinner (no masterclass)", () => {
      const registration: RegistrationType = {
        reference: "TEST-004",
        conference: "Test Conference",
        events: "Event 1",
        address: "",
        company: "Dinner Only",
        discount: "",
        referral: "Friend",
        priceValue: 1200,
        priceDueDate: new Date("2025-06-01"),
        masterclass: "no",
        accomodation: 0,
        mainParticipant: {
          name: "Dinner Fan",
          email: "dinner@test.com",
          position: "Foodie",
          phone: "8888888888",
        },
        dinnerParticipants: "Dinner Fan | vegan",
        extraParticipants: "",
        agreement: true,
        dinnerPrice: 150,
        masterclassPrice: 0,
        total: 1350,
        delegates: [
          {
            firstName: "Dinner",
            lastName: "Fan",
            jobTitle: "Foodie",
            organization: "Dinner Only",
            email: "dinner@test.com",
            phone: "8888888888",
            diet: "vegan",
            dinner: true,
            masterclass: null,
            accommodationNights: 0,
          },
        ],
      };

      const lineItems = generateLineItems({ body: registration });

      // Should have 2 items: Registration and Dinner (no Masterclass)
      expect(lineItems).toHaveLength(2);

      expect(lineItems[0].description).toBe("Registration Fee");
      expect(lineItems[1].description).toBe("Conference Networking Dinner");
    });

    test("should handle delegates with only masterclass (no dinner)", () => {
      const registration: RegistrationType = {
        reference: "TEST-005",
        conference: "Test Conference",
        events: "Event 1",
        address: "",
        company: "Learning Corp",
        discount: "",
        referral: "Website",
        priceValue: 1200,
        priceDueDate: new Date("2025-06-01"),
        masterclass: "Advanced Topics",
        accomodation: 0,
        mainParticipant: {
          name: "Learner",
          email: "learn@test.com",
          position: "Student",
          phone: "7777777777",
        },
        dinnerParticipants: "",
        extraParticipants: "",
        agreement: true,
        dinnerPrice: 0,
        masterclassPrice: 350,
        total: 1550,
        delegates: [
          {
            firstName: "Learner",
            lastName: "One",
            jobTitle: "Student",
            organization: "Learning Corp",
            email: "learn@test.com",
            phone: "7777777777",
            diet: "normal",
            dinner: false,
            masterclass: "Advanced Topics",
            accommodationNights: 0,
          },
        ],
      };

      const lineItems = generateLineItems({ body: registration });

      // Should have 2 items: Registration and Masterclass (no Dinner)
      expect(lineItems).toHaveLength(2);

      expect(lineItems[0].description).toBe("Registration Fee");
      expect(lineItems[1].description).toBe("Post-Conference Masterclass");
    });

    test("should handle 5 delegates with mixed options", () => {
      const delegates: DelegateType[] = [
        {
          firstName: "D1",
          lastName: "One",
          jobTitle: "Role1",
          organization: "Team Corp",
          email: "d1@test.com",
          phone: "1111111111",
          diet: "normal",
          dinner: true,
          masterclass: "Test MC",
          accommodationNights: 2,
        },
        {
          firstName: "D2",
          lastName: "Two",
          jobTitle: "Role2",
          organization: "Team Corp",
          email: "d2@test.com",
          phone: "2222222222",
          diet: "vegan",
          dinner: true,
          masterclass: "Test MC",
          accommodationNights: 2,
        },
        {
          firstName: "D3",
          lastName: "Three",
          jobTitle: "Role3",
          organization: "Team Corp",
          email: "d3@test.com",
          phone: "3333333333",
          diet: "vegetarian",
          dinner: true,
          masterclass: null,
          accommodationNights: 0,
        },
        {
          firstName: "D4",
          lastName: "Four",
          jobTitle: "Role4",
          organization: "Team Corp",
          email: "d4@test.com",
          phone: "4444444444",
          diet: "gluten free",
          dinner: false,
          masterclass: "Test MC",
          accommodationNights: 1,
        },
        {
          firstName: "D5",
          lastName: "Five",
          jobTitle: "Role5",
          organization: "Team Corp",
          email: "d5@test.com",
          phone: "5555555555",
          diet: "normal",
          dinner: false,
          masterclass: null,
          accommodationNights: 0,
        },
      ];

      const registration: RegistrationType = {
        reference: "TEST-006",
        conference: "Test Conference",
        events: "Event 1",
        address: "",
        company: "Team Corp",
        discount: "",
        referral: "Conference",
        priceValue: 1200,
        priceDueDate: new Date("2025-06-01"),
        masterclass: "Test MC",
        accomodation: 5, // 2+2+0+1+0
        mainParticipant: {
          name: "D1 One",
          email: "d1@test.com",
          position: "Role1",
          phone: "1111111111",
        },
        dinnerParticipants: "D1 One | normal\nD2 Two | vegan\nD3 Three | vegetarian",
        extraParticipants: "All delegates info...",
        agreement: true,
        dinnerPrice: 450, // 3 dinners × 150
        masterclassPrice: 1050, // 3 masterclasses × 350
        total: 7500, // 5×1200 + 450 + 1050
        delegates,
      };

      const lineItems = generateLineItems({ body: registration });

      expect(lineItems).toHaveLength(3);

      // 5 registrations
      expect(lineItems[0]).toMatchObject({
        description: "Registration Fee",
        quantity: 5,
        unitAmount: 1200,
      });

      // 3 dinners
      expect(lineItems[1]).toMatchObject({
        description: "Conference Networking Dinner",
        quantity: 3,
        unitAmount: 150,
      });

      // 3 masterclasses
      expect(lineItems[2]).toMatchObject({
        description: "Post-Conference Masterclass",
        quantity: 3,
        unitAmount: 350,
      });
    });
  });

  describe("Backward Compatibility Tests", () => {
    test("should handle old structure without delegates array", () => {
      const registration: RegistrationType = {
        reference: "TEST-OLD",
        conference: "Test Conference",
        events: "Event 1",
        address: "123 Old St",
        company: "Old Company",
        discount: "",
        referral: "Google",
        priceValue: 1200,
        priceDueDate: new Date("2025-06-01"),
        masterclass: "Old Masterclass",
        accomodation: 1,
        mainParticipant: {
          name: "Old User",
          email: "old@test.com",
          position: "Old Position",
          phone: "1234567890",
        },
        dinnerParticipants: "Old User | normal",
        extraParticipants: "Extra Person | extra@test.com | Extra Position",
        agreement: true,
        dinnerPrice: 150,
        masterclassPrice: 350,
        total: 2850, // 2×1200 + 150 + 350
        delegates: [], // Empty delegates array triggers old behavior
      };

      const lineItems = generateLineItems({ body: registration });

      expect(lineItems).toHaveLength(3);

      // 2 registrations (main + 1 extra)
      expect(lineItems[0]).toMatchObject({
        description: "Registration Fee",
        quantity: 2,
        unitAmount: 1200,
      });
    });
  });

  describe("Edge Cases", () => {
    test("should handle zero delegates gracefully", () => {
      const registration: RegistrationType = {
        reference: "TEST-ZERO",
        conference: "Test Conference",
        events: "",
        address: "",
        company: "",
        discount: "",
        referral: "",
        priceValue: 0,
        priceDueDate: new Date("2025-06-01"),
        masterclass: "no",
        accomodation: 0,
        mainParticipant: {
          name: "",
          email: "",
          position: "",
          phone: "",
        },
        dinnerParticipants: "",
        extraParticipants: "",
        agreement: true,
        dinnerPrice: 0,
        masterclassPrice: 0,
        total: 0,
        delegates: [],
      };

      const lineItems = generateLineItems({ body: registration });

      // Should still have registration line item even if price is 0
      expect(lineItems.length).toBeGreaterThan(0);
      expect(lineItems[0].description).toBe("Registration Fee");
    });

    test("should handle all line item types together", () => {
      const registration: RegistrationType = {
        reference: "TEST-ALL",
        conference: "Test Conference",
        events: "Event 1",
        address: "",
        company: "Full Package",
        discount: "PROMO2025",
        referral: "Email",
        priceValue: 1200,
        priceDueDate: new Date("2025-06-01"),
        masterclass: "Full MC",
        accomodation: 3,
        mainParticipant: {
          name: "Full Package",
          email: "full@test.com",
          position: "VIP",
          phone: "6666666666",
        },
        dinnerParticipants: "Full Package | normal",
        extraParticipants: "",
        agreement: true,
        dinnerPrice: 150,
        masterclassPrice: 350,
        total: 1700,
        delegates: [
          {
            firstName: "Full",
            lastName: "Package",
            jobTitle: "VIP",
            organization: "Full Package",
            email: "full@test.com",
            phone: "6666666666",
            diet: "normal",
            dinner: true,
            masterclass: "Full MC",
            accommodationNights: 3,
          },
        ],
      };

      const lineItems = generateLineItems({ body: registration });

      // Should have 4 items: Registration, Dinner, Masterclass, Discount
      expect(lineItems).toHaveLength(4);

      const descriptions = lineItems.map((item) => item.description);
      expect(descriptions).toContain("Registration Fee");
      expect(descriptions).toContain("Conference Networking Dinner");
      expect(descriptions).toContain("Post-Conference Masterclass");
      expect(descriptions).toContain("Discount Code: PROMO2025");
    });
  });
});

import {
  MIN_RENT_WEEKLY,
  MAX_RENT_WEEKLY,
  MIN_MEMBERSHIP_PRICE,
  VAT_RATE,
  MAX_RENT_MONTHLY,
  MIN_RENT_MONTHLY,
} from "./constant";
import { RentPeriodEnum, type OrganisationUnitConfig } from "./types";
import * as data from "./input.json";

// Parse the input JSON
const orgStructureConfig = JSON.parse(JSON.stringify(data));

// Recursive function to get the config object for a given organisation unit
function getConfigForUnit(unitName: string): OrganisationUnitConfig {
  const unit = orgStructureConfig.find(
    (x: { name: string }) => x.name === unitName
  );
  if (unit.config && unit.config.has_fixed_membership_fee) return unit.config;
  // Recurse up to the parent unit
  if (unit.parent) return getConfigForUnit(unit.parent);
  return unit.config;
}

const calculateVAT = (input: number): number => input * VAT_RATE;
// Function to calculate the membership fee
export function calculateMembershipFee(
  rentInput: number,
  rentPeriod: RentPeriodEnum,
  unitName: string
) {
  // Get the config object for the unit
  const config: OrganisationUnitConfig = getConfigForUnit(unitName);
  if (config && config.has_fixed_membership_fee) {
    // if has a fixed membership, just return the fee amount
    return config.fixed_membership_fee_amount;
  }

  const rentAmount = rentInput * 100;
  const minRentAmount =
    rentPeriod == RentPeriodEnum.Week ? MIN_RENT_WEEKLY : MIN_RENT_MONTHLY;
  const maxRentAmount =
    rentPeriod == RentPeriodEnum.Week ? MAX_RENT_WEEKLY : MAX_RENT_MONTHLY;

  if (rentAmount < minRentAmount || rentAmount > maxRentAmount) {
    throw new Error(
      `Rent input is outside of the allowed range. Minimum rent amount is £${(
        minRentAmount / 100
      ).toFixed(2)} per ${
        rentPeriod === RentPeriodEnum.Week ? "week" : "month"
      }, maximum rent amount is £${(maxRentAmount / 100).toFixed(2)} per ${
        rentPeriod === RentPeriodEnum.Week ? "week" : "month"
      }.`
    );
  }

  const weeksRent: number =
    rentPeriod == RentPeriodEnum.Week ? rentAmount : rentAmount / 4;

  // Calculate the membership fee based on the config object and rent input
  const membershipFee = weeksRent + calculateVAT(weeksRent);
  if (membershipFee < MIN_MEMBERSHIP_PRICE) return MIN_MEMBERSHIP_PRICE;
  return membershipFee;
}

// Example usage
const rentInput = 200;
const unitName = "branch_e";
const membershipFee = calculateMembershipFee(
  rentInput,
  RentPeriodEnum.Month,
  unitName
);
console.log(`Membership fee: £${(membershipFee / 100).toFixed(2)}`);
// Sum in full pounds

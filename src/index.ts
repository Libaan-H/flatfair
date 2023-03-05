import {
  MIN_RENT_WEEKLY,
  MAX_RENT_WEEKLY,
  MIN_MEMBERSHIP_PRICE,
  VAT_RATE,
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

  const RentInPence = rentInput * 100;
  // if rentPeriod is week, return the input else divide by 4 to calc week value
  const rentAmount: number =
    rentPeriod == RentPeriodEnum.Week ? RentInPence : RentInPence / 4;

  // Check if the rent input is within the allowed range
  if (rentAmount < MIN_RENT_WEEKLY || rentAmount > MAX_RENT_WEEKLY) {
    throw new Error("Rent input is outside of the allowed range");
  }

  // Calculate the membership fee based on the config object and rent input
  const membershipFee = rentAmount + calculateVAT(rentAmount);
  if (membershipFee < MIN_MEMBERSHIP_PRICE) return MIN_MEMBERSHIP_PRICE;
  return membershipFee;
}

// Example usage
const rentInput = 800;
const unitName = "branch_l";
const membershipFee = calculateMembershipFee(
  rentInput,
  RentPeriodEnum.Week,
  unitName
);
console.log(`Membership fee: £${(membershipFee / 100).toFixed(2)}`);

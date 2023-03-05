// Define constants for rent and VAT
export const MIN_RENT_WEEKLY = 2500; // in pence
export const MAX_RENT_WEEKLY = 200000; // in pence
export const VAT_RATE = 0.2;
export const MIN_MEMBERSHIP_PRICE: number =
  MIN_RENT_WEEKLY + MIN_RENT_WEEKLY * VAT_RATE;

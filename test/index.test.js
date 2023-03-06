const { expect, test, describe, it } = require("@jest/globals");

const { RentPeriodEnum } = require("../src/types");
const { calculateMembershipFee } = require("../src/index");

describe('Calculate Membership Fee is calculated when', () => {
  it('rent is 800, rent period is a week and org unit is branch_l, fee should be 45000', () => {
    expect(calculateMembershipFee(800, RentPeriodEnum.Week, 'branch_l')).toBe(
      45000
    ) 
  })
  it('rent is 110, rent period is a Month and org unit is branch_k, fee should be the fixed amount of 25000', () => {
    expect(calculateMembershipFee(110, RentPeriodEnum.Month, 'branch_k')).toBe(
      25000
    ) 
  })
  it('rent is 200, rent period is a week and org unit is branch_e, fee should be 24000', () => {
    expect(calculateMembershipFee(200, RentPeriodEnum.Week, 'branch_e')).toBe(
      24000
    ) 
  })
  it('rent is 650, rent period is a Month and org unit is branch_e, fee should be 19500', () => {
    expect(calculateMembershipFee(650, RentPeriodEnum.Month, 'branch_e')).toBe(
      19500
    )
  })
  it('rent is 200, rent period is a Month and org unit is branch_e, fee should be 6000', () => {
    expect(calculateMembershipFee(110, RentPeriodEnum.Month, 'branch_e')).toBe(
      14400
    )
  })
  it('rent is 100000, function throws error', () => {
    expect(() =>
      calculateMembershipFee(100000, RentPeriodEnum.Month, 'client')
    ).toThrow('Rent input is outside of the allowed range')
  })
})

const { expect, test, describe, it } = require("@jest/globals");

const { RentPeriodEnum } = require("../src/types");
const { calculateMembershipFee } = require("../src/index");

describe('Calculate Membership Fee', () => {
  it('should rent be 800, rent period is a week and org unit is branch_l, fee should be 45000', () => {
    expect(calculateMembershipFee(800, RentPeriodEnum.Week, 'branch_l')).toBe(
      45000
    )
  })
  it('should rent be 300, rent period is a week and org unit is branch_k, fee should be 45000', () => {
    expect(calculateMembershipFee(300, RentPeriodEnum.Week, 'branch_k')).toBe(
      25000
    )
  })
  it('should rent be 2800, function throws error', () => {
    expect(() =>
      calculateMembershipFee(2800, RentPeriodEnum.Week, 'client')
    ).toThrow('Rent input is outside of the allowed range')
  })
})

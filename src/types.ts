export enum RentPeriodEnum {
  Month = "month",
  Week = "week",
} // rentPeriod can either be these 2 values strictly

export interface OrganisationUnitConfig {
  has_fixed_membership_fee: boolean;
  fixed_membership_fee_amount: number;
}

export interface OrganisationUnit {
  name: string;
  config: OrganisationUnitConfig;
  parent: string;
}

import { Schema, model, models } from "mongoose";

export interface ICompany {
  name: string;
  email: string;
  isVerified: boolean;
}

export const companySchema = new Schema<ICompany>({
  email: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  isVerified: {
    type: Boolean,
    required: true,
    default: false,
  },
});

export const Company = models.Company || model("Company", companySchema);

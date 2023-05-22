import { Schema, model, models } from "mongoose";

export interface ICompany {
  name: string;
}

export const companySchema = new Schema<ICompany>({
  name: {
    type: String,
    required: true,
  },
});

export const Company = models.Company || model("Company", companySchema);

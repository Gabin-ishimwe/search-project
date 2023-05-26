import { Schema, Types, model, models } from "mongoose";

export interface ICompany {
  name: string;
  email: string;
  password: string;
  isVerified: boolean;
  helpers: Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

export const companySchema = new Schema<ICompany>({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  isVerified: {
    type: Boolean,
    required: true,
    default: false,
  },
  helpers: [
    {
      type: Types.ObjectId,
      ref: "Helper",
      default: null,
    },
  ],
  createdAt: {
    type: Date,
    immutable: true,
    default: new Date(),
  },
  updatedAt: {
    type: Date,
    default: new Date(),
  },
});

export const Company = models.Company || model("Company", companySchema);

import { Schema, model, models } from "mongoose";

export interface HelperSchema {
  name: string;
  description: string;
  code: string;
  createdAt: Date;
  updatedAt: Date;
}

const helperSchema = new Schema<HelperSchema>({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  code: {
    type: String,
    required: true,
  },
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

export const Helper = models.Helper || model("Helper", helperSchema);

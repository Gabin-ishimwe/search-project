import { Schema, model, models } from "mongoose";

export interface IRequester {
  name: string;
  description: string;
  contactInfo: string;
  profilePhoto: string;
  website: string;
  email: string;
  message: string;
  isVerified: string;
  createdAt: Date;
  updatedAt: Date;
}

export enum RequestStatus {
  APPROVED = "APPROVED",
  PENDING = "PENDING",
  DECLINE = "DECLINE",
}

export const requesterSchema = new Schema<IRequester>({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  contactInfo: {
    type: String,
    required: true,
  },
  profilePhoto: {
    type: String,
    required: true,
  },
  website: {
    type: String,
    required: true,
  },
  isVerified: {
    type: String,
    required: true,
    default: "PENDING",
    enum: RequestStatus,
  },
  message: {
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

export const Requester =
  models.Requester || model("Requester", requesterSchema);

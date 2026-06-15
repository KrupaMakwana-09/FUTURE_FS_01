import mongoose, { Document, Schema } from "mongoose";

export interface IContactMessage extends Document {
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: Date;
}

const ContactMessageSchema = new Schema<IContactMessage>(
  {
    name: { type: String, required: true, maxlength: 100 },
    email: { type: String, required: true },
    subject: { type: String, required: true, maxlength: 200 },
    message: { type: String, required: true, maxlength: 5000 },
  },
  {
    timestamps: { createdAt: "createdAt", updatedAt: false },
  },
);

export const ContactMessage = mongoose.model<IContactMessage>(
  "ContactMessage",
  ContactMessageSchema,
);

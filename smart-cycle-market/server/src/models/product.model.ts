import mongoose, { Document, model, Schema } from "mongoose";

type productImage = {
  url: string;
  id: string;
};

export interface ProductDocument extends Document {
  owner: Schema.Types.ObjectId;
  name: string;
  price: number;
  purchasingDate: Date;
  category: string;
  images: productImage[];
  thumbnail: string;
  description: string;
}

export const categories = [
  "Electronics",
  "Fashion",
  "Fitness",
  "Home & Kitchen",
  "Books",
  "Toys & Games",
  "Beaty & Personal Care",
  "Sport & Outdoors",
  "Automative",
  "Tools & Home Improvement",
].sort();

const schema = new Schema<ProductDocument>(
  {
    owner: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    purchasingDate: {
      type: Date,
      required: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      required: true,
      enum: [...categories],
    },
    images: [
      {
        type: Object,
        url: String,
        id: String,
      },
    ],
    thumbnail: String,
  },
  { timestamps: true }
);

export const Product = model<ProductDocument>("Product", schema);

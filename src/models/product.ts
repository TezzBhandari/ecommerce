import { Schema, model } from "mongoose";

interface IProduct {
  productName: string;
  productDescription: string;
  img: string;
  price: number;
  color: boolean;
  size: string;
  created_at: Date;
  updated_at: Date;
}

const productSchema = new Schema<IProduct>(
  {
    productName: { type: String, required: true },
    productDescription: { type: String, required: true },
    img: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const Product = model<IProduct>("User", productSchema);

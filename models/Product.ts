import mongoose, { Schema } from 'mongoose';

export type ProductDoc = {
  name: string;
  price: number;
  image: string;
  category: string;
  description: string;
  sizes: string[];
  colors: string[];
  stock: number;
};

const ProductSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    price: { type: Number, required: true, min: 0 },
    image: { type: String, required: true },
    category: { type: String, required: true, trim: true, lowercase: true },
    description: { type: String, required: true },
    sizes: { type: [String], default: [] },
    colors: { type: [String], default: [] },
    stock: { type: Number, default: 0, min: 0 },
  },
  { timestamps: true }
);

export const Product =
  ((mongoose as any).models.Product as any) || (mongoose as any).model('Product', ProductSchema);


import mongoose, { Schema } from 'mongoose';

export type CartItemDoc = {
  productId: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  size?: string;
  color?: string;
};

export type CartDoc = {
  userId: string;
  items: CartItemDoc[];
  updatedAt?: Date;
  createdAt?: Date;
};

const CartItemSchema: any = new Schema(
  {
    productId: { type: String, required: true },
    name: { type: String, required: true },
    price: { type: Number, required: true, min: 0 },
    image: { type: String, required: true },
    quantity: { type: Number, required: true, min: 1 },
    size: { type: String, required: false },
    color: { type: String, required: false },
  },
  { _id: false }
);

const CartSchema = new Schema(
  {
    userId: { type: String, required: true, unique: true, index: true },
    items: { type: [CartItemSchema], default: [] },
  },
  { timestamps: true }
);

export const Cart =
  ((mongoose as any).models.Cart as any) || (mongoose as any).model('Cart', CartSchema);


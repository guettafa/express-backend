import mongoose, { Schema } from "mongoose";

const productSchema = new mongoose.Schema({
  title:       { type: Schema.Types.String,     required: true, maxlength: 50, minlength: 3 },
  description: { type: Schema.Types.String,     required: false },
  quantity:    { type: Schema.Types.Number,     required: true, min: 0, },
  category:    { type: Schema.Types.String,     required: true },
  price:       { type: Schema.Types.Decimal128, required: true, min: 0 }
});

const Product = mongoose.model('Product', productSchema);

export default Product;
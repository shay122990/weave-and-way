import mongoose, { Schema, models } from "mongoose";

const FabricSchema = new Schema({
  name: { type: String, required: true },
  title: { type: String, required: true },
  category: { type: String, required: true },
  description: { type: String, required: true },
  image:{type: String},
  color:{type: String}
}, {
  timestamps: true,
});

export const Fabric = models.Fabric || mongoose.model("Fabric", FabricSchema);

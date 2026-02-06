const mongoose = require("mongoose");

const claimSchema = new mongoose.Schema({
  policyNumber: String,
  policyHolder: String,
  dateOfLoss: String,
  location: String,
  description: String,
  claimType: String,
  estimatedDamage: Number,
  claimant: String,

  missingFields: [String],
  recommendedRoute: String,
  reasoning: String

}, { timestamps: true });

module.exports = mongoose.model("Claim", claimSchema);

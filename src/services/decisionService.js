function decideClaimRoute(data) {

  let missing = [];

  if (!data.policyNumber) missing.push("policyNumber");
  if (!data.dateOfLoss) missing.push("dateOfLoss");
  if (!data.location) missing.push("location");

  const suspiciousWords = ["fraud", "staged", "fake", "scam"];
  let fraudFlag = false;

  if (data.description) {
    const lower = data.description.toLowerCase();
    fraudFlag = suspiciousWords.some(word => lower.includes(word));
  }

  if (fraudFlag) {
    return {
      recommendedRoute: "investigation",
      reasoning: "Fraud keywords detected",
      missingFields: missing
    };
  }

  if (missing.length > 0) {
    return {
      recommendedRoute: "manual_review",
      reasoning: "Mandatory fields missing",
      missingFields: missing
    };
  }

  if (data.claimType === "injury") {
    return {
      recommendedRoute: "specialist_queue",
      reasoning: "Injury claim",
      missingFields: []
    };
  }

  if (data.estimatedDamage && data.estimatedDamage <= 25000) {
    return {
      recommendedRoute: "fast_track",
      reasoning: "Low damage claim",
      missingFields: []
    };
  }

  return {
    recommendedRoute: "normal_processing",
    reasoning: "Standard claim",
    missingFields: []
  };
}

module.exports = decideClaimRoute;

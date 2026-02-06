const express = require("express");
const router = express.Router();

const upload = require("../middleware/upload");
const readPDF = require("../utils/pdfReader");
const extractFieldsFromText = require("../services/aiExtractionService");
const decideClaimRoute = require("../services/decisionService");



router.post("/claim/upload", upload.single("file"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const text = await readPDF(req.file.path);

    console.log("📄 PDF TEXT EXTRACTED:\n", text);


    const extractedFields = await extractFieldsFromText(text);

    console.log("🤖 AI RESULT:", extractedFields);

 
    const decision = decideClaimRoute(extractedFields);

    res.json({
      extractedFields,
      missingFields: decision.missingFields,
      recommendedRoute: decision.recommendedRoute,
      reasoning: decision.reasoning,
    });

  } catch (err) {
    console.log("❌ ERROR:", err);
    res.status(500).send("Error processing claim");
  }
});

module.exports = router;

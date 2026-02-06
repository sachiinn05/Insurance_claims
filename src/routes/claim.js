const express = require("express");
const router = express.Router();

const upload = require("../middleware/upload");
const readPDF = require("../utils/pdfReader");
const extractFieldsFromText = require("../services/aiExtractionService");
const decideClaimRoute = require("../services/decisionService");


// 🚀 Upload + process claim
router.post("/claim/upload", upload.single("file"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    // 📄 read pdf text
    const text = await readPDF(req.file.path);

    console.log("📄 PDF TEXT EXTRACTED:\n", text);

    // 🤖 AI extraction
    const extractedFields = await extractFieldsFromText(text);

    console.log("🤖 AI RESULT:", extractedFields);

    // 🧠 routing logic
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

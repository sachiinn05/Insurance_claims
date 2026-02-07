# 🧠 Autonomous Insurance Claims Processing Agent

AI-powered backend system that processes FNOL (First Notice of Loss) insurance documents, extracts structured data, detects inconsistencies, and routes claims automatically.

---

## 🚀 Problem Statement

Insurance companies receive FNOL documents in unstructured formats such as PDFs, emails, and text files. Manual processing is slow, error-prone, and not scalable.

This system automates the workflow by:
- Reading FNOL documents
- Extracting key claim fields using AI
- Detecting missing or suspicious information
- Routing claims into the correct processing pipeline

---

## 🎯 Features

- 📄 Upload FNOL documents (PDF/TXT)
- 🤖 AI-based claim field extraction
- 🧠 Missing data detection
- 🔍 Fraud keyword detection
- 🧭 Intelligent claim routing engine
- 🗄 MongoDB claim storage
- 📦 Structured JSON output

---

## 🏗 System Architecture

Client (Postman / UI)
↓
File Upload API (Express + Multer)
↓
PDF/Text Extraction
↓
LLM (AI Extraction)
↓
Structured Claim Fields
↓
Decision Engine (Routing Rules)
↓
MongoDB Storage
↓
JSON Response

---

## 🧠 AI Integration

LLM is used to convert unstructured FNOL text into structured JSON.

**Why AI?**
- FNOL documents vary in format
- Regex is unreliable for real-world text
- AI understands context & variations

Routing decisions remain rule-based for:
- Explainability
- Compliance
- Auditability

---

## 🧭 Claim Routing Logic

| Condition | Route |
|----------|------|
| Fraud keywords present | investigation |
| Mandatory fields missing | manual_review |
| Injury claim | specialist_queue |
| Damage ≤ 25,000 | fast_track |
| Otherwise | normal_processing |

---

## 🛠 Tech Stack

- Node.js
- Express.js
- MongoDB
- Multer
- PDF processing
- AI API (LLM integration)
- REST APIs

---

## 📂 Project Structure

src/
├── config/
│ └── db.js
├── middleware/
│ └── upload.js
├── models/
│ └── claim.js
├── routes/
│ └── claim.js
├── services/
│ ├── aiExtractionService.js
│ └── decisionService.js
├── utils/
│ └── pdfReader.js
└── app.js

---

## ▶️ How to Run

### 1️⃣ Install dependencies
npm install

### 2️⃣ Add environment variables

Create a `.env` file:

PORT=8001  
MONGO_URI=your_mongodb_url  
OPENROUTER_API_KEY=your_ai_key  

### 3️⃣ Start server
npm run dev

---

## 🧪 API Testing

### POST /claim/upload

Body → form-data

| key | type |
|-----|------|
| file | File |

Upload FNOL document.

---

## 📤 Output Format

{
  "extractedFields": {},
  "missingFields": [],
  "recommendedRoute": "",
  "reasoning": ""
}

---

## 🧠 Engineering Decisions

- AI for extraction (handles messy input)
- Rule-based routing for predictable decisions
- MongoDB for persistence
- Modular and scalable architecture

---

## 📊 Challenges Faced

- Parsing real-world PDFs
- Handling inconsistent document formats
- Structuring LLM output into strict JSON
- Designing routing logic

---

## 🔮 Future Improvements

- Fraud risk scoring model
- Admin dashboard
- Claim lifecycle tracking
- Queue management
- Notification system

---

## 👨‍💻 Author

Sachin Singh  
Full Stack Developer | MERN | AI Integration  

GitHub: https://github.com/sachiinn05

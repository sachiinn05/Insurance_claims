const fs = require("fs");
const pdfjsLib = require("pdfjs-dist");

async function readPDF(filePath) {
  try {
    const data = new Uint8Array(fs.readFileSync(filePath));

    const loadingTask = pdfjsLib.getDocument({ data });
    const pdf = await loadingTask.promise;

    let text = "";

    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const content = await page.getTextContent();

      const strings = content.items.map(item => item.str);
      text += strings.join(" ");
    }

    console.log("📄 PDF TEXT EXTRACTED:\n", text); // 🔥 debug
    return text;

  } catch (err) {
    console.log("PDF READ ERROR:", err);
    return "";
  }
}

module.exports = readPDF;

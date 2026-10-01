type Block = {
  text: string; // text found on the page, e.g. "Invoice Number" or "Invoice"
  x: number; // x-position (left edge) on the page, in pixels
  y: number; // y-position (baseline) on the page, in pixels
};

const blocks: Block[] = [
  { text: "INV-1042", x: 300, y: 100 },
  { text: "Invoice Number", x: 100, y: 100 },
  { text: "Invoice Date", x: 100, y: 150 },
  { text: "2026-02-14", x: 300, y: 150 },
  { text: "Total Amount", x: 100, y: 200 },
  { text: "$1,245.00", x: 300, y: 200 },
];

const extractFields = (blocks: Block[], fields: string[]) => {
  const map = new Map();
  const result = {};
  for (const textRow of blocks) {
    for (const field of fields) {
      if (textRow.text === field) {
        map.set(field, textRow);
      }
    }

    for (const [invoiceText, invoiceObj] of map.entries()) {
      result[invoiceText] = null;
      for (const textRow of blocks) {
        if (textRow.text === invoiceText) continue;
        if (textRow.y === invoiceObj.y) {
          if (textRow.x > invoiceObj.x) {
            result[invoiceText] = textRow.text;
          } else {
            result[textRow.text] = invoiceText;
          }
        }
      }
    }
  }
  return result;
};

//{ "Invoice Number": "INV-1042", "Invoice Date": "2026-02-14", "Total Amount": "$1,245.00" }

extractFields(blocks, ["Invoice Number", "Invoice Date", "Total Amount"]);

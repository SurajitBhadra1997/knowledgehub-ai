import fs from "fs/promises";

export async function extractTxtText(filePath: string) {
  return await fs.readFile(filePath, "utf8");
}
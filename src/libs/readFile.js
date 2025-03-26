import fs from "fs";

export const readFile = (path) => {
  if (fs.existsSync(path)) {
    const fileContent = fs.readFileSync(path, "utf8");

    if (fileContent) {
      return JSON.parse(fileContent);
    }
  }
  return [];
};
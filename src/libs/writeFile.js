import fs from "fs";

export const writeFile = (path, data) => {
  fs.writeFileSync(path, JSON.stringify(data,null,2), "utf8");
};
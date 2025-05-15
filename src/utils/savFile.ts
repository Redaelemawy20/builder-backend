// save file to storage 'uploads' folder
import { File } from 'formidable';
import fs from 'fs/promises';
import path from 'path';

export async function saveFile(file: File) {
  const filePath = path.join(process.cwd(), 'uploads', file.newFilename);
  // save file to storage
  const fileData = await fs.readFile(file.filepath);
  await fs.writeFile(filePath, fileData);
  return filePath;
}

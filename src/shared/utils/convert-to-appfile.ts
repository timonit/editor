import type { AppFile } from '@/entities';
import { uuid } from './uuid';

export async function convertToAppFile(file: File): Promise<AppFile>  {
  return {
    id: uuid(),
    data: await file.text(),
    lastModified: file.lastModified,
    name: file.name,
    type: file.type,
  }
}

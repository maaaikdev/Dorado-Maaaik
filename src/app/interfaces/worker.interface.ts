import { Translation } from "./translation.interface";
import { Photo } from './photo.interface';
import { Service } from './service.interface';
import { Project } from './proyect.interface';

export interface Worker {
  worker_id: any;
  id: number;
  sort?: any;
  name: string;
  photo: Photo;
  position:String;
  about:String;
  service: Service;
  partner: boolean;
  slug: string;
  background?: any;
  translations: Translation[];
  projects: Project[];
}









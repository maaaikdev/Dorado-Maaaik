import { Translation } from './translation.interface';
import { Project } from './proyect.interface';
import { Worker } from './worker.interface';

  export interface Service {
  id?: number;
  sort?: any;
  name?: string;
  slug? : string;
  background?: any;
  translations?: Translation[];
  workers?:Worker[];
  reel?:string;
}
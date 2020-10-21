import { MenuWorker } from './menu-worker.interface';
import { Translation } from './translation.interface';

export interface Menu {
    parent?:string,
    slug?:string,
    name?:string,
    sort?:number,
    translations: Translation[],
    subMenu?:Menu[],
    translation:string,
    status?:string
}
export interface Photo {
    id: number;
    storage: string;
    private_hash: string;
    filename_disk: string;
    filename_download: string;
    title: string;
    type: string;
    uploaded_by: number;
    uploaded_on: string;
    charset: string;
    filesize: number;
    width: number;
    height: number;
    duration: number;
    embed?: any;
    folder?: any;
    description: string;
    location: string;
    tags: any[];
    checksum: string;
    metadata?: any;
    data: Data;
  }

 export interface Data {
    full_url: string;
    url: string;
    asset_url: string;
    thumbnails: Thumbnail[];
    embed?: any;
  }
  
  export interface Thumbnail {
    key: string;
    url: string;
    relative_url: string;
    dimension: string;
    width: number;
    height: number;
  }
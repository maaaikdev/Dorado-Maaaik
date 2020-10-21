export function getBaseLocation() {
    let paths: string[] = location.pathname.split('/').splice(1, 1);
    let basePath: string = (paths && paths[0]) || 'es/home'; // Default: es/home
    return '/' + basePath;
}

export function changeLanguage(lang:string){
    localStorage.setItem('l', lang);
  }


  export function getLanguage(){
      let lang = localStorage.getItem('l');
      return lang;
  }
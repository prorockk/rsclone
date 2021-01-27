export function set(name: string, value: any) {
    window.localStorage.setItem(name, JSON.stringify(value));
}
  
export function get(name: string) {    
    return JSON.parse(window.localStorage.getItem(name) || 'null');
}

export function del(name: string) {
    localStorage.removeItem(name);
}


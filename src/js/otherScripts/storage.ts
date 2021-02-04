export function set(name: string, value: string | number): void {
    window.localStorage.setItem(name, JSON.stringify(value));
}

export function get(name: string): any {
    return JSON.parse(window.localStorage.getItem(name) || "null");
}

export function del(name: string): void {
    localStorage.removeItem(name);
}

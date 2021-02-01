export default function mouseDefault(event: MouseEvent) {
    if (event.button === 2) {
        console.log("Type this for GodMode: BAGUVIX");
        event.preventDefault();
        return true;
    }
}

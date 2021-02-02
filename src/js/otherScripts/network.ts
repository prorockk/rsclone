import axios from "axios";

const requestURLObj: { [level: string]: string } = {
    level: "https://rs-clone-wars.herokuapp.com/todos",
};

export default {
    async get(request: string) {
        return fetch(requestURLObj[request])
            .then((response) => response.json())
            .catch((error) => console.log(error));
    },

    async create(data: any) {
        const config = {
            method: "POST",
            body: JSON.stringify(data),
            headers: { "Content-Type": "application/json" },
        };
        return fetch(requestURLObj.level, config)
            .then((response) => response.json())
            .catch((error) => console.log(error));
    },

    // async set (request:string, data: any) {
    //     const config = {
    //         method: "PUT",
    //         body: JSON.stringify(data),
    //         headers: {'Content-Type': 'application/json'}
    //     }
    //     return fetch(requestURLObj.users, config).then(response => {
    //         return response.json()
    //     })

    //}
    async remove(data: any) {
        const config = {
            method: "DELETE",
            body: JSON.stringify(data),
            headers: { "Content-Type": "application/json" },
        };
        return fetch(requestURLObj.level, config)
            .then((response) => response.json())
            .catch((error) => console.log(error));
    },
};

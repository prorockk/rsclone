const requestURLObj: { [level: string]: string } = {
    level: "https://rs-clone-wars.herokuapp.com/todos",
    users: "https://rs-clone-wars.herokuapp.com/users",
};

interface ConfigInterface {
    method: string;
    body: string;
    headers: {
        "Content-Type": string;
    };
}

export default {
    async get(request: string): Promise<any> {
        return fetch(requestURLObj[request])
            .then((response) => response.json())
            .catch((error) => console.log(error));
    },

    async create(data: any): Promise<any> {
        const config: ConfigInterface = {
            method: "POST",
            body: JSON.stringify(data),
            headers: { "Content-Type": "application/json" },
        };
        return fetch(requestURLObj.users, config)
            .then((response) => response.json())
            .catch((error) => console.log(error));
    },

    async set(data: any): Promise<any> {
        const config: ConfigInterface = {
            method: "PUT",
            body: JSON.stringify(data),
            headers: { "Content-Type": "application/json" },
        };
        return fetch(`${requestURLObj.users}/${data.id}`, config)
            .then((response) => response.json())
            .catch((error) => console.log(error));
    },

    async remove(data: any): Promise<any> {
        const config: ConfigInterface = {
            method: "DELETE",
            body: JSON.stringify(data),
            headers: { "Content-Type": "application/json" },
        };
        return fetch(requestURLObj.users, config)
            .then((response) => response.json())
            .catch((error) => console.log(error));
    },
};

import axios from "axios";

const requestURL = "https://rs-clone-wars.herokuapp.com/todos";

export default {
    async get() {
        return fetch(requestURL).then((response) => {
            return response.json();
        });
    },
    // async create (data) {

    //     return fetch(requestURL).then(response => {
    //         return response.json()
    //     })

    // }
    // async set (data) {
    //     return fetch(requestURL).then(response => {
    //         return response.json()
    //     })

    // }
    // async remove (data) {
    //     return fetch(requestURL).then(response => {
    //         return response.json()
    //     })
    // }
};

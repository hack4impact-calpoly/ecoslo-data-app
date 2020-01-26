const baseURL = "http://localhost:8000/";

export default class APIWrapper {

    constructor(store) {
        this.store = store;
    }

    makeGetRequest(urlExtension, optionalResolve = null) {
        return new Promise((resolve, reject) => {
            var xhr = new XMLHttpRequest();
            xhr.open("GET", this.baseURL + urlExtension, true);
            xhr.setRequestHeader("Content-Type", "application/json");

            xhr.onreadystatechange = function() {
                // Call a function when the state changes.
                if (this.readyState === XMLHttpRequest.DONE) {
                    if (this.status === 200) {
                        if (optionalResolve) {
                            optionalResolve(JSON.parse(this.response));
                        } else {
                            resolve(JSON.parse(this.response));
                        }
                    } else {
                        reject(this.response);
                        // reject(getDefaultStatusResponse(this.status, this.response));
                    }
                }
            };
            xhr.send();
        });
    }

    makePostRequest(urlExtension, postInfo, optionalResolve = null) {
        return new Promise((resolve, reject) => {
            var xhr = new XMLHttpRequest();
            xhr.open("POST", this.baseURL + urlExtension, true);
            xhr.setRequestHeader("Content-Type", "application/json");

            xhr.onreadystatechange = function() {
                // Call a function when the state changes.
                if (this.readyState === XMLHttpRequest.DONE) {
                    if (this.status === 200) {
                        if (optionalResolve) {
                            optionalResolve(JSON.parse(this.response));
                        } else {
                            resolve(JSON.parse(this.response));
                        }
                    } else {
                        reject(this.response);
                    }
                }
            };
            xhr.send(JSON.stringify(postInfo));
        });
    }

    login(email, password) {
        if (
            email === null ||
            email.length === 0 ||
            password === null ||
            password.length === 0
        ) {
            return false;
        }

        return this.makePostRequest(
            "login",
            {
                email : email,
                password : password
            }
        );
    }
}
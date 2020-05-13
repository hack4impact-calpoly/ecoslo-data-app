export default class APIWrapper {
    constructor(store) {
        this.baseURL = "https://ecoslo-data-app.herokuapp.com:" + (process.env.PORT || 8000).toString() + '/';
        this.store = store;
    }
    
    makeGetRequest(urlExtension, data = null, optionalResolve = null) {
        let queryString = "";
        if (data !== null) {
            queryString = "?" + Object.keys(data).map((key) => {
                return encodeURIComponent(key) + '=' + encodeURIComponent(data[key])
            }).join('&');
        }

        return new Promise((resolve, reject) => {
            var xhr = new XMLHttpRequest();
            xhr.open("GET", this.baseURL + urlExtension + queryString, true);
            xhr.setRequestHeader("Content-Type", "application/json");

            xhr.onreadystatechange = function() {
                // Call a function when the state changes.
                if (this.readyState === XMLHttpRequest.DONE) {
                    if (this.status === 200) {
                        if (optionalResolve) {
                            //optionalResolve(JSON.parse(this.response));
                            optionalResolve(this.response);
                        } else {
                            //resolve(JSON.parse(this.response));
                            resolve(this.response);
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

    makeNonGetRequest(requestType, urlExtension, data = null, optionalResolve = null) {
        return new Promise((resolve, reject) => {
            var xhr = new XMLHttpRequest();
            xhr.open(requestType.toUpperCase(), this.baseURL + urlExtension, true);
            xhr.setRequestHeader("Content-Type", "application/json");

            xhr.onreadystatechange = function() {
                // Call a function when the state changes.
                if (this.readyState === XMLHttpRequest.DONE) {
                    if (this.status === 200) {
                        if (optionalResolve) {
                            optionalResolve((this.response));
                        } else {
                            resolve((this.response));
                        }
                    } else {
                        reject(this.response);
                    }
                }
            };
            if (data !== null) {
                xhr.send(JSON.stringify(data));
            } else {
                xhr.send();
            }
        });
    }

    getUserInformation() {
        return this.store.getState().userLoginInfo || { "username" : "TEST" };
    }

    combineLoginInfoForRequest(json) {
        let currLoginInfo = this.getUserInformation();
        if (currLoginInfo === null || currLoginInfo === undefined) {
            return false;
        }
        //return Object.assign(currLoginInfo, json);
        return Object.assign({}, json);
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

    addData(dataToBeSubmitted) {
        const postData = this.combineLoginInfoForRequest(dataToBeSubmitted);
        if (!postData) {
            return false;
        }
        return this.makeNonGetRequest("POST", "add", {'item': postData});
    }

    alterTable(dataToBeSubmitted) {
        const postData = this.combineLoginInfoForRequest(dataToBeSubmitted);
        if (!postData) {
            return false;
        }
        return this.makeNonGetRequest("POST", "altTable", postData);
    }

    getLocations() {
        return this.makeGetRequest("locations");
    }

    getColumns() {
        return this.makeGetRequest("columns");
    }

    getByCols(dataToBeSubmitted) {
        return this.makeGetRequest("byCols", dataToBeSubmitted);
    }

    sumPerCol(dataToBeSubmitted) {
        return this.makeGetRequest("sumPerCol", dataToBeSubmitted);
    }

    updateData(dataToBeSubmitted) {
        const postData = this.combineLoginInfoForRequest(dataToBeSubmitted);
        if (!postData) {
            return false;
        }
        console.log(postData);
        return this.makeNonGetRequest("PUT", "update", postData);
    }
}
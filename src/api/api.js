import config from '../config.json'


class API {
    constructor() {
        this.api = `${config.serverLink}`
    }

    endpoints(type) {
        const types = {
            client: '/clients',
            employee: '/employees',
            supplier: '/suppliers',
            legalEntity: '/legal_entites',
            currency: '/currencies',
            storehouse: '/storehouse',
            measure: '/measure',
            expenditure: '/expenditure',
            incomeItem: '/income_items',
            typePrice: '/type_price',
            bankDetail: '/banks_details',
            payment: '/payments',
            money: '/money',
            moneyExchange: '/money/currency_exchange',
            moneyMoving: '/money/moving_money',
        }

        return types[type];
    }

    async request(method, path, body) {
        const request = await fetch(`${this.api}${path}`, {
            method: method,
            body: JSON.stringify(body),
            headers: {
                "content-type": "application/json",
            },
            credentials: "include"
        });

        return await request.json();
    }

    async registration(username, email, password) {
        return await this.request("POST", "/auth/registration", {
            username: username,
            email: email,
            password: password
        });
    }

    async login(email, password) {
        return await this.request("POST", "/auth/login", {
            email: email,
            password: password
        });
    }

    async changePassword(code, password) {
        return await this.request("POST", "/auth/change-password", {
            code: code,
            password: password
        });
    }

    async restoration(email) {
        return await this.request("GET", `/auth/restoration?email=${email}`);
    }

    //Get all items
    async all(urlType) {
        const url = this.endpoints(urlType)
        return await this.request("GET", url);
    }

    //Find item by ID
    async find(id, urlType) {
        const url = this.endpoints(urlType)
        return await this.request("GET", `${url}/${id}`);
    }

    //Create new item
    async add(user, urlType) {
        const url = this.endpoints(urlType)
        return await this.request("POST", `${url}/add`, user);
    }

    //Edit item by ID
    async edit(id, user, urlType) {
        const url = this.endpoints(urlType)
        return await this.request("POST", `${url}/${id}/edit`, user);
    }

    //Remove item by ID
    async remove(id, urlType) {
        const url = this.endpoints(urlType)
        return await this.request("POST", `${url}/${id}/remove`);
    }


    //Currencies
    async getCurrenciesList() {
        return await this.request("GET", "/auxiliary/all_currencies");
    }
}


export default API;

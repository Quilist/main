import config from '../config.json'


class API {
    constructor() {
        this.api = `${config.serverLink}`
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

    async getClients() {
        return await this.request("GET", "/clients");
    }

    async getClient(id) {
        return await this.request("GET", `/clients/${id}`);
    }

    async addClient(user) {
        return await this.request("POST", `/clients/add`, user);
    }

    async editClient(id, user) {
        return await this.request("POST", `/clients/${id}/edit`, user);
    }

    async removeClient(id) {
        return await this.request("POST", `/clients/${id}/remove`);
    }



    async getEmployees() {
        return await this.request("GET", "/employees");
    }
    async getEmploye(id) {
        return await this.request("GET", `/employees/${id}`);
    }
    async addEmployees(user) {
        return await this.request("POST", `/employees/add`, user);
    }
    async editEmployees(id, user) {
        return await this.request("POST", `/employees/${id}/edit`, user);
    }
    async removeEmployees(id) {
        return await this.request("POST", `/employees/${id}/remove`);
    }
    async getSuppliers() {
        return await this.request("GET", "/suppliers");
    }

    async getSupplier(id) {
        return await this.request("GET", `/suppliers/${id}`);
    }

    async addSuppliers(user) {
        return await this.request("POST", `/suppliers/add`, user);
    }

    async editSuppliers(id, user) {
        return await this.request("POST", `/suppliers/${id}/edit`, user);
    }

    async removeSuppliers(id) {
        return await this.request("POST", `/suppliers/${id}/remove`);
    }
    async getLegalEntites() {
        return await this.request("GET", "/legal_entites");
    }

    async getLegalEntite(id) {
        return await this.request("GET", `/legal_entites/${id}`);
    }

    async addLegalEntites(user) {
        return await this.request("POST", `/legal_entites/add`, user);
    }

    async editLegalEntites(id, user) {
        return await this.request("POST", `/legal_entites/${id}/edit`, user);
    }

    async removeLegalEntites(id) {
        return await this.request("POST", `/legal_entites/${id}/remove`);
    }

    //Currencies
    async getCurrenciesList() {
        return await this.request("GET", "/currencies/all");
    }

    async getCurrencies() {
        return await this.request("GET", "/currencies");
    }

    async getCurrency(id) {
        return await this.request("GET", `/currencies/${id}`);
    }

    async addCurrency(data) {
        return await this.request("POST", `/currencies/add`, data);
    }

    async editCurrency(id, data) {
        return await this.request("POST", `/currencies/${id}/edit`, data);
    }

    async removeCurrency(id) {
        return await this.request("POST", `/currencies/${id}/remove`);
    }

    //Storehouse
    async getStorehouseList() {
        return await this.request("GET", "/storehouse");
    }

    async getStorehouse(id) {
        return await this.request("GET", `/storehouse/${id}`);
    }

    async addStorehouse(data) {
        return await this.request("POST", `/storehouse/add`, data);
    }

    async editStorehouse(id, data) {
        return await this.request("POST", `/storehouse/${id}/edit`, data);
    }

    async removeStorehouse(id) {
        return await this.request("POST", `/storehouse/${id}/remove`);
    }

    //Measure
    async getMeasureList() {
        return await this.request("GET", "/measure");
    }

    async getMeasure(id) {
        return await this.request("GET", `/measure/${id}`);
    }

    async addMeasure(data) {
        return await this.request("POST", `/measure/add`, data);
    }

    async editMeasure(id, data) {
        return await this.request("POST", `/measure/${id}/edit`, data);
    }

    async removeMeasure(id) {
        return await this.request("POST", `/measure/${id}/remove`);
    }

    //Expenditure
    async getExpenditureList() {
        return await this.request("GET", "/expenditure");
    }

    async getExpenditure(id) {
        return await this.request("GET", `/expenditure/${id}`);
    }

    async addExpenditure(data) {
        return await this.request("POST", `/expenditure/add`, data);
    }

    async editExpenditure(id, data) {
        return await this.request("POST", `/expenditure/${id}/edit`, data);
    }

    async removeExpenditure(id) {
        return await this.request("POST", `/expenditure/${id}/remove`);
    }

    //IncomeItems
    async getIncomeItemList() {
        return await this.request("GET", "/income_items");
    }

    async getIncomeItem(id) {
        return await this.request("GET", `/income_items/${id}`);
    }

    async addIncomeItem(data) {
        return await this.request("POST", `/income_items/add`, data);
    }

    async editIncomeItem(id, data) {
        return await this.request("POST", `/income_items/${id}/edit`, data);
    }

    async removeIncomeItem(id) {
        return await this.request("POST", `/income_items/${id}/remove`);
    }

    //TypePrice
    async getTypePriceList() {
        return await this.request("GET", "/type_price");
    }

    async getTypePrice(id) {
        return await this.request("GET", `/type_price/${id}`);
    }

    async addTypePrice(data) {
        return await this.request("POST", `/type_price/add`, data);
    }

    async editTypePrice(id, data) {
        return await this.request("POST", `/type_price/${id}/edit`, data);
    }

    async removeTypePrice(id) {
        return await this.request("POST", `/type_price/${id}/remove`);
    }

    //BanksDetails
    async getBankDetailList() {
        return await this.request("GET", "/banks_details");
    }

    async getBankDetail(id) {
        return await this.request("GET", `/banks_details/${id}`);
    }

    async addBankDetail(data) {
        return await this.request("POST", `/banks_details/add`, data);
    }

    async editBankDetail(id, data) {
        return await this.request("POST", `/banks_details/${id}/edit`, data);
    }

    async removeBankDetail(id) {
        return await this.request("POST", `/banks_details/${id}/remove`);
    }
}


export default API;

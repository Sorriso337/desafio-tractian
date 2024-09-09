import { api } from ".";

export async function getCompanies() {
    return api.get('/companies')
}
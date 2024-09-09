import { api } from ".";

export async function getCompanies() {
    return api.get('/companies')
}

export async function getAssetsByCompanyId(id: string) {
    return api.get(`companies/${id}/assets`)
}

export async function getLocationsByCompanyId(id: string) {
    return api.get(`companies/${id}/locations`)
}
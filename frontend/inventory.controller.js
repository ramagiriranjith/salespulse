import ApiClient from "../helpers/ApiClient";
import useSWR from "swr";

const fetcher = (url) => ApiClient.get(url).then((res) => res.data);

export function useInventoryItems() {
    const APIURL = `/inventory-items`;
    const { data, error, isLoading } = useSWR(APIURL, fetcher);
    return {
        data,
        error,
        isLoading,
        APIURL,
    };
}

export function useInventoryItem(id) {
    const APIURL = `/inventory-items/${id}`;
    const { data, error, isLoading } = useSWR(APIURL, fetcher);
    return {
        data,
        error,
        isLoading,
        APIURL,
    };
}

export async function addInventoryItem(title, categoryId, quantity, supplier_name, stock_alert_quantity) {
    try {
        const response = await ApiClient.post("/inventory-items/add", {
            title,
            categoryId,
            quantity,
            supplier_name,
            stock_alert_quantity,
        });
        return response;
    } catch (error) {
        throw error;
    }
}

export async function updateInventoryItem(id, title, categoryId, quantity, supplier_name, stock_alert_quantity) {
    try {
        const response = await ApiClient.post(`/inventory-items/update/${id}`, {
            title,
            categoryId,
            quantity,
            supplier_name,
            stock_alert_quantity,
        });
        return response;
    } catch (error) {
        throw error;
    }
}

export async function uploadInventoryItemPhoto(id, form) {
    try {
        const response = await ApiClient.post(`/inventory-items/update/${id}/upload-photo`, form);
        return response;
    } catch (error) {
        throw error;
    }
}
export async function removeInventoryItemPhoto(id) {
    try {
        const response = await ApiClient.post(`/inventory-items/update/${id}/remove-photo`);
        return response;
    } catch (error) {
        throw error;
    }
}

export async function deleteInventoryItem(id) {
    try {
        const response = await ApiClient.delete(`/inventory-items/delete/${id}`)
        return response;
    } catch (error) {
        throw error;
    }
};

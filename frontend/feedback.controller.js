import ApiClient from "../helpers/ApiClient";
import useSWR from "swr";

const fetcher = (url) => ApiClient.get(url).then((res) => res.data);

export function useCustomerFeedbacks() {
    const APIURL = `/feedback`;
    const { data, error, isLoading } = useSWR(APIURL, fetcher);
    return {
        data,
        error,
        isLoading,
        APIURL,
    };
}

export function useCustomerFeedback(id) {
    const APIURL = `/feedback/${id}`;
    const { data, error, isLoading } = useSWR(APIURL, fetcher);
    return {
        data,
        error,
        isLoading,
        APIURL,
    };
}

export async function addCustomerFeedback(review, rating, customer_name) {
    try {
        const response = await ApiClient.post("/feedback/add", {
            review,
            rating,
            customer_name,
        });
        return response;
    } catch (error) {
        throw error;
    }
}

export async function deleteCustomerFeedback(id) {
    try {
        const response = await ApiClient.delete(`/feedback/delete/${id}`)
        return response;
    } catch (error) {
        throw error;
    }
};

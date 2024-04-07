import { useEffect, useState } from "react";
import { getCookie } from "@/utils/cookieHelpers";
import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const useWarehousesUser = () => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [warehouses, setWarehouses] = useState([]);

    const fetchWarehouses = async () => {
        const accessToken = getCookie("accessToken");
        setIsLoading(true);
        setError(null);
        try {
            const response = await axios.get(
                `${API_URL}/api/warehouses/my/`,
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    }
                }
            );
            setWarehouses(response.data);
        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };


    useEffect(() => {
        fetchWarehouses();
    }, []);

    const addWarehouses = async (name, address, weight, track_number, price, country, status, image, comments, unique_id_user) => {
        const accessToken = getCookie("accessToken");
        const formData = new FormData();
        formData.append("name", name);
        formData.append("address", address);
        formData.append("weight", weight);
        formData.append("track_number", track_number);
        formData.append("price", price);
        formData.append("country", country);
        formData.append("status", status);
        formData.append("image", image);
        formData.append("comments", comments);
        formData.append("unique_id_user", unique_id_user);

        setIsLoading(true);
        setError(null);
        setIsSuccess(false);

        try {
            const response = await axios.post(
                `${API_URL}/api/warehouses/create/`,
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            await fetchWarehouses();
            setIsSuccess(true);
        } catch (error) {
            setError(error.message);
            setIsSuccess(false);
        } finally {
            setIsLoading(false);
        }
    };


    const deleteWarehouses = async (productId) => {
        setIsLoading(true);
        setError(null);

        try {
            const accessToken = getCookie("accessToken");
            const response = await axios.delete(
                `${API_URL}/api/warehouses/delete_notification/${productId}/`,
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                }
            );

            setWarehouses((currentProducts) =>
                currentProducts.filter((product) => product.id !== productId)
            );
            fetchWarehouses()
        } catch (error) {
            setError(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    const updateWarehouses = async (productId, formData) => {
        setIsLoading(true);
        setError(null);

        try {
            const accessToken = getCookie("accessToken");
            const response = await axios.patch(
                `${API_URL}/api/warehouses/update_notification/${productId}/`,
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                }
            );
            fetchWarehouses()
            const updatedProduct = response.data;
            setWarehouses((currentProducts) =>
                currentProducts.map((product) =>
                    product.id === productId ? { ...product, ...updatedProduct } : product
                )
            );
        } catch (error) {
            setError(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    return {
        warehouses,
        addWarehouses,
        deleteWarehouses,
        updateWarehouses,
        fetchWarehouses,
        error,
        isLoading,
    };
};

export default useWarehousesUser;

import { useEffect, useState } from "react";
import { getCookie } from "@/utils/cookieHelpers";
import axios from "axios";

const useNotification = () => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [products, setProducts] = useState([]);

    const fetchNotification = async () => {
        const accessToken = getCookie("accessToken");
        setIsLoading(true);
        setError(null);
        try {
            const response = await axios.get(
                "http://18.222.184.72:8000/api/notifications/list/",
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    }
                }
            );
            setProducts(response.data);
        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };


    useEffect(() => {
        fetchNotification();
    }, []);

    const addNotification = async (title, description, icon) => {
        const accessToken = getCookie("accessToken");
        const formData = new FormData();
        formData.append("title", title);
        formData.append("description", description);
        formData.append("icon", icon);

        setIsLoading(true);
        setError(null);
        setIsSuccess(false);

        try {
            const response = await axios.post(
                "http://18.222.184.72:8000/api/notifications/create_notification/",
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                }
            );

            await fetchNotification();
            setIsSuccess(true);
        } catch (error) {
            setError(error.message);
            setIsSuccess(false);
        } finally {
            setIsLoading(false);
        }
    };

    const deleteNotification = async (productId) => {
        setIsLoading(true);
        setError(null);

        try {
            const accessToken = getCookie("accessToken");
            const response = await axios.delete(
                `http://18.222.184.72:8000/api/notifications/delete_notification/${productId}/`,
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                }
            );

            setProducts((currentProducts) =>
                currentProducts.filter((product) => product.id !== productId)
            );
        } catch (error) {
            setError(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    const updateNotification = async (productId, formData) => {
        setIsLoading(true);
        setError(null);

        try {
            const accessToken = getCookie("accessToken");
            const response = await axios.patch(
                `http://18.222.184.72:8000/api/notifications/update_notification/${productId}/`,
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                }
            );

            const updatedProduct = response.data;
            setProducts((currentProducts) =>
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
        products,
        addNotification,
        deleteNotification,
        updateNotification,
        error,
        isLoading,
    };
};

export default useNotification;

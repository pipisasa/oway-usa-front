import { useEffect, useState } from "react";
import axios from "axios";
import { getCookie } from "@/utils/cookieHelpers";

const useNotification = () => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [products, setProducts] = useState([]);

    const fetchNotification = async () => {
        setIsLoading(true);
        setError(null);
        const accessToken = getCookie("accessToken");
        if (!accessToken) {
            setError("No access token found");
            setIsLoading(false);
            return;
        }
        try {
            const response = await axios.get(
                "http://18.222.184.72:8000/api/notifications/my_notification/",
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`
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
    const updateCheckAllNotification = async (productId) => {
        setIsLoading(true);
        setError(null);

        try {
            const accessToken = getCookie("accessToken");
            const response = await axios.put(
                `http://18.222.184.72:8000/api/notifications/check_all/`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                }
            );

        } catch (error) {
            setError(error.message);
        } finally {
            setIsLoading(false);
        }
    };


    useEffect(() => {
        fetchNotification();
    }, []);

    return {
        products,
        error,
        isLoading,
        updateCheckAllNotification
    };
};

export default useNotification;

import { useEffect, useState } from "react";
import { getCookie } from "@/utils/cookieHelpers";
import axios from "axios";

const useShops = () => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [products, setProducts] = useState([]);

    const fetchShops = async () => {
        const accessToken = getCookie("accessToken");
        setIsLoading(true);
        setError(null);
        try {
            const response = await axios.get(
                "http://18.222.184.72:8000/api/catalog/sites/list/",
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    }
                }
            );
            console.log(response.data,"response.data")
            setProducts(response.data);
            console.log(products,"products")
        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };


    useEffect(() => {
        fetchShops();
    }, []);

    const addShops = async (name,category,country,logo,description) => {
        const accessToken = getCookie("accessToken");
        const formData = new FormData();
        formData.append("name", name);
        formData.append("category", category);
        formData.append("country", country);
        formData.append("logo", logo);
        formData.append("description", description);

        setIsLoading(true);
        setError(null);
        setIsSuccess(false);

        try {
            const response = await axios.post(
                "http://18.222.184.72:8000/api/catalog/sites/create/",
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                        "Content-Type": "multipart/form-data", // Add this line to specify the content type
                    },
                }
            );

            await fetchShops();
            setIsSuccess(true);
        } catch (error) {
            setError(error.message);
            setIsSuccess(false);
        } finally {
            setIsLoading(false);
        }
    };


    const deleteShops = async (productId) => {
        setIsLoading(true);
        setError(null);

        try {
            const accessToken = getCookie("accessToken");
            const response = await axios.delete(
                `http://18.222.184.72:8000/api/catalog/sites/delete/${productId}/`,
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                }
            );

            setProducts((currentProducts) =>
                Array.isArray(currentProducts)
                    ? currentProducts.filter((product) => product.id !== productId)
                    : []
            );
            fetchShops()
        } catch (error) {
            setError(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    const updateShops = async (productId, formData) => {
        setIsLoading(true);
        setError(null);

        try {
            const accessToken = getCookie("accessToken");
            const response = await axios.patch(
                `http://18.222.184.72:8000/api/catalog/sites/update/${productId}/`,
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                }
            );
            fetchShops()
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
        addShops,
        deleteShops,
        updateShops,
        error,
        isLoading,
    };
};

export default useShops;

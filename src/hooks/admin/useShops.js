import { useState, useEffect } from "react";
import { getCookie } from "@/utils/cookieHelpers";
import axios from "axios";
const API_URL = process.env.NEXT_PUBLIC_API_URL;

const useShops = (selectedCategory, selectedCountry) => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [products, setProducts] = useState([]);


    useEffect(() => {
        fetchShops(selectedCategory);
    }, [selectedCategory]);
    useEffect(() => {
        fetchShops(selectedCountry);
    }, [selectedCountry]);

    const fetchShops = async () => {
        const accessToken = getCookie("accessToken");
        setIsLoading(true);
        setError(null);
        try {
            let categoryQueryParam = "";
            if (selectedCategory && selectedCategory.length > 0) {
                categoryQueryParam = `?category=${selectedCategory.join(",")}`;
            }
            const response = await axios.get(
                `${API_URL}/api/catalog/sites/list/${categoryQueryParam}${selectedCountry ? `${categoryQueryParam ? '&' : '?'}country=${selectedCountry}` : ""}`,
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
        fetchShops();
    }, []);

    const addShops = async (name, category, country, logo, description, url) => {
        const accessToken = getCookie("accessToken");
        const formData = new FormData();
        formData.append("name", name);
        formData.append("category", category);
        formData.append("country", country);
        formData.append("logo", logo);
        formData.append("description", description);
        formData.append("url", url);

        setIsLoading(true);
        setError(null);
        setIsSuccess(false);

        try {
            const response = await axios.post(
                `${API_URL}/api/catalog/sites/create/`,
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                        "Content-Type": "multipart/form-data",
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
                `${API_URL}/api/catalog/sites/delete/${productId}/`,
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                }
            );

            setProducts((currentProducts) =>
                currentProducts.filter((product) => product.id !== productId)
            );
            fetchShops();
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
                `${API_URL}/api/catalog/sites/update/${productId}/`,
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                }
            );
            fetchShops();
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
        fetchShops,
        updateShops,
        error,
        isLoading,
    };
};

export default useShops;

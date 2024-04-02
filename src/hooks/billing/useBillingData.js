// useUserData.js
import axios from 'axios';
import { getCookie } from '@/utils/cookieHelpers';
import { useEffect, useState } from 'react';

const useBillingData = (name) => {
    const [billingData, setBillingData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    console.log(name,"name")

    useEffect(() => {
        const fetchUserData = async () => {
            const accessToken = getCookie('accessToken');
            if (!accessToken) {
                setError('No access token found');
                setLoading(false);
                return;
            }

            try {
                const response = await axios.get(
                    'http://18.222.184.72:8000/api/billing/my_billings/',
                    {
                        headers: {
                            Authorization: `Bearer ${accessToken}`,
                        },
                    }
                );

                setBillingData(response.data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, []);
    const deleteBilling = async (productId) => {
        setLoading(true);
        setError(null);

        try {
            const accessToken = getCookie("accessToken");
            const response = await axios.delete(
                `http://18.222.184.72:8000/api/billing/delete/${productId}/`,
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                }
            );

            setBillingData((currentProducts) =>
                currentProducts.filter((product) => product.id !== productId)
            );
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };
    const updateBilling = async (productId, formData) => {
        setLoading(true);
        setError(null);

        try {
            const accessToken = getCookie("accessToken");
            const response = await axios.patch(
                `http://18.222.184.72:8000/api/billing/update/${productId}/`,
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                }
            );

            const updatedProduct = response.data;
            setBillingData((currentProducts) =>
                currentProducts.map((product) =>
                    product.id === productId ? { ...product, ...updatedProduct } : product
                )
            );
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    return { billingData,deleteBilling, updateBilling, loading, error };
};

export default useBillingData;

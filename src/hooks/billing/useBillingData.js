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

    return { billingData, loading, error };
};

export default useBillingData;

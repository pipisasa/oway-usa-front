import { useEffect, useState } from "react";
import { getCookie } from "@/utils/cookieHelpers";
import axios from "axios";

const useCountries = () => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [countries, setCountries] = useState([]);

    const fetchShops = async () => {
        const accessToken = getCookie("accessToken");
        setIsLoading(true);
        setError(null);
        try {
            const response = await axios.get(
                "http://18.222.184.72:8000/api/countries/list/",
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    }
                }
            );
            setCountries(response.data);
        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };


    useEffect(() => {
        fetchShops();
    }, []);


    return {
        countries,
        error,
        isLoading,
    };
};

export default useCountries;

import { useState } from "react";
import { setCookie } from "@/utils/cookieHelpers";
import { useRouter } from "next/router";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const useActivation = () => {
    const [error, setError] = useState(null);
    const router = useRouter();

    const activation = async (email, code) => {
        try {
            const response = await fetch(
                `${API_URL}/api/users/activation_account/`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ email, code }),
                }
            );

            const data = await response.json();

            if (response.ok) {
                router.push("/auth/login");
            } else {
                setError(data.detail || "Вы ввели не правильный номер!");
            }
        } catch (error) {
            setError("Вы ввели не правильный номер!");
        }
    };

    return { activation, error };
};

export default useActivation;

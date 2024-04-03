import { useEffect, useState } from "react";
import { getCookie } from "@/utils/cookieHelpers";
import axios from "axios";

const useUsersAdmin = () => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [users, setUsers] = useState([]);

    const fetchUsers = async () => {
        const accessToken = getCookie("accessToken");
        setIsLoading(true);
        setError(null);
        try {
            const response = await axios.get(
                "http://18.222.184.72:8000/api/add_user_for_admin/list/",
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    }
                }
            );
            setUsers(response.data);
        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };


    useEffect(() => {
        fetchUsers();
    }, []);

    const addUsers = async (first_name, last_name, email, phone_number, password, password2) => {
        const accessToken = getCookie("accessToken");
        const formData = new FormData();
        formData.append("first_name", first_name);
        formData.append("last_name", last_name);
        formData.append("email", email);
        formData.append("phone_number", phone_number);
        formData.append("password", password);
        formData.append("password2", password2);

        setIsLoading(true);
        setError(null);
        setIsSuccess(false);

        try {
            const response = await axios.post(
                "http://18.222.184.72:8000/api/add_user_for_admin/add/",
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            await fetchUsers();
            setIsSuccess(true);
        } catch (error) {
            setError(error.message);
            setIsSuccess(false);
        } finally {
            setIsLoading(false);
        }
    };


    const deleteUsers = async (productId) => {
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

            setUsers((currentProducts) =>
                currentProducts.filter((product) => product.id !== productId)
            );
            fetchUsers()
        } catch (error) {
            setError(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    const updateUsers = async (productId, formData) => {
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
            fetchUsers()
            const updatedProduct = response.data;
            setUsers((currentProducts) =>
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
        users,
        addUsers,
        deleteUsers,
        updateUsers,
        error,
        isLoading,
    };
};

export default useUsersAdmin;

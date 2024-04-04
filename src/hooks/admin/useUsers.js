import { useEffect, useState } from "react";
import axios from "axios";
import { getCookie } from "@/utils/cookieHelpers";

const axiosInstance = axios.create({
    baseURL: "http://18.222.184.72:8000/api/add_user_for_admin/",
    headers: {
        "Content-Type": "multipart/form-data",
    },
});

const useUsersAdmin = () => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [users, setUsers] = useState([]);
    const [totalCount, setTotalCount] = useState(0);

    const fetchUsers = async (page) => {
        const accessToken = getCookie("accessToken");
        setIsLoading(true);
        setError(null);
        try {
            const response = await axiosInstance.get(`list/?page=${page}`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            setUsers(response.data);
            setTotalCount(response.data.count);
        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const addUsers = async (
        first_name,
        last_name,
        email,
        phone_number,
        password,
        password2,
        front_image,
        back_image
    ) => {
        const accessToken = getCookie("accessToken");
        const formData = new FormData();
        formData.append("first_name", first_name);
        formData.append("last_name", last_name);
        formData.append("email", email);
        formData.append("phone_number", phone_number);
        formData.append("password", password);
        formData.append("password2", password2);
        formData.append("front_image", front_image);
        formData.append("back_image", back_image);

        setIsLoading(true);
        setError(null);
        setIsSuccess(false);

        try {
            await axiosInstance.post("add/", formData, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            await fetchUsers();
            setIsSuccess(true);
        } catch (error) {
            setError(error.message);
            setIsSuccess(false);
        } finally {
            setIsLoading(false);
        }
    };

    const deleteUsers = async (userId) => {
        setIsLoading(true);
        setError(null);
        try {
            const accessToken = getCookie("accessToken");
            await axiosInstance.delete(`delete/${userId}/`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            await fetchUsers();
        } catch (error) {
            setError(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    const updateUsers = async (userId, formData) => {
        setIsLoading(true);
        setError(null);
        try {
            const accessToken = getCookie("accessToken");
            await axiosInstance.patch(`update/${userId}/`, formData, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            await fetchUsers();
        } catch (error) {
            setError(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    return {
        users,
        totalCount,
        addUsers,
        deleteUsers,
        updateUsers,
        error,
        isLoading,
        fetchUsers,
    };
};

export default useUsersAdmin;

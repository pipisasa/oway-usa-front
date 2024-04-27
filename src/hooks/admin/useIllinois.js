import React, { useState } from "react";
import axios from "axios";
// import Form from "./Form";
import Illinois from "@/pages/size-chart/Illinois";

function useIllinois() {
  const [formData, setFormData] = useState({
    full_name: "",
    address: "",
    phone_number: "",
    cargo_weight: 0,
    email: "",
    telegram: "",
    whatsapp: "",
    status: true,
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "https://api-owayusa.com/api/otside_of_illinois/add/",
        formData
      );
      console.log("Response:", response.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  // return (
  //   <Illinois
  //     formData={formData}
  //     handleSubmit={handleSubmit}
  //     handleChange={handleChange}
  //   />
  // );
  return {
    formData,
    handleChange,
    handleSubmit,
  };
}

export default useIllinois;

import React, { useEffect } from "react";
import apiService from "../app/apiServer";

function Companies() {
  useEffect(() => {
    const getCompanies = async () => {
      try {
        const response = await apiService.get("/companies");
        console.log(response);
        //  setCompanies(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    getCompanies();
  }, []);
  return <div>Companies</div>;
}

export default Companies;

"use client";
import axios from "axios";
import { useEffect, useState } from "react";

function YourComponent() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("react-is/app/api/fetch_data.php"); // Adjust the URL here
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // Render your data
  return (
    <div>
      {data.map((item, index) => (
        <div key={index}>{item.item_name}</div>
      ))}
    </div>
  );
}

export default YourComponent;

import axios from "axios";
import { useEffect, useState } from "react";

export default function GetData(url) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        const response = await axios.get(url);

        if (isMounted && response?.data) {
          setData(response.data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        if (isMounted) {
          setError("Failed to load data. Please try again later.");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, []);

  return { data, loading, error };
}

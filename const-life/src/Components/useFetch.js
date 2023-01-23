import { useState, useEffect } from "react";
import axios from "axios";


const useFetch = (url) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
          try {
            const headers = {
                'X-Api-Key': "svk6n8hJI1GXYqqttVssUA==TBbGIqdBLWWSxAsv"
            }
            const response = await axios.get(url, {headers});
            setData(response.data);
          } catch (err) {
            setError(err);
          } finally {
            setLoading(false);
          }
        };
        fetchData();
      }, [url]);

    return { data, loading, error };
}

export default useFetch;
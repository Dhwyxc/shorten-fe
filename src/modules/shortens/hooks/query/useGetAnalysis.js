import { useQuery } from "react-query";
import axios from "axios";
import { fetchAnalysis } from "@modules/shortens/services";
const useGetAnalysis = (id, queries) => {
  const query = useQuery(["analysis", id, queries], async () => {
    const data = await fetchAnalysis(id, queries);
    return data;
  });
  return query;
};
export default useGetAnalysis;

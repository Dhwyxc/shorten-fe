import { useQuery } from "react-query";
import axios from "axios";
const useGetIpInfo = () => {
  const query = useQuery(["info-ip"], async () => {

    const { data } = await axios.get(`https://ipwhois.app/json/`);

    if (data?.success)
      return data;
  });
  return query;
};
export default useGetIpInfo;

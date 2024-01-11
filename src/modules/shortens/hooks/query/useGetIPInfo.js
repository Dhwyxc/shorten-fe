import { useQuery } from "react-query";
import axios from "axios";
const useGetIpInfo = () => {
  const query = useQuery(["info-ip"], async () => {
    // const cache = customSessionStore.getItem("168Chat-info-ip");
    // if (cache) return JSON.parse(cache);
    const { data } = await axios.get(`https://ipwhois.app/json/`);

    if (data?.success)
      //   customSessionStore.setItem("168Chat-info-ip", JSON.stringify(data));
      return data;
  });
  return query;
};
export default useGetIpInfo;

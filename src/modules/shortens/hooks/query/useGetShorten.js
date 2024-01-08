import { getShorten } from "../../services/index";
import { useQuery } from "react-query";

const useGetShorten = (query) => {
  return useQuery({
    queryKey:["shortens",query],
    queryFn:async () => {
      return await getShorten(query);
    }
  });
};

export default useGetShorten;

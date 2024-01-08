import { showShorten } from "../../services/index";
import { useQuery } from "react-query";

const useShowShorten = (query) => {
  return useQuery(
    ["detail-shortens", query],
    async () => {
      return await showShorten(query);
    },
    {
      retry: 0,
    }
  );
};

export default useShowShorten;

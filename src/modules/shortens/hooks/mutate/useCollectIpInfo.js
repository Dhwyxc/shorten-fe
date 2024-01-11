import { collectInfo } from "../../services/index";
import { useMutation, useQueryClient } from "react-query";

const useCollectIpInfo = (id) => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (formData) => {
      return await collectInfo(id, formData);
    },
  });
};

export default useCollectIpInfo;

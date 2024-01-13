import { collectInfo } from "../../services/index";
import { useMutation, useQueryClient } from "react-query";

const useCollectIpInfo = (id) => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (formData) => {
      return await collectInfo(id, formData);
    },
    onSuccess:()=>{
      console.log("x");
    }
  });
};

export default useCollectIpInfo;

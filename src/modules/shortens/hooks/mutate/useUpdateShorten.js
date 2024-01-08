import { updateShorten } from "../../services/index";
import { useMutation, useQueryClient } from "react-query";

const useUpdateShorten = () => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn:async ({_id,formData}) => {
      return await updateShorten(_id,formData);
    },
    onSuccess:()=>{
      
      qc.invalidateQueries(['shortens'])
    }
  });
};

export default useUpdateShorten;

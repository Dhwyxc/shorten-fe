import { createBulkShorten } from "../../services/index";
import { useMutation, useQueryClient } from "react-query";

const useCreateBulkShorten = () => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn:async (formData) => {
      return await createBulkShorten(formData);
    },
    onSuccess:()=>{
      qc.invalidateQueries(['shortens'])
    }
  });
};

export default useCreateBulkShorten;

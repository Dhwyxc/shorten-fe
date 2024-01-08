import { deleteBulkShorten } from "../../services/index";
import { useMutation, useQueryClient } from "react-query";

const useDeleteBulkShorten = () => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn:async (formData) => {
      return await deleteBulkShorten(formData);
    },
    onSuccess:()=>{
      qc.invalidateQueries(['shortens'])
    }
  });
};

export default useDeleteBulkShorten;

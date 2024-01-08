import { createShorten } from "../../services/index";
import { useMutation, useQueryClient } from "react-query";

const useCreateShorten = () => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn:async (formData) => {
      return await createShorten(formData);
    },
    onSuccess:()=>{
      qc.invalidateQueries(['shortens'])
    }
  });
};

export default useCreateShorten;

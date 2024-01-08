import { deleteShorten } from "../../services/index";
import { useMutation, useQueryClient } from "react-query";

const useDeleteShorten = () => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn:async (_id) => {
      return await deleteShorten(_id);
    },
    onSuccess:()=>{
      qc.invalidateQueries(['shortens'])
    }
  });
};

export default useDeleteShorten;

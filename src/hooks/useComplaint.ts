import { useMutation, useQuery } from "@tanstack/react-query";
import { complaintService } from "../services/complaint";
import { useInvalidateQueries } from "./useInvalidateQueries";

export const useSelfComplaints = () => {
  return useQuery({
    queryKey: ["selfComplaints"],
    queryFn: () => complaintService.getSelfComplaints().then((res) => res.data),
  });
};

export const useCreateComplaint = () => {
  const invalidate = useInvalidateQueries();
  return useMutation({
    mutationFn: complaintService.createComplaint,
    onSuccess: () => {
      invalidate("getSelfComplaints");
    },
  });
};

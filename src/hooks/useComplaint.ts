import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { complaintService } from '../services/complaint';

export const useSelfComplaints = () => {
  return useQuery({
    queryKey: ['selfComplaints'],
    queryFn: () => complaintService.getSelfComplaints().then(res => res.data),
  });
};

export const useCreateComplaint = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: complaintService.createComplaint,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['selfComplaints'] });
    },
  });
};
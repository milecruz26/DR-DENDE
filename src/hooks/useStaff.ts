import { useMutation, useQuery } from "@tanstack/react-query";
import { staffService } from "../services/staff";
import { useInvalidateQueries } from "./useInvalidateQueries";

// Exemplo para eventos
export const useAllEvents = () => {
  return useQuery({
    queryKey: ["events"],
    queryFn: () => staffService.getAllEvents().then((res) => res.data),
    staleTime: 1000 * 60 * 10, // 5 minutos sem refetch
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
};

//Criar evento
export const useCreateEvent = () => {
  const invalidate = useInvalidateQueries();
  return useMutation({
    mutationFn: staffService.createEvent,

    onSuccess: (data) => {
      console.log("✅ EVENTO CRIADO:", data);
      invalidate("getAllEvents");
    },

    onError: (error: any) => {
      console.log(
        "❌ ERRO AO CRIAR EVENTO:",
        error.response?.data,
        error.response?.status,
      );
    },
  });
};

// Criar entry
export const useCreateEntry = () => {
  const invalidate = useInvalidateQueries();
  return useMutation({
    mutationFn: staffService.createEntry,

    onSuccess: () => {
      invalidate("getAllEntries");
    },
  });
};

// Atualizar entry
export const useUpdateEntry = () => {
  const invalidate = useInvalidateQueries();
  return useMutation({
    mutationFn: staffService.updateEntry,

    onSuccess: () => {
      invalidate("getAllEntries");
    },
  });
};

// Deletar entry
export const useDeleteEntry = () => {
  const invalidate = useInvalidateQueries();
  return useMutation({
    mutationFn: staffService.deleteEntry,

    onSuccess: () => {
      invalidate("getAllEntries");
    },
  });
};

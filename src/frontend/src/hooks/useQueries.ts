import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { EnquiryInput } from "../backend.d";
import { useActor } from "./useActor";

export function useSubmitEnquiry() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (input: EnquiryInput) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.submitEnquiry(input);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["enquiries"] });
    },
  });
}

export function useGetAllEnquiries() {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["enquiries"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllEnquiries();
    },
    enabled: !!actor && !isFetching,
  });
}

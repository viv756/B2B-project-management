import { useQuery } from "@tanstack/react-query";

import { getMembersInWorkspaceQueryFn } from "@/lib/api";

const useGetWorkspaceMemmbers = (workspaceId: string) => {
  const query = useQuery({
    queryKey: ["members", workspaceId],
    queryFn: () => getMembersInWorkspaceQueryFn(workspaceId),
    staleTime: Infinity,
  });

  return query;
};

export default useGetWorkspaceMemmbers;

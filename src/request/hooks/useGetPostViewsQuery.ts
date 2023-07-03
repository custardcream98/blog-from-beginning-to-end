import { useLocalStorageState } from "src/hook";

import { getPostViews } from "../axios";
import { getUseGetPostViewsQueryKey } from "../query-keys";

import { useQuery } from "@tanstack/react-query";

const REFETCH_INTERVAL = 5_000;
const LOCALSTORAGE_LAST_VIEWED_KEY = "lastViewed";

export const useGetPostViewsQuery = (title: string) => {
  const LOCALSTORAGE_KEY = `${LOCALSTORAGE_LAST_VIEWED_KEY}-${title}`;
  const [viewedAt, setViewedAt] = useLocalStorageState<number | undefined>(
    LOCALSTORAGE_KEY,
    undefined,
  );
  return useQuery({
    onSuccess: ({ isIncreased }) => {
      if (isIncreased) {
        setViewedAt(Date.now());
      }
    },
    queryFn: () => getPostViews({ title, viewedAt }),
    queryKey: getUseGetPostViewsQueryKey(title),
    refetchInterval: REFETCH_INTERVAL,
    refetchOnMount: "always",
  });
};

import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import findIndex from "lodash/findIndex";
import cloneDeep from "lodash/cloneDeep";
import { v4 as uuidv4 } from "uuid";
import {
  DUMMY_VIDEO,
  VIDEO_INFO_URL,
  VIDEO_INFO_KEY,
  VIDEO_LIST_KEY,
  VOTE,
} from "@/constants";
import Axios from "@/configs/axios";

export const useVideoList = () => {
  return useQuery([VIDEO_LIST_KEY], async () => {
    return DUMMY_VIDEO;
  });
};

export const useVideoInfo = (link) => {
  return useQuery([VIDEO_INFO_KEY, link], async () => {
    const { data } = await Axios.get(VIDEO_INFO_URL.replace(":link", link));
    return data;
  });
};

export const useVoting = (videoId) => {
  const queryClient = useQueryClient();
  const {
    mutate: doVoting,
    isLoading,
    isSuccess,
  } = useMutation((vote) => {
    queryClient.setQueryData([VIDEO_LIST_KEY], (prev) => {
      const newList = cloneDeep(prev);
      const itemIndex = findIndex(newList, (item) => item?.id === videoId);
      const { like = 0, dislike = 0 } = newList[itemIndex];
      if (vote) {
        newList[itemIndex]["vote"] = VOTE.LIKE;
        newList[itemIndex]["like"] = like + 1;
      } else {
        newList[itemIndex]["vote"] = VOTE.DISLIKE;
        newList[itemIndex]["dislike"] = dislike + 1;
      }

      return [...newList];
    });
    return null;
  });

  return { doVoting, isLoading, isSuccess };
};

export const useShare = ({ onSuccess }) => {
  const queryClient = useQueryClient();
  const {
    mutate: doShare,
    isLoading,
    isSuccess,
  } = useMutation(({ link, description, sharedBy }) => {
    queryClient.setQueryData([VIDEO_LIST_KEY], (prev) => {
      const old = prev || DUMMY_VIDEO;
      const newVideo = {
        id: uuidv4(),
        link,
        description,
        sharedBy,
        like: 0,
        dislike: 0,
      };
      return [newVideo, ...old];
    });
    onSuccess?.();
    return null;
  });

  return { doShare, isLoading, isSuccess };
};

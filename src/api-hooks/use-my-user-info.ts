import { useSettings } from "../contexts/settings-provider";
import { useGetUserIdQuery } from "../generated/graphql";

export const useMyUserInfo = () => {
  const { environmentConfig } = useSettings();

  const { loading, error, data } = useGetUserIdQuery({
    variables: {
      email: environmentConfig.myUserEmail,
    },
    skip: !environmentConfig.myUserEmail,
  });

  const userId = data?.users?.[0]?.id;

  return {
    loading,
    error,
    userId,
  };
};

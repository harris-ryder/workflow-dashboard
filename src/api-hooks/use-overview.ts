import { useQuery } from "@apollo/client";
import { GET_USER_OVERVIEW_BY_ID } from "../graphql/get-user-overview";
import { GET_USER_OVERVIEW_BY_EMAIL } from "../graphql/get-user-overview";
import type {
  UserDataByEmailQuery,
  UserDataByIdQuery,
} from "../generated/graphql";

type UseOverviewProps = {
  id?: string;
  email?: string;
};

export const useOverview = ({ id, email }: UseOverviewProps) => {
  if (!id && !email) {
    throw new Error("Either 'id' or 'email' must be provided.");
  }

  const query = id ? GET_USER_OVERVIEW_BY_ID : GET_USER_OVERVIEW_BY_EMAIL;
  const variables = id ? { userId: id } : { email };

  const { loading, error, data } = useQuery<
    UserDataByEmailQuery | UserDataByIdQuery
  >(query, {
    variables,
  });

  return { loading, error, data };
};

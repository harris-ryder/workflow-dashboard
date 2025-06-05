import {
  useUserDataByEmailQuery,
  type UserDataByEmailQuery,
} from "../generated/graphql";

type UseOverviewProps = {
  userId?: string;
  email?: string;
};

type AccountUser = NonNullable<
  UserDataByEmailQuery["users"][0]["accountUsers"][0]
>;
type Project = NonNullable<AccountUser["account"]["projects"][0]>;
type Document = NonNullable<Project["documents"][0]>;

export type UserData = Pick<
  NonNullable<UserDataByEmailQuery["users"][0]>,
  | "id"
  | "firstName"
  | "lastName"
  | "profilePictureUrl"
  | "email"
  | "createdAt"
  | "lastSignInAt"
>;

export type FormattedOverviewItem = {
  account: {
    id: AccountUser["account"]["id"];
    name: AccountUser["account"]["name"];
  };
  project: {
    id: Project["id"];
    name: Project["name"];
  };
  document: {
    id: Document["id"];
    name: Document["name"];
  };
};

export const useOverview = ({ userId, email }: UseOverviewProps) => {
  const { loading, error, data } = useUserDataByEmailQuery({
    variables: {
      email: email ?? "",
    },
  });

  const overview = data?.users?.[0]?.accountUsers;

  const userData = data?.users?.[0]
    ? ({
        id: data.users[0].id,
        firstName: data.users[0].firstName,
        lastName: data.users[0].lastName,
        profilePictureUrl: data.users[0].profilePictureUrl,
        email: data.users[0].email,
        createdAt: data.users[0].createdAt,
        lastSignInAt: data.users[0].lastSignInAt,
      } as UserData)
    : undefined;

  const formattedOverview = overview?.flatMap((accountUsers) =>
    accountUsers.account.projects.flatMap((project) =>
      project.documents.map((document) => ({
        account: {
          id: accountUsers.account.id,
          name: accountUsers.account.name,
        },
        project: {
          id: project.id,
          name: project.name,
        },
        document: {
          id: document.id,
          name: document.name,
        },
      }))
    )
  ) as FormattedOverviewItem[] | undefined;

  return { loading, error, data: { userData, formattedOverview } };
};

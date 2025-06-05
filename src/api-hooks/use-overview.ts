import {
  useUserAccountsQuery,
  useUserDataByEmailQuery,
  useUserDataByIdQuery,
  type UserDataByEmailQuery,
} from "../generated/graphql";

type UseOverviewProps = {
  customerId?: string;
  customerEmail?: string;
  myUserEmail?: string;
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

export type UserDocumentsItem = {
  account: {
    id: AccountUser["account"]["id"];
    name: AccountUser["account"]["name"];
    isMyUserAccountMember: boolean;
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

export const useOverview = ({
  customerId,
  customerEmail,
  myUserEmail,
}: UseOverviewProps) => {
  const {
    loading: loadingEmail,
    error: errorEmail,
    data: dataEmail,
  } = useUserDataByEmailQuery({
    variables: {
      email: customerEmail ?? "",
    },
    skip: !customerEmail,
  });

  const {
    loading: loadingUserId,
    error: errorUserId,
    data: dataUserId,
  } = useUserDataByIdQuery({
    variables: {
      userId: customerId ?? "",
    },
    skip: !customerId,
  });

  const { data: myUserAccountsData } = useUserAccountsQuery({
    variables: {
      email: myUserEmail ?? "",
    },
    skip: !myUserEmail,
  });

  const customerData = customerEmail ? dataEmail : dataUserId;
  const customerDataLoading = customerEmail ? loadingEmail : loadingUserId;
  const customerDataError = customerEmail ? errorEmail : errorUserId;

  const myUserAccountsIds =
    myUserAccountsData?.users?.[0]?.accountUsers?.map(
      (accountUser) => accountUser.account.id
    ) ?? [];

  const customerUserData = customerData?.users?.[0]
    ? ({
        id: customerData.users[0].id,
        firstName: customerData.users[0].firstName,
        lastName: customerData.users[0].lastName,
        profilePictureUrl: customerData.users[0].profilePictureUrl,
        email: customerData.users[0].email,
        createdAt: customerData.users[0].createdAt,
        lastSignInAt: customerData.users[0].lastSignInAt,
      } as UserData)
    : undefined;

  const customerDocumentData = customerData?.users?.[0]?.accountUsers?.flatMap(
    (accountUsers) =>
      accountUsers.account.projects.flatMap((project) =>
        project.documents.map((document) => ({
          account: {
            id: accountUsers.account.id,
            name: accountUsers.account.name,
            isMyUserAccountMember: myUserAccountsIds.includes(
              accountUsers.account.id
            ),
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
  ) as UserDocumentsItem[] | undefined;

  return {
    loading: customerDataLoading,
    error: customerDataError,
    data: { customerUserData, customerDocumentData },
  };
};

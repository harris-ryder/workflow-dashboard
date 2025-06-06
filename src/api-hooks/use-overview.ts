import {
  useGetUserIdQuery,
  useUserDataByIdQuery,
  useUserDocumentsQuery,
  type UserDataByIdQuery,
} from "../generated/graphql";

type UseOverviewProps = {
  customerId?: string;
  customerEmail?: string;
  myUserEmail?: string;
};

type AccountUser = NonNullable<
  NonNullable<UserDataByIdQuery["usersByPk"]>["accountUsers"][0]
>;
type Project = NonNullable<AccountUser["account"]["projects"][0]>;
type Document = NonNullable<Project["documents"][0]>;

export type UserData = Pick<
  NonNullable<UserDataByIdQuery["usersByPk"]>,
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
  };
  project: {
    id: Project["id"];
    name: Project["name"];
  };
  document: {
    id: Document["id"];
    name: Document["name"];
    isMyUserDocumentMember: boolean;
    slug: Document["slug"];
  };
};

export const useOverview = ({
  customerId,
  customerEmail,
  myUserEmail,
}: UseOverviewProps) => {
  // Fetch customer user id if customerEmail is provided
  const { data: dataCustomerUserId } = useGetUserIdQuery({
    variables: {
      email: customerEmail ?? "",
    },
    skip: !customerEmail || !!customerId,
  });
  const customerUserId = dataCustomerUserId?.users?.[0]?.id ?? customerId;

  // Fetch customer data by id
  const {
    loading: customerDataLoading,
    error: customerDataError,
    data: customerData,
  } = useUserDataByIdQuery({
    variables: {
      userId: customerUserId ?? "",
    },
    skip: !customerUserId,
  });

  // Get my user id
  const { data: myUserIdData } = useGetUserIdQuery({
    variables: {
      email: myUserEmail ?? "",
    },
    skip: !myUserEmail,
  });
  const myUserId = myUserIdData?.users?.[0]?.id;

  // Fetch my user documents
  const { data: myUserDocumentsData } = useUserDocumentsQuery({
    variables: {
      userId: myUserId ?? "",
    },
    skip: !myUserId,
  });

  // Get my user documents ids
  const myUserDocumentsIds =
    myUserDocumentsData?.usersByPk?.documentUsers?.map(
      (documentUser) => documentUser.document.id
    ) ?? [];

  // Extract customer user data
  const customerUserData = customerData?.usersByPk
    ? ({
        id: customerData.usersByPk.id,
        firstName: customerData.usersByPk.firstName,
        lastName: customerData.usersByPk.lastName,
        profilePictureUrl: customerData.usersByPk.profilePictureUrl,
        email: customerData.usersByPk.email,
        createdAt: customerData.usersByPk.createdAt,
        lastSignInAt: customerData.usersByPk.lastSignInAt,
      } as UserData)
    : undefined;

  // Extract customer document data
  const customerDocumentData = customerData?.usersByPk?.accountUsers?.flatMap(
    (accountUsers) =>
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
            isMyUserDocumentMember: myUserDocumentsIds.includes(document.id),
            slug: document.slug,
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

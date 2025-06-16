import { useCallback, useMemo } from "react";
import {
  useUserDocumentsQuery,
  useCreateAccountUserMutation,
  useCreateDocumentUserMutation,
  useDeleteAccountUserMutation,
  useDeleteDocumentUserMutation,
} from "../generated/graphql";
import { useMyUserInfo } from "./use-my-user-info";
import { useSettings } from "../contexts/settings-provider";

export const useMutationJoinDocument = () => {
  const [createAccountUser] = useCreateAccountUserMutation({
    refetchQueries: ["UserDataById", "UserDocuments"],
  });
  const [createDocumentUser] = useCreateDocumentUserMutation({
    refetchQueries: ["UserDataById", "UserDocuments"],
  });
  const [deleteAccountUser] = useDeleteAccountUserMutation({
    refetchQueries: ["UserDataById", "UserDocuments"],
  });
  const [deleteDocumentUser] = useDeleteDocumentUserMutation({
    refetchQueries: ["UserDataById", "UserDocuments"],
  });

  const { userId } = useMyUserInfo();
  const { environmentConfig } = useSettings();

  // Check if account user exists
  const { data: accountUserData } = useUserDocumentsQuery({
    variables: { userId: String(userId) },
    skip: !userId,
  });

  const userAccountIds = useMemo(
    () =>
      accountUserData?.usersByPk?.accountUsers.map(
        (accountUser) => accountUser.account.id
      ) ?? [],
    [accountUserData]
  );

  const userDocumentIds = useMemo(
    () =>
      accountUserData?.usersByPk?.documentUsers.map(
        (documentUser) => documentUser.document.id
      ) ?? [],
    [accountUserData]
  );

  const joinDocument = useCallback(
    async ({
      userId,
      accountId,
      documentId,
    }: {
      userId: string;
      accountId: string;
      documentId: string;
    }) => {
      try {
        const promises = [];

        if (!userAccountIds.includes(accountId)) {
          promises.push(
            createAccountUser({
              variables: {
                userId,
                accountId,
                email: environmentConfig.myUserEmail,
              },
            })
          );
        }

        if (!userDocumentIds.includes(documentId)) {
          promises.push(
            createDocumentUser({
              variables: {
                userId,
                documentId,
                accountId,
              },
            })
          );
        }

        // Wait for all operations to complete
        await Promise.all(promises);

        return { success: true };
      } catch (error) {
        console.error("Error joining document:", error);
        return { success: false, error };
      }
    },
    [createAccountUser, createDocumentUser, userAccountIds, userDocumentIds, environmentConfig.myUserEmail]
  );

  const leaveDocument = useCallback(
    async ({
      userId,
      accountId,
      documentId,
    }: {
      userId: string;
      accountId: string;
      documentId: string;
    }) => {
      try {
        const promises = [];

        // Only delete if user exists on the account
        if (userAccountIds.includes(accountId)) {
          promises.push(
            deleteAccountUser({
              variables: {
                userId,
                accountId,
              },
            })
          );
        }

        // Only delete if user exists on the document
        if (userDocumentIds.includes(documentId)) {
          promises.push(
            deleteDocumentUser({
              variables: {
                userId,
                documentId,
              },
            })
          );
        }

        // Wait for all operations to complete
        await Promise.all(promises);

        return { success: true };
      } catch (error) {
        console.error("Error leaving document:", error);
        return { success: false, error };
      }
    },
    [deleteAccountUser, deleteDocumentUser, userAccountIds, userDocumentIds]
  );

  return { joinDocument, leaveDocument };
};

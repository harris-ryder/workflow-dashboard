import { useCallback, useMemo } from "react";
import {
  useUserDocumentsQuery,
  useCreateAccountUserMutation,
  useCreateDocumentUserMutation,
  useCreateProjectUserMutation,
  useDeleteAccountUserMutation,
  useDeleteDocumentUserMutation,
  useDeleteProjectUserMutation,
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
  const [createProjectUser] = useCreateProjectUserMutation({
    refetchQueries: ["UserDataById", "UserDocuments"],
  });
  const [deleteAccountUser] = useDeleteAccountUserMutation({
    refetchQueries: ["UserDataById", "UserDocuments"],
  });
  const [deleteDocumentUser] = useDeleteDocumentUserMutation({
    refetchQueries: ["UserDataById", "UserDocuments"],
  });
  const [deleteProjectUser] = useDeleteProjectUserMutation({
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

  const userProjectIds = useMemo(
    () =>
      accountUserData?.usersByPk?.projectUsers?.map(
        (projectUser) => projectUser.project.id
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

  const documentToProjectMap = useMemo(
    () => {
      const map = new Map<string, string>();
      accountUserData?.usersByPk?.documentUsers.forEach((documentUser) => {
        if (documentUser.document.project?.id) {
          map.set(documentUser.document.id, documentUser.document.project.id);
        }
      });
      return map;
    },
    [accountUserData]
  );

  const joinDocument = useCallback(
    async ({
      userId,
      accountId,
      documentId,
      projectId,
    }: {
      userId: string;
      accountId: string;
      documentId: string;
      projectId?: string;
    }) => {
      try {
        const promises = [];

        // Get project ID from document if not provided
        const effectiveProjectId = projectId || documentToProjectMap.get(documentId);

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

        if (effectiveProjectId && !userProjectIds.includes(effectiveProjectId)) {
          promises.push(
            createProjectUser({
              variables: {
                userId,
                projectId: effectiveProjectId,
                accountId,
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
    [
      createAccountUser,
      createDocumentUser,
      createProjectUser,
      userAccountIds,
      userProjectIds,
      userDocumentIds,
      documentToProjectMap,
      environmentConfig.myUserEmail,
    ]
  );

  const leaveDocument = useCallback(
    async ({
      userId,
      accountId,
      documentId,
      projectId,
    }: {
      userId: string;
      accountId: string;
      documentId: string;
      projectId?: string;
    }) => {
      try {
        const promises = [];

        // Get project ID from document if not provided
        const effectiveProjectId = projectId || documentToProjectMap.get(documentId);

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

        // Only delete if user exists on the project
        if (effectiveProjectId && userProjectIds.includes(effectiveProjectId)) {
          promises.push(
            deleteProjectUser({
              variables: {
                userId,
                projectId: effectiveProjectId,
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
    [
      deleteAccountUser,
      deleteDocumentUser,
      deleteProjectUser,
      userAccountIds,
      userProjectIds,
      userDocumentIds,
      documentToProjectMap,
    ]
  );

  return { joinDocument, leaveDocument };
};

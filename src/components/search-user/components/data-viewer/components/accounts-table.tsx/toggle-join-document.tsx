import { useMyUserInfo } from "../../../../../../api-hooks/use-my-user-info";
import { useSettings } from "../../../../../../contexts/settings-provider";
import { useCreateDocumentUserMutation } from "../../../../../../generated/graphql";
import { Button } from "../../../../../../ui/shadcn-primitives/button";

export const ToggleJoinDocument = ({
  documentId,
  accountId,
  isMember,
}: {
  documentId: string;
  accountId: string;
  isMember: boolean;
}) => {
  const [createDocumentUser] = useCreateDocumentUserMutation();
  const { userId } = useMyUserInfo();

  return (
    <Button
      variant={isMember ? "default" : "outline"}
      size="sm"
      onClick={() => {
        if (!userId) {
          return;
        }

        createDocumentUser({
          variables: {
            userId: userId ?? "",
            documentId: documentId,
            accountId: accountId,
          },
        });
      }}
    >
      {isMember ? "Leave" : "Join"}
    </Button>
  );
};

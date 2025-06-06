import { useMyUserInfo } from "../../../../../../api-hooks/use-my-user-info";
import SettingsDialog from "../../../../../../dialogs/settings-dialog";
import {
  useCreateDocumentUserMutation,
  useDeleteDocumentUserMutation,
} from "../../../../../../generated/graphql";
import { Button } from "../../../../../../ui/shadcn-primitives/button";
import { toast } from "sonner";

export const ToggleJoinDocument = ({
  documentId,
  accountId,
  isMember,
}: {
  documentId: string;
  accountId: string;
  isMember: boolean;
}) => {
  const [createDocumentUser] = useCreateDocumentUserMutation({
    refetchQueries: ["UserDataById", "UserDocuments"],
  });
  const [deleteDocumentUser] = useDeleteDocumentUserMutation({
    refetchQueries: ["UserDataById", "UserDocuments"],
  });
  const { userId } = useMyUserInfo();

  if (!userId) {
    return (
      <SettingsDialog
        trigger={
          <Button
            variant="outline"
            className="w-18"
            size="sm"
            onClick={() => {
              toast.error("Enter your email in the settings");
            }}
          >
            Join
          </Button>
        }
      />
    );
  }

  return (
    <Button
      variant={isMember ? "default" : "outline"}
      className="w-18"
      size="sm"
      onClick={() => {
        if (!userId) {
          return;
        }

        if (isMember) {
          deleteDocumentUser({
            variables: {
              userId: userId ?? "",
              documentId: documentId,
            },
          });
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

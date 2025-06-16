import { useMyUserInfo } from "../../../../../../api-hooks/use-my-user-info";
import { useMutationJoinDocument } from "../../../../../../api-hooks/use-mutation-join-document";
import SettingsDialog from "../../../../../../dialogs/settings-dialog";
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
  const { joinDocument, leaveDocument } = useMutationJoinDocument();
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
      onClick={async () => {
        if (!userId) {
          return;
        }

        if (isMember) {
          const result = await leaveDocument({
            userId: userId,
            documentId: documentId,
            accountId: accountId,
          });
          
          if (result.success) {
            toast.success("Successfully left the document");
          } else {
            toast.error("Failed to leave the document");
          }
          return;
        }

        const result = await joinDocument({
          userId: userId,
          documentId: documentId,
          accountId: accountId,
        });
        
        if (result.success) {
          toast.success("Successfully joined the document");
        } else {
          toast.error("Failed to join the document");
        }
      }}
    >
      {isMember ? "Leave" : "Join"}
    </Button>
  );
};

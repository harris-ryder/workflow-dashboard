import { Button } from "../../../../../../ui/shadcn-primitives/button";
import { useSettings } from "../../../../../../contexts/settings-provider";
import { SquareArrowOutUpRight } from "lucide-react";

export const OpenDocumentButton = ({
  documentSlug,
}: {
  documentSlug: string;
}) => {
  const { environmentConfig } = useSettings();

  const handleOpenDocument = () => {
    const documentUrl = `${environmentConfig.webUrl}/w/doc/${documentSlug}`;
    window.open(documentUrl, "_blank");
  };

  return (
    <Button
      variant="outline"
      className="h-8 w-8 p-0"
      onClick={handleOpenDocument}
    >
      <SquareArrowOutUpRight className="h-4 w-4" />
    </Button>
  );
};

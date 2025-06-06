import * as React from "react";
import { useState } from "react";
import {
  useSettings,
  type Environment,
  type EnvironmentConfig,
} from "../contexts/settings-provider";
import { Button } from "../ui/shadcn-primitives/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/shadcn-primitives/dialog";
import { Input } from "../ui/shadcn-primitives/input";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../ui/shadcn-primitives/tabs";
import { toast } from "sonner";

interface SettingsDialogProps {
  trigger: React.ReactNode;
}

interface SettingsFormProps {
  environmentConfig: EnvironmentConfig;
  onSubmit: (environmentConfig: EnvironmentConfig) => void;
}

function SettingsForm({ environmentConfig, onSubmit }: SettingsFormProps) {
  const [webUrl, setWebUrl] = useState(environmentConfig.webUrl);
  const [hasuraHttpUrl, setHasuraHttpUrl] = useState(
    environmentConfig.hasuraHttpUrl
  );
  const [hasuraWsUrl, setHasuraWsUrl] = useState(environmentConfig.hasuraWsUrl);
  const [adminSecret, setAdminSecret] = useState(environmentConfig.adminSecret);
  const [myUserEmail, setMyUserEmail] = useState(environmentConfig.myUserEmail);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const updatedEnvironmentConfig: EnvironmentConfig = {
      webUrl: webUrl,
      hasuraHttpUrl,
      hasuraWsUrl,
      adminSecret,
      myUserEmail,
    };
    onSubmit(updatedEnvironmentConfig);
    toast.success("Settings saved");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex flex-col gap-2">
        <label htmlFor="webUrl" className="text-sm text-muted-foreground">
          Web URL
        </label>
        <Input
          id="webUrl"
          type="text"
          name="webUrl"
          value={environmentConfig.webUrl}
          onChange={(e) => setWebUrl(e.target.value)}
          placeholder="Web URL"
          className="w-full"
        />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="httpUrl" className="text-sm text-muted-foreground">
          Hasura HTTP URI
        </label>
        <Input
          id="httpUrl"
          type="text"
          name="httpUrl"
          value={hasuraHttpUrl}
          onChange={(e) => setHasuraHttpUrl(e.target.value)}
          placeholder="GraphQL URI"
          className="w-full"
        />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="wsUrl" className="text-sm text-muted-foreground">
          Hasura WebSocket URI
        </label>
        <Input
          id="wsUrl"
          type="text"
          name="wsUrl"
          value={hasuraWsUrl}
          onChange={(e) => setHasuraWsUrl(e.target.value)}
          placeholder="GraphQL WebSocket URI"
          className="w-full"
        />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="adminSecret" className="text-sm text-muted-foreground">
          Hasura admin secret
        </label>
        <Input
          id="adminSecret"
          type="text"
          name="adminSecret"
          value={adminSecret}
          onChange={(e) => setAdminSecret(e.target.value)}
          placeholder="Admin Secret"
          className="w-full"
        />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="myUserEmail" className="text-sm text-muted-foreground">
          User email
        </label>
        <Input
          id="myUserEmail"
          type="text"
          name="myUserEmail"
          value={myUserEmail}
          onChange={(e) => setMyUserEmail(e.target.value)}
          placeholder="User Email"
          className="w-full"
        />
      </div>

      <div className="flex justify-end">
        <Button type="submit">Save</Button>
      </div>
    </form>
  );
}

function SettingsDialog({ trigger }: SettingsDialogProps) {
  const { settings, setSettings, environment } = useSettings();

  const handleSave =
    (environment: Environment) => (environmentConfig: EnvironmentConfig) => {
      setSettings({
        ...settings,
        [environment]: environmentConfig,
      });
    };

  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Settings</DialogTitle>
          <DialogDescription>
            Configure your application settings
          </DialogDescription>
        </DialogHeader>
        <Tabs defaultValue={environment}>
          <TabsList className="grid w-full grid-cols-3 mb-4">
            <TabsTrigger value="local">Local</TabsTrigger>
            <TabsTrigger value="staging">Staging</TabsTrigger>
            <TabsTrigger value="production">Production</TabsTrigger>
          </TabsList>
          <TabsContent value="local">
            <SettingsForm
              environmentConfig={settings.local}
              onSubmit={handleSave("local")}
            />
          </TabsContent>
          <TabsContent value="staging">
            <SettingsForm
              environmentConfig={settings.staging}
              onSubmit={handleSave("staging")}
            />
          </TabsContent>
          <TabsContent value="production">
            <SettingsForm
              environmentConfig={settings.production}
              onSubmit={handleSave("production")}
            />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}

export default SettingsDialog;

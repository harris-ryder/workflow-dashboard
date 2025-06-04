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

interface SettingsDialogProps {
  trigger: React.ReactNode;
}

interface SettingsFormProps {
  environmentConfig: EnvironmentConfig;
  onSubmit: (environmentConfig: EnvironmentConfig) => void;
}

function SettingsForm({ environmentConfig, onSubmit }: SettingsFormProps) {
  const [uri, setUri] = useState(environmentConfig.uri);
  const [adminSecret, setAdminSecret] = useState(environmentConfig.adminSecret);
  const [myUserEmail, setMyUserEmail] = useState(environmentConfig.myUserEmail);

  const handleSave = () => {
    const updatedEnvironmentConfig: EnvironmentConfig = {
      uri,
      adminSecret,
      myUserEmail,
    };
    onSubmit(updatedEnvironmentConfig);
  };

  return (
    <div className="space-y-4">
      <Input
        type="text"
        name="uri"
        value={uri}
        onChange={(e) => setUri(e.target.value)}
        placeholder="GraphQL URI"
        className="w-full"
      />
      <Input
        type="text"
        name="adminSecret"
        value={adminSecret}
        onChange={(e) => setAdminSecret(e.target.value)}
        placeholder="Admin Secret"
        className="w-full"
      />
      <Input
        type="text"
        name="myUserEmail"
        value={myUserEmail}
        onChange={(e) => setMyUserEmail(e.target.value)}
        placeholder="User Email"
        className="w-full"
      />

      <div className="flex justify-end">
        <Button onClick={handleSave}>Save</Button>
      </div>
    </div>
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

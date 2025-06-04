import React from "react";
import { Dot } from "lucide-react";
import type { UserData } from "../../../../../api-hooks/use-overview";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../../../../ui/shadcn-primitives/avatar";

interface UserBarProps {
  userData?: UserData;
}

const UserBar: React.FC<UserBarProps> = ({ userData }) => {
  return (
    <div className="navbar w-full flex justify-start items-center gap-2 py-4">
      {userData && (
        <div className="flex items-center gap-2 text-sm">
          <Avatar>
            <AvatarImage src={userData.profilePictureUrl ?? undefined} />
            <AvatarFallback>
              {userData.firstName?.charAt(0)}
              {userData.lastName?.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <Dot className="w-4 h-4" />
          <span className="font-medium">
            {userData.firstName} {userData.lastName}
          </span>
          <Dot className="w-4 h-4" />
          <span className="text-muted-foreground">{userData.email}</span>
          <Dot className="w-4 h-4" />

          <span className="text-muted-foreground">Last sign in</span>
          <span className="text-muted-foreground">
            {new Date(userData.lastSignInAt).toLocaleString()}
          </span>
        </div>
      )}
    </div>
  );
};

export default UserBar;

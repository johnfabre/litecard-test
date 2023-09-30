import { useState } from "react";
import { User } from "../../../definitions/user.definition";
import { LcLabelValue } from "../../ui/LcLabelValue";
import { LcButton } from "../../ui/dom/LcButton";

interface LcUserProfileViewProps {
  user: User;
}

export function LcUserProfileView({ user }: LcUserProfileViewProps) {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <>
      <div>
        <LcLabelValue
          label="Name"
          value={`${user.name.firstname} ${user.name.lastname}`}
        />
      </div>
      <div>
        <LcLabelValue label="Username" value={user.username} />
      </div>
      <div>
        <div className="flex justify-between w-[300px]">
          <LcLabelValue
            label="Password"
            value={showPassword ? user.password : "********"}
          />
          <div className="self-center">
            <LcButton
              icon={`fa fa-eye${!showPassword ? "-slash" : ""}`}
              onClick={() => setShowPassword((prev) => !prev)}
            />
          </div>
        </div>
      </div>
      <div>
        <LcLabelValue label="Email" value={user.email} />
      </div>
      <div>
        <LcLabelValue label="Phone" value={user.phone} />
      </div>
      <div>
        <LcLabelValue
          label="Address"
          value={`${user.address.street}, ${user.address.city}, ${user.address.zipcode}`}
        />
      </div>
    </>
  );
}

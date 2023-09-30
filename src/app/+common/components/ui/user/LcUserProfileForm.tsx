import { cloneDeep, set } from "lodash-es";
import { Dispatch, SetStateAction, useState } from "react";
import { Maybe } from "../../../definitions/common.definition";
import { User } from "../../../definitions/user.definition";
import { LcButton } from "../dom/LcButton";
import { LcInput } from "../dom/LcInput";

interface LcUserProfileEditProps {
  user: Maybe<User>;
  setUser: Dispatch<SetStateAction<Maybe<User>>>;
}

export function LcUserProfileForm({ user, setUser }: LcUserProfileEditProps) {
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (field: string, value: string) => {
    setUser((prev) => {
      if (!prev) return prev;

      const copy = cloneDeep(prev);
      set(copy, field, value);
      return copy;
    });
  };

  return (
    user && (
      <div className="md:w-[450px]">
        <div>
          <label>First Name</label>
          <LcInput
            type="text"
            value={user.name.firstname}
            onChange={(value) => handleChange("name.firstname", value)}
          />
        </div>
        <div>
          <label>Last Name</label>
          <LcInput
            type="text"
            value={user.name.lastname}
            onChange={(value) => handleChange("name.lastname", value)}
          />
        </div>
        <div>
          <label>Username</label>
          <LcInput
            type="text"
            value={user.username}
            onChange={(value) => handleChange("username", value)}
          />
        </div>
        <div>
          <label>Password</label>
          <div className="flex justify-between">
            <LcInput
              type={showPassword ? "text" : "password"}
              value={user.password}
              onChange={(value) => handleChange("password", value)}
            />
            <LcButton
              icon={`fa fa-eye${!showPassword ? "-slash" : ""}`}
              onClick={() => setShowPassword((prev) => !prev)}
            />
          </div>
        </div>
        <div>
          <label>Email</label>
          <LcInput
            type="email"
            value={user.email}
            onChange={(value) => handleChange("email", value)}
          />
        </div>
        <div>
          <label>Phone</label>
          <LcInput
            type="tel"
            value={user.phone}
            onChange={(value) => handleChange("phone", value)}
          />
        </div>
        <div>
          <label>Street</label>
          <LcInput
            type="text"
            value={user.address.street}
            onChange={(value) => handleChange("address.street", value)}
          />
        </div>
        <div>
          <label>City</label>
          <LcInput
            type="text"
            value={user.address.city}
            onChange={(value) => handleChange("address.city", value)}
          />
        </div>
        <div>
          <label>Zipcode</label>
          <LcInput
            type="text"
            value={user.address.zipcode}
            onChange={(value) => handleChange("address.zipcode", value)}
          />
        </div>
      </div>
    )
  );
}

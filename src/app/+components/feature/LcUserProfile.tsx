"use client";

import { useEffect, useState } from "react";
import { UserProvider, useUser } from "../../+context/user.context";
import { API_URLS } from "../../+definitions/api.definition";
import { User } from "../../+definitions/user.definition";
import { LcButton } from "../dom/LcButton";
import { LcInput } from "../dom/LcInput";
import { LcLabelValue } from "../ui/LcLabelValue";

export function LcUserProfile() {
  return (
    <UserProvider>
      <LcUserProfileImpl />
    </UserProvider>
  );
}

export function LcUserProfileImpl() {
  const { user } = useUser();

  const [showPassword, setShowPassword] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState(user || ({} as User));

  useEffect(() => {
    if (user) {
      setEditedUser(user);
    }
  }, [user]);

  const handleChange = (name: string, value: any) => {
    if (editedUser) {
      const inner = editedUser;

      setEditedUser({ ...editedUser, [name]: value });
    }
  };

  const onSave = async () => {
    console.log("the updated user", editedUser);
    if (editedUser) {
      const url = API_URLS.user.update.replace(
        `{userId}`,
        String(editedUser.id)
      );
      const response = await fetch(url, {
        method: "PUT",
        body: JSON.stringify(editedUser),
      });

      // refetch the user or something
    }
  };

  return (
    user && (
      <div className="p-4">
        <div className="flex justify-between align-center">
          <div className="py-2">
            <h2 className="text-xl font-bold mb-4">User Profile</h2>
          </div>
          <div>
            <LcButton
              className="border"
              text={isEditing ? "Save" : "Edit"}
              onClick={() => {
                if (isEditing) {
                  onSave();
                }
                setIsEditing((prev) => !prev);
              }}
            ></LcButton>
          </div>
        </div>
        {!isEditing && (
          <div className="px-8">
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
                  value={user.password
                    .split("")
                    .map((e) => (showPassword ? e : "*"))
                    .join("")}
                />
                <LcButton
                  icon={`fa fa-eye${showPassword ? "-slash" : ""}`}
                  onClick={() => setShowPassword((prev) => !prev)}
                />
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
          </div>
        )}

        {isEditing && (
          <div className="px-8 md:w-[450px]">
            <div>
              <label>First Name</label>
              <LcInput
                type="text"
                value={editedUser.name.firstname}
                onChange={(e) => handleChange("name.firstname", e.target.value)}
              />
            </div>
            <div>
              <label>Last Name</label>
              <LcInput
                type="text"
                value={editedUser.name.lastname}
                onChange={(e) => handleChange("name.lastname", e.target.value)}
              />
            </div>
            <div>
              <label>Username</label>
              <LcInput
                type="text"
                value={editedUser.username}
                onChange={(e) => handleChange("username", e.target.value)}
              />
            </div>
            <div>
              <label>Password</label>
              <div className="flex justify-between">
                <LcInput
                  type={showPassword ? "text" : "password"}
                  value={editedUser.password}
                  onChange={(e) => handleChange("password", e.target.value)}
                />
                <LcButton
                  icon={`fa fa-eye${showPassword ? "-slash" : ""}`}
                  onClick={() => setShowPassword((prev) => !prev)}
                />
              </div>
            </div>
            <div>
              <label>Email</label>
              <LcInput
                type="email"
                value={editedUser.email}
                onChange={(e) => handleChange("email", e.target.value)}
              />
            </div>
            <div>
              <label>Phone</label>
              <LcInput
                type="tel"
                value={editedUser.phone}
                onChange={(e) => handleChange("phone", e.target.value)}
              />
            </div>
            <div>
              <label>Street</label>
              <LcInput
                type="text"
                value={editedUser.address.street}
                onChange={(e) => handleChange("address.street", e.target.value)}
              />
            </div>
            <div>
              <label>City</label>
              <LcInput
                type="text"
                value={editedUser.address.city}
                onChange={(e) => handleChange("address.city", e.target.value)}
              />
            </div>
            <div>
              <label>Zipcode</label>
              <LcInput
                type="text"
                value={editedUser.address.zipcode}
                onChange={(e) =>
                  handleChange("address.zipcode", e.target.value)
                }
              />
            </div>
          </div>
        )}
      </div>
    )
  );
}

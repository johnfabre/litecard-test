"use client";

import { isNil } from "lodash-es";
import { useState } from "react";
import { useUser } from "../../../data-access/users/user.context";
import { UserData } from "../../../data-access/users/user.data";
import { Hooks } from "../../../utils/hooks";
import { LcConfirmationDialog } from "../../ui/LcConfirmationDialog";
import { LcLoading } from "../../ui/LcLoading";
import { LcButton } from "../../ui/dom/LcButton";
import { LcUserProfileForm } from "../../ui/user/LcUserProfileForm";
import { LcUserProfileView } from "../../ui/user/LcUserProfileView";

export function LcUserProfile() {
  const { user, updateUserState } = useUser();
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState(user);

  const onSave = async () => {
    if (isNil(user) || isNil(editedUser)) {
      throw new Error(`Unable to save 'user' that is falsy`);
    }
    const userFromServer = await UserData.updateUser(user.id, editedUser);
    updateUserState(userFromServer);
    setIsEditing(false);
  };

  Hooks.useEffect(() => {
    if (isNil(editedUser)) {
      setEditedUser(user);
    }
  }, [user]);

  const cancelEditing = () => {
    setEditedUser(user);
    setIsEditing(false);
  };

  return (
    <>
      {!user && <LcLoading />}
      {user && (
        <div className="p-4">
          <div className="flex justify-between align-center">
            <div className="py-2">
              <h2 className="text-xl font-bold mb-4">User Profile</h2>
            </div>
            <div className="flex">
              {isEditing && (
                <LcUserProfileEditControls
                  onCancel={cancelEditing}
                  onSave={onSave}
                />
              )}
              {!isEditing && (
                <div>
                  <LcButton
                    className="bg-green-800 text-gray-100"
                    text="Edit"
                    onClick={() => setIsEditing(true)}
                  />
                </div>
              )}
            </div>
          </div>
          {!isEditing && <LcUserProfileView user={user} />}
          {isEditing && (
            <LcUserProfileForm user={editedUser} setUser={setEditedUser} />
          )}
        </div>
      )}
    </>
  );
}

interface LcUserProfileEditControlsProps {
  onCancel: () => void;
  onSave: () => void;
}
function LcUserProfileEditControls({
  onCancel,
  onSave,
}: LcUserProfileEditControlsProps) {
  const [showDiscard, setShowDiscard] = useState(false);
  const [showSaveConfirmation, setSaveConfirmation] = useState(false);
  return (
    <>
      <div>
        <LcButton text="Cancel" onClick={() => setShowDiscard(true)} />
        {showDiscard && (
          <LcConfirmationDialog
            onCancel={() => setShowDiscard(false)}
            onConfirm={onCancel}
          >
            <h1>Discard changes?</h1>
          </LcConfirmationDialog>
        )}
      </div>
      <div>
        <LcButton
          className="bg-green-800 text-gray-100"
          text="Save"
          onClick={() => setSaveConfirmation(true)}
        />
        {showSaveConfirmation && (
          <LcConfirmationDialog
            onCancel={() => setSaveConfirmation(false)}
            onConfirm={onSave}
          >
            <h1>Save changes?</h1>
          </LcConfirmationDialog>
        )}
      </div>
    </>
  );
}

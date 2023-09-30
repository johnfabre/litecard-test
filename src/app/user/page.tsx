import { LcUserProfile } from "../+common/components/feature/user/LcUserProfile";
import { LcPageTitle } from "../+common/components/ui/LcPageTitle";

export default async function UserPage() {
  return (
    <>
      <LcPageTitle title="User information" />
      <LcUserProfile />
    </>
  );
}

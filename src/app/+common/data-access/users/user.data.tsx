import { isNil } from "lodash-es";
import { API_URLS } from "../../definitions/api.definition";
import { Maybe } from "../../definitions/common.definition";
import { User } from "../../definitions/user.definition";

export class UserData {
  public static async fetchUser(userId: User["id"]): Promise<Maybe<User>> {
    if (isNil(userId)) {
      return null;
    }
    const url = API_URLS.user.getById.replace("{userId}", String(userId));
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Failed to fetch user");
    }

    return response.json();
  }

  public static async updateUser(
    userId: User["id"],
    user: User
  ): Promise<Maybe<User>> {
    if (isNil(userId)) {
      return null;
    }

    const url = API_URLS.user.update.replace("{userId}", String(userId));
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    if (!response.ok) {
      throw new Error("Failed to update user");
    }

    return response.json();
  }
}

import { cloneDeep, get, isNumber } from "lodash-es";
import { Maybe, SortOrder } from "../definitions/common.definition";

export class ArrayUtils {
  public static sortBy<T>(
    arr: Maybe<T[]>,
    field: string,
    sortOrder: SortOrder = SortOrder.ASC
  ): Maybe<T[]> {
    if (!arr || !Array.isArray(arr)) return arr;

    let result = cloneDeep(arr);

    result.sort((a, b) => {
      const [av, bv] = [get(a, field), get(b, field)];

      if (typeof av === "object" || typeof bv === "object") {
        throw new Error("trying to compare objects");
      }

      if (isNumber(av) && isNumber(bv)) {
        return av - bv;
      }

      return av > bv ? 1 : av < bv ? -1 : 0;
    });

    if (sortOrder === SortOrder.DESC) {
      result = result.reverse();
    }

    return result;
  }
}

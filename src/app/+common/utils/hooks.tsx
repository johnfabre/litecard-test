/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import { cloneDeep, isEqual } from "lodash-es";
import { DependencyList, useEffect, useRef, useState } from "react";

export const Hooks = {
  useEffect: (fn: () => (() => void) | void, deps: DependencyList = []) => {
    const [cache, setCache] = useState(cloneDeep(deps));
    let mounted = useRef(false);
    return useEffect(() => {
      if (mounted.current && isEqual(cache, deps)) return;
      const cleanUp = fn();
      setCache(() => cloneDeep(deps));
      mounted.current = true;
      return cleanUp;
    }, deps);
  },
};

import { ViewDataState } from "../types";
import { useCallback, useState } from "react";

export const useViewDataState = (
  initialState = ViewDataState.Initial
): [ViewDataState, (newViewDataState: ViewDataState) => void] => {
  const [viewDataState, setViewDataState] =
    useState<ViewDataState>(initialState);

  const setViewDataStateFacade = useCallback(
    (newViewDataState: ViewDataState) => {
      setViewDataState(newViewDataState);
    },
    []
  );

  return [viewDataState, setViewDataStateFacade];
};

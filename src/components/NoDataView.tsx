import { ApolloError } from "@apollo/client";
import { ViewDataState } from "../types";
import { Loading } from "./Loading";

interface Props {
  viewDataState: ViewDataState;
  activeSearchTerm?: string;
  error?: ApolloError;
}

export const NoDataView = ({
  viewDataState,
  error,
  activeSearchTerm,
}: Props) => {
  return (
    <div style={{ padding: 20 }} data-cy="empty-state">
      {viewDataState === ViewDataState.Initial ? "Enter a Search Term" : null}
      {viewDataState === ViewDataState.Loading ? <Loading /> : null}
      {viewDataState === ViewDataState.Error
        ? `Error: ${error!.name} ${error!.message}`
        : null}
      {viewDataState === ViewDataState.NoResults
        ? `No results for "${activeSearchTerm}"`
        : null}
    </div>
  );
};

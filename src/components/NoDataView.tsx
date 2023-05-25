import { ApolloError } from "@apollo/client";
import { ViewDataState } from "../types";
import { Loading } from "./Loading";

interface Props {
  viewDataState: ViewDataState;
  activeSearchTerm: string;
  error?: ApolloError;
}

export const NoDataView = ({
  viewDataState,
  error,
  activeSearchTerm,
}: Props) => {
  return (
    <p style={{ padding: 20 }}>
      {viewDataState === ViewDataState.Initial ? "Enter a Search Term" : null}
      {viewDataState === ViewDataState.Loading ? <Loading /> : null}
      {viewDataState === ViewDataState.Error
        ? `Errors: ${error!.name} ${error!.message}`
        : null}
      {viewDataState === ViewDataState.NoResults
        ? `No results for "${activeSearchTerm}"`
        : null}
    </p>
  );
};

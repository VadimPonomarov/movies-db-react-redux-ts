import React, {FC} from "react";

import {QueryClient, QueryClientProvider} from "react-query";

import {IProps} from "./interfaces";

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: Infinity,
            placeholderData: "keepPreviousData",
        },
    }
});
const MQueryClientProvider: FC<IProps> = ({children}) => {

    return (
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    );
};

export {queryClient, MQueryClientProvider};
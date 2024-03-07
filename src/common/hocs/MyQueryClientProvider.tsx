import React, {FC} from 'react';

import {QueryClient, QueryClientProvider} from "react-query"

import {IProps} from "./interfaces";

const queryClient = new QueryClient()
const MyQueryClientProvider: FC<IProps> = ({children}) => {

    return (
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    );
};

export {queryClient, MyQueryClientProvider};
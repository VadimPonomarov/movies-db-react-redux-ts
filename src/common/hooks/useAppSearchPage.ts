import {SetURLSearchParams, useSearchParams} from "react-router-dom";

const _default = {page: "1"};
const useAppSearchPage: (initial: typeof _default) => [URLSearchParams, SetURLSearchParams] =
    (initial = _default) => {
        const [query, setQuery] = useSearchParams(initial);
        return [query, setQuery];
    };
export {useAppSearchPage};
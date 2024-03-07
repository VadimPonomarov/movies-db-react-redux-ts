export interface IProps {
    props: {
        step: number,
        min: number,
        max: number,
        current: number,
        nextPage: () => void
    };
}
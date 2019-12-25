import React, { Ref } from "react";
export default class extends React.Component<{
    mountEffect?: (el: HTMLElement) => (() => void) | void;
    domRef?: Ref<HTMLElement>;
}> {
    private cleanup?;
    componentDidMount(): void;
    componentWillUnmount(): void;
    render(): JSX.Element;
}

import ReactDOM from "react-dom";
import React from "react";
import { isFunction, assert } from "@lincode/utils";
export default class extends React.Component {
    componentDidMount() {
        const el = ReactDOM.findDOMNode(this);
        assert(el instanceof HTMLElement, "DOMElementExtractor failed to find an HTMLElement");
        if (this.props.mountEffect) {
            //@ts-ignore
            this.cleanup = this.props.mountEffect(el);
        }
        if (this.props.domRef) {
            if (isFunction(this.props.domRef))
                this.props.domRef(el);
            else {
                //@ts-ignore
                this.props.domRef.current = el;
            }
        }
    }
    componentWillUnmount() {
        var _a, _b;
        (_b = (_a = this).cleanup) === null || _b === void 0 ? void 0 : _b.call(_a);
    }
    render() {
        return (React.createElement(React.Fragment, null, this.props.children));
    }
}

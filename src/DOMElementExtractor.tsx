import ReactDOM from "react-dom";
import React, { Ref } from "react";
import { isFunction, assert } from "@lincode/utils";

export default class extends React.Component<{
  mountEffect?: (el: HTMLElement) => (() => void) | void,
  domRef?: Ref<HTMLElement>
}> {
  private cleanup?: () => void;

  public componentDidMount() {
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

  public componentWillUnmount() {
    this.cleanup?.();
  }

  public render() {
    return (
      <>{this.props.children}</>
    );
  }
}
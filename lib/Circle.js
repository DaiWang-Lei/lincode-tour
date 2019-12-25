import React, { useCallback } from "react";
const Circle = props => {
    const style = {
        width: 10,
        height: 10,
        borderRadius: 9999,
        border: "1px solid blue",
        position: "absolute",
        left: props.x,
        top: props.y,
        transform: "translateX(-50%) translateY(-50%)",
        opacity: 0
    };
    const initAnimation = useCallback((el, delay) => {
        if (!el)
            return;
        el.animate([
            { transform: "translateX(-50%) translateY(-50%) scale(1)", opacity: 0 },
            { transform: "translateX(-50%) translateY(-50%) scale(5)", opacity: 1 },
            { transform: "translateX(-50%) translateY(-50%) scale(10)", opacity: 0 },
        ], {
            duration: 2000,
            delay,
            iterations: Infinity,
            easing: "ease-in-out"
        });
    }, []);
    return (React.createElement(React.Fragment, null,
        React.createElement("div", { style: style, ref: el => initAnimation(el, 0) }),
        React.createElement("div", { style: style, ref: el => initAnimation(el, 500) }),
        React.createElement("div", { style: style, ref: el => initAnimation(el, 1000) }),
        React.createElement("div", { style: style, ref: el => initAnimation(el, 1500) }),
        React.createElement("div", { style: style, ref: el => initAnimation(el, 2000) })));
};
export default Circle;

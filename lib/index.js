import React, { useCallback } from "react";
import ReactDOM from "react-dom";
import Circle from "./Circle";
import { Transition } from 'react-transition-group';
import DOMElementExtractor from "./DOMElementExtractor";
import { useRef } from "react";
import { useEffect } from "react";
import '../assets/stylefix.css';
import "tailwindcss/dist/base";
import "tailwindcss/dist/components";
import "tailwindcss/dist/utilities";
import { useState } from "react";
const container = document.createElement("div");
document.body.appendChild(container);
const useWindowWidth = () => {
    const [windowWidth, setWindowWidth] = useState(0);
    window.addEventListener("resize", () => {
        setWindowWidth(window.innerWidth);
    });
    return windowWidth;
};
const Tour = ({ text, children, color = "blue", actions, active }) => {
    const show = !!text && active;
    const innerRef = useRef();
    const windowWidth = useWindowWidth();
    const [alignLeft, setAlignLeft] = useState(false);
    const checkOutOfBounds = useCallback((el) => {
        if (!el)
            return;
        const bounds = el.getBoundingClientRect();
        const xMax = bounds.left + bounds.width;
        setAlignLeft(xMax > window.innerWidth);
    }, []);
    useEffect(() => {
        const el = innerRef.current;
        el.classList.add("stylefix");
        let zIndexOld;
        if (show) {
            zIndexOld = el.style.zIndex;
            el.style.zIndex = "9999";
        }
        const rect = el.getBoundingClientRect();
        const centerX = rect.x + rect.width / 2;
        const rightX = rect.x + rect.width;
        const centerY = rect.y + rect.height / 2;
        const maxSize = Math.max(rect.width, rect.height);
        show && ReactDOM.render((React.createElement(Transition, { in: show, timeout: 500 }, state => (state !== "exited" && state !== "unmounted" && (React.createElement(React.Fragment, null,
            React.createElement("div", { style: {
                    width: "100vw",
                    height: "100vh",
                    position: "absolute",
                    left: 0,
                    top: 0,
                    background: "rgba(0,0,0,0.25)",
                    zIndex: 9997,
                    opacity: state === "entered" ? 1 : 0,
                    transition: "opacity 500ms ease"
                } }),
            React.createElement("div", { style: {
                    opacity: state === "entered" ? 1 : 0,
                    transition: "opacity 500ms ease",
                    zIndex: 9998
                } },
                React.createElement(Circle, { x: centerX, y: centerY, diameter: maxSize + 50 })),
            alignLeft ? (React.createElement("div", { className: 'flex absolute items-center w-48', style: {
                    left: centerX - 220,
                    top: centerY - 10,
                    color: color
                } },
                React.createElement("div", { className: 'h-30 w-30 flex-shrink' }, text),
                React.createElement("div", { className: "flex-grow mr-6 mt-2 ", style: { height: 1, background: color } },
                    React.createElement("div", { className: 'w-2 h-2  rounded-full absolute ', style: { transform: "translateY(-50%)", background: color, right: 20 } })))) : (React.createElement("div", { className: 'flex items-center absolute w-48 ', style: {
                    left: rightX + 10,
                    top: centerY - 10,
                    color: color
                } },
                React.createElement("div", { className: "flex-grow m-2", style: { height: 1, background: color } },
                    React.createElement("div", { className: 'w-2 h-2 rounded-full', style: { transform: "translateY(-50%)", background: color } })),
                React.createElement("div", { className: 'h-30 w-30 flex-shrink', ref: checkOutOfBounds }, text)))))))), container);
        return () => {
            if (zIndexOld !== undefined)
                el.style.zIndex = zIndexOld;
        };
    }, [show, windowWidth, alignLeft, text]);
    useEffect(() => {
        if (!actions)
            return;
        const el = innerRef.current;
        for (const [eventName, cb] of Object.entries(actions)) {
            //@ts-ignore
            el.addEventListener(eventName, cb);
        }
        return () => {
            for (const [eventName, cb] of Object.entries(actions)) {
                //@ts-ignore
                el.removeEventListener(eventName, cb);
            }
        };
    }, []);
    return (React.createElement(DOMElementExtractor, { domRef: innerRef }, children));
};
export default Tour;

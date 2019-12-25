import React from "react";
import '../assets/stylefix.css';
import "tailwindcss/dist/base";
import "tailwindcss/dist/components";
import "tailwindcss/dist/utilities";
declare const Tour: React.FC<{
    color?: string;
    text?: string;
    actions?: any;
    active?: boolean;
}>;
export default Tour;

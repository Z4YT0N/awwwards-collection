"use client";

import React, { useEffect } from "react";
import { useRevealer } from "@/hooks/useRevealer";
import WebGLText from "@/components/webgl/WebGLText";


export default function WebGLPage() {
    useRevealer();

    return (
        <>
            <div className="revealer"></div>
            <div className="home !bg-white">
                <WebGLText />
            </div>
        </>
    );
}

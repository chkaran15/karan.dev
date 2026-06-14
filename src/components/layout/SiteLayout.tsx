"use client"
import { useState } from "react";
import { AnimatePresence } from "motion/react";
import LoadingScreen from "./LoadingScreen";



export function SiteLayout({ children }: { children: React.ReactNode }) {
    const [loading, setLoading] = useState(true);
    return (
        <>
            <AnimatePresence>{loading && <LoadingScreen onComplete={() => setLoading(false)} />}</AnimatePresence>
            <div className={`transition-opacity ${loading ? "opacity-0" : "opacity-100"}`}>
                {children}
            </div>
        </>
    );
}
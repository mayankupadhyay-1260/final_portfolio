import React, { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

export default function ContactAnimation() {
    const containerRef = useRef(null)

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    })

    const wheelRotation = useTransform(scrollYProgress, [0, 1], [0, 360])
    const iconRotation = useTransform(scrollYProgress, [0, 1], [0, -360])

    // Social links data — using <a> tags for reliable external navigation
    const links = [
        {
            href: "https://www.linkedin.com/in/mayank-upadhyay-969731258/",
            title: "LinkedIn",
            border: "border-blue-500",
            hover: "hover:bg-blue-600",
            shadow: "shadow-[0_0_30px_rgba(59,130,246,0.6)]",
            // Position: right center (3 o'clock)
            style: { top: "50%", right: "-40px", transform: "translateY(-50%)" },
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
            )
        },
        {
            href: "mailto:mayankupadhyay2004@gmail.com",
            title: "Email",
            border: "border-red-500",
            hover: "hover:bg-red-500",
            shadow: "shadow-[0_0_30px_rgba(239,68,68,0.6)]",
            // Position: left center (9 o'clock)
            style: { top: "50%", left: "-40px", transform: "translateY(-50%)" },
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
            )
        },
        {
            href: "https://x.com/u_mayank1260",
            title: "X (Twitter)",
            border: "border-slate-400",
            hover: "hover:bg-slate-700",
            shadow: "shadow-[0_0_30px_rgba(148,163,184,0.6)]",
            // Position: top center (12 o'clock)
            style: { top: "-40px", left: "50%", transform: "translateX(-50%)" },
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
            )
        },
        {
            href: "https://github.com/mayankupadhyay-1260",
            title: "GitHub",
            border: "border-purple-500",
            hover: "hover:bg-purple-600",
            shadow: "shadow-[0_0_30px_rgba(168,85,247,0.6)]",
            // Position: bottom center (6 o'clock)
            style: { bottom: "-40px", left: "50%", transform: "translateX(-50%)" },
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
            )
        },
    ]

    return (
        <div ref={containerRef} className="w-full h-[200vh] relative font-mono mt-32">

            <div className="sticky top-0 w-full h-screen flex flex-col items-center justify-center overflow-visible border-t border-orange-500/30">

                <h2 className="absolute top-20 text-5xl font-bold tracking-widest text-orange-500/20 uppercase z-0 pointer-events-none">Contact Me</h2>

                {/* The Rotating Wheel */}
                <motion.div
                    style={{ rotate: wheelRotation }}
                    className="relative w-[300px] h-[300px] md:w-[450px] md:h-[450px] rounded-full border-4 border-dashed border-orange-500/40 flex items-center justify-center shadow-[0_0_80px_rgba(249,115,22,0.1)]"
                >
                    {/* Spokes */}
                    <div className="absolute w-full h-[2px] bg-gradient-to-r from-transparent via-orange-500/30 to-transparent pointer-events-none" />
                    <div className="absolute h-full w-[2px] bg-gradient-to-b from-transparent via-orange-500/30 to-transparent pointer-events-none" />

                    {/* Center Core — Instagram */}
                    <a
                        href="https://www.instagram.com/dubi.codes/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="absolute flex items-center justify-center w-24 h-24 bg-slate-900 rounded-full border-4 border-pink-500 hover:bg-pink-600 hover:scale-110 transition-all duration-300 shadow-[0_0_40px_rgba(236,72,153,0.5)] z-10 cursor-pointer"
                        title="Instagram"
                        style={{ rotate: "0deg" }}
                        onClick={e => e.stopPropagation()}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                        </svg>
                    </a>

                    {/* Perimeter Nodes */}
                    {links.map((link) => (
                        <motion.div
                            key={link.title}
                            style={{ rotate: iconRotation, position: "absolute", ...link.style, width: "80px", height: "80px", zIndex: 20 }}
                        >
                            <a
                                href={link.href}
                                target={link.href.startsWith("mailto") ? "_self" : "_blank"}
                                rel="noopener noreferrer"
                                title={link.title}
                                onClick={e => e.stopPropagation()}
                                className={`w-full h-full bg-slate-900 ${link.border} border-4 rounded-full flex items-center justify-center ${link.hover} hover:scale-125 transition-all duration-300 ${link.shadow} cursor-pointer`}
                                style={{ display: "flex" }}
                            >
                                {link.icon}
                            </a>
                        </motion.div>
                    ))}

                </motion.div>

                <p className="absolute bottom-10 text-orange-300/60 text-sm tracking-widest uppercase animate-pulse">
                    Scroll down to rotate
                </p>
            </div>
        </div>
    )
}

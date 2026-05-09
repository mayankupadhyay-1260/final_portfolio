import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import './homepage.css'

const BOGGIES = [
    { label: "ARSENAL", color: "#FF6B35", glow: "rgba(255,107,53,0.6)", isEngine: true },
    { label: "MERN", color: "#61DAFB", glow: "rgba(97,218,251,0.6)" },
    { label: "Python", color: "#FFD43B", glow: "rgba(255,212,59,0.6)" },
    { label: "Docker", color: "#2496ED", glow: "rgba(36,150,237,0.6)" },
    { label: "Git/GitHub", color: "#F05032", glow: "rgba(240,80,50,0.6)" },
];

const BW = 180, BH = 100, WR = 22, GAP = 18;
const TRACK_Y = 320;
const SVG_W = 1440;
const TOTAL_W = BOGGIES.length * (BW + GAP) + 80;
const START_X = SVG_W + 60;
const END_X = -TOTAL_W - 60;
const TRAVEL = START_X - END_X;

export default function SkillAnimation() {
    const containerRef = useRef(null)

    // Create a 300vh scrollable container so the train smoothly traverses based on native scroll
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    })

    const trainX = useTransform(scrollYProgress, [0, 1], [START_X, END_X])

    // Calculate wheel rotations natively using Framer Motion Math
    // Distance moved = START_X - currentX. Total distance = TRAVEL. 
    // Angle = (Distance / Circumference) * 360
    const maxAngle = (TRAVEL / (WR * 2 * Math.PI)) * 360
    const wheelAngle = useTransform(scrollYProgress, [0, 1], [0, maxAngle])

    // Controls the visibility of the "Scroll to Launch" vs "Skills Loaded" overlay
    const statusOpacity = useTransform(scrollYProgress, [0.95, 1], [1, 0])
    const doneOpacity = useTransform(scrollYProgress, [0.95, 1], [0, 1])

    // Move the skills cards up slightly as they fade in
    const gridY = useTransform(scrollYProgress, [0.95, 1], [20, 0])

    return (
        <div ref={containerRef} className="w-full h-[300vh] relative z-10 font-mono">
            {/* The sticky viewport that holds the train track */}
            <div className="w-full h-screen sticky top-0 flex flex-col items-center justify-center bg-transparent overflow-hidden pt-10 border-t border-[#a855f7]/30">

                <div className="w-full max-w-[960px] mx-auto px-6 flex flex-col">

                    {/* Heading */}
                    <div className="text-center mb-6">
                        <h1 className="text-[clamp(1.5rem,4vw,2.5rem)] font-[800] uppercase tracking-[0.18em] bg-gradient-to-r from-purple-500 to-orange-500 bg-clip-text text-transparent">
                            Arsenal
                        </h1>
                        <div className="w-[90px] h-[4px] bg-gradient-to-r from-purple-500 to-orange-500 mx-auto mt-4 rounded-full"></div>
                    </div>

                    <motion.div style={{ opacity: statusOpacity }} className="text-center text-white/50 text-[12px] tracking-[0.15em] mb-4 min-h-[20px] animate-pulse">
                        ↓ SCROLL TO LAUNCH THE TRAIN ↓
                    </motion.div>

                    <motion.div style={{ opacity: doneOpacity, display: useTransform(scrollYProgress, v => v < 0.95 ? "none" : "block") }} className="text-center text-[#61DAFB] text-[12px] tracking-[0.15em] mb-4 min-h-[20px] absolute w-full left-0 mt-[104px]">
                        ✅ ALL ABOARD — SKILLS LOADED!
                    </motion.div>

                </div>

                {/* FULL WIDTH CANVAS WRAPPER */}
                <div
                    className="w-full relative overflow-hidden mt-8 max-w-none"
                    style={{
                        WebkitMaskImage: 'linear-gradient(to right, black 0%, black 80%, transparent 100%)',
                        maskImage: 'linear-gradient(to right, black 0%, black 80%, transparent 100%)'
                    }}
                >

                    <svg viewBox="0 0 1440 400" xmlns="http://www.w3.org/2000/svg" className="block w-full">
                        <defs>
                            <filter id="boxBlur" x="-20%" y="-20%" width="140%" height="140%">
                                <feGaussianBlur stdDeviation="12" />
                            </filter>
                            <linearGradient id="tunnelFade" x1="0" y1="0" x2="1" y2="0">
                                <stop offset="0%" stopColor="#020205" stopOpacity="1" />
                                <stop offset="100%" stopColor="#020205" stopOpacity="0" />
                            </linearGradient>
                        </defs>

                        {/* Inner Darkness of Tunnel (drawn behind train to hide stars) */}
                        <rect x="0" y="0" width="180" height="400" fill="#020205" />
                        <rect x="180" y="0" width="120" height="400" fill="url(#tunnelFade)" />

                        {/* Inner Stars Background */}
                        <rect x="300" y="0" width="1140" height="400" fill="#050510" />

                        {/* Stars */}
                        <circle cx="350" cy="20" r="1.2" fill="white" opacity=".7" />
                        <circle cx="500" cy="60" r="1.2" fill="white" opacity=".5" />
                        <circle cx="650" cy="35" r="1.2" fill="white" opacity=".6" />
                        <circle cx="750" cy="15" r="1.2" fill="white" opacity=".4" />
                        <circle cx="850" cy="55" r="1.2" fill="white" opacity=".6" />
                        <circle cx="420" cy="90" r="1" fill="white" opacity=".5" />
                        <circle cx="700" cy="75" r="1.2" fill="white" opacity=".5" />
                        <circle cx="310" cy="110" r="1" fill="white" opacity=".3" />
                        <circle cx="560" cy="100" r="1" fill="white" opacity=".4" />
                        {/* Extra Stars for wider screen */}
                        <circle cx="1000" cy="40" r="1.2" fill="white" opacity=".6" />
                        <circle cx="1150" cy="80" r="1.2" fill="white" opacity=".5" />
                        <circle cx="1300" cy="25" r="1.2" fill="white" opacity=".7" />
                        <circle cx="950" cy="90" r="1" fill="white" opacity=".4" />
                        <circle cx="1250" cy="65" r="1" fill="white" opacity=".5" />
                        <circle cx="1380" cy="110" r="1.2" fill="white" opacity=".3" />

                        {/* Ground */}
                        <rect x="0" y="328" width="1440" height="72" fill="#0a0a18" />

                        {/* Sleepers */}
                        <g>
                            {Array.from({ length: 35 }).map((_, i) => (
                                <rect key={i} x={i * (SVG_W / 34) - 14} y={TRACK_Y + 2} width={28} height={20} rx={2} fill="#1e1e2e" />
                            ))}
                        </g>

                        {/* Rails */}
                        <line x1="0" y1="322" x2="1440" y2="322" stroke="#333" strokeWidth="5" strokeLinecap="round" />
                        <line x1="0" y1="336" x2="1440" y2="336" stroke="#333" strokeWidth="5" strokeLinecap="round" />
                        <line x1="0" y1="320" x2="1440" y2="320" stroke="rgba(255,255,255,0.1)" strokeWidth="1.5" />
                        <line x1="0" y1="334" x2="1440" y2="334" stroke="rgba(255,255,255,0.08)" strokeWidth="1.5" />

                        {/* Moving Train Group */}
                        <motion.g style={{ x: trainX }}>
                            {BOGGIES.map((b, i) => {
                                const offsetX = i * (BW + GAP);
                                const bodyY = TRACK_Y - BH - WR * 2 + 12;
                                const bx = 0;
                                const w1x = bx + 38;
                                const w2x = bx + BW - 38;
                                const wheelY = TRACK_Y - WR;

                                return (
                                    <g key={i} transform={`translate(${offsetX},0)`}>
                                        {/* Coupler */}
                                        {i > 0 && (
                                            <rect x={-14} y={bodyY + BH / 2 - 4} width={14} height={8} rx={2} fill="#666" />
                                        )}

                                        <g style={{ filter: `drop-shadow(0 0 14px ${b.glow})` }}>
                                            {b.isEngine ? (
                                                <>
                                                    <rect x={bx} y={bodyY} width={BW} height={BH} rx={10} fill="#1a1a2e" stroke={b.color} strokeWidth={2.5} />
                                                    <rect x={bx + 20} y={bodyY - 38} width={BW - 40} height={42} rx={8} fill="#0f0f1a" stroke={b.color} strokeWidth={2} />
                                                    <rect x={bx + 34} y={bodyY - 30} width={BW - 68} height={26} rx={5} fill="#001a2e" stroke={b.color} strokeWidth={1.5} />
                                                    <rect x={bx + BW - 36} y={bodyY - 64} width={18} height={30} rx={4} fill="#111" stroke={b.color} strokeWidth={1.5} />
                                                    <rect x={bx + BW} y={bodyY + 20} width={22} height={10} rx={3} fill={b.color} />
                                                    <rect x={bx} y={bodyY + BH - 28} width={BW} height={8} fill={b.color} opacity={0.35} />

                                                    {/* Smoke */}
                                                    <g transform={`translate(${bx + BW - 27},${bodyY - 70})`}>
                                                        <circle cx={0} cy={-16} r={10} fill="rgba(200,200,200,0.5)" className="smoke-puff" />
                                                        <circle cx={0} cy={-30} r={8} fill="rgba(200,200,200,0.4)" className="smoke-puff d1" />
                                                        <circle cx={0} cy={-42} r={7} fill="rgba(200,200,200,0.3)" className="smoke-puff d2" />
                                                        <circle cx={0} cy={-54} r={6} fill="rgba(200,200,200,0.2)" className="smoke-puff d3" />
                                                    </g>

                                                    <text x={bx + BW / 2} y={bodyY + BH / 2 + 6} textAnchor="middle" fill={b.color} fontSize={16} fontWeight={800} fontFamily="Courier New, monospace" letterSpacing={3}>{b.label}</text>
                                                </>
                                            ) : (
                                                <>
                                                    <rect x={bx} y={bodyY} width={BW} height={BH} rx={10} fill="#0f0f1a" stroke={b.color} strokeWidth={2} />
                                                    <rect x={bx + 8} y={bodyY + 8} width={BW - 16} height={6} rx={3} fill={b.color} opacity={0.5} />
                                                    {Array.from({ length: 4 }).map((_, ri) => (
                                                        <circle key={ri} cx={bx + 20 + ri * ((BW - 40) / 3)} cy={bodyY + 24} r={3} fill={b.color} opacity={0.7} />
                                                    ))}
                                                    <rect x={bx - 14} y={bodyY + BH / 2 - 4} width={14} height={8} rx={2} fill="#555" />
                                                    <text x={bx + BW / 2} y={bodyY + BH / 2 + 8} textAnchor="middle" fill={b.color} fontSize={b.label.length > 8 ? 12 : 15} fontWeight={700} fontFamily="Courier New, monospace" letterSpacing={2}>{b.label}</text>
                                                </>
                                            )}

                                            {/* Wheels */}
                                            {[w1x, w2x].map((wx, wIdx) => (
                                                <motion.g key={wIdx} style={{ rotate: wheelAngle, transformOrigin: `${wx}px ${wheelY}px` }}>
                                                    <circle cx={wx} cy={wheelY} r={WR} fill="#111" stroke={b.color} strokeWidth={2.5} />
                                                    {[0, 60, 120].map(deg => {
                                                        const rad = deg * Math.PI / 180;
                                                        const x1 = wx + Math.cos(rad) * (WR - 4), y1 = wheelY + Math.sin(rad) * (WR - 4);
                                                        const x2 = wx - Math.cos(rad) * (WR - 4), y2 = wheelY - Math.sin(rad) * (WR - 4);
                                                        return <line key={deg} x1={x1} y1={y1} x2={x2} y2={y2} stroke={b.color} strokeWidth={1.5} opacity={0.8} />
                                                    })}
                                                    <circle cx={wx} cy={wheelY} r={5} fill={b.color} />
                                                </motion.g>
                                            ))}
                                        </g>
                                    </g>
                                )
                            })}
                        </motion.g>

                        {/* LEFT TUNNEL OVERLAY (Drawn after train so train enters it) */}
                        <g id="tunnel-overlay">
                            {/* Base tunnel wall with an arch cutout */}
                            <path fillRule="evenodd" clipRule="evenodd" d="M -50 -50 L 400 -50 L 400 450 L -50 450 Z M 280 340 L 280 160 A 90 90 0 0 0 100 160 L 100 340 Z" fill="#0a0a10" />
                            {/* Arch brick border */}
                            <path d="M 280 340 L 280 160 A 90 90 0 0 0 100 160 L 100 340" fill="none" stroke="#1e1e2e" strokeWidth="8" />
                            <path d="M 290 340 L 290 160 A 100 100 0 0 0 90 160 L 90 340" fill="none" stroke="#05050a" strokeWidth="12" />
                        </g>

                        {/* Status Overlay (Centered in new width 1440 -> 720) */}
                        <motion.g style={{ opacity: statusOpacity }}>
                            <rect x="580" y="18" width="280" height="34" rx="17" fill="rgba(255,107,53,0.15)" filter="url(#boxBlur)" />
                            <text x="720" y="40" textAnchor="middle" fill="rgba(255,107,53,0.9)" fontSize="12" fontFamily="monospace" letterSpacing="2" fontWeight="bold">
                                🚂 SCROLL TO LAUNCH TRAIN
                            </text>
                        </motion.g>

                        <motion.g style={{ opacity: doneOpacity }}>
                            <rect x="580" y="18" width="280" height="34" rx="17" fill="rgba(97,218,251,0.15)" filter="url(#boxBlur)" />
                            <text x="720" y="40" textAnchor="middle" fill="rgba(97,218,251,0.9)" fontSize="12" fontFamily="monospace" letterSpacing="2" fontWeight="bold">
                                ✅ ALL ABOARD — SKILLS LOADED
                            </text>
                        </motion.g>

                    </svg>
                </div>

                {/* Re-open max-w container for grid */}
                <div className="w-full max-w-[960px] mx-auto px-6">
                    {/* Skill Cards Grid (Fades in when train reaches end) */}
                    <motion.div
                        style={{ opacity: doneOpacity, y: gridY }}
                        className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8"
                    >
                        {BOGGIES.slice(1).map((b, idx) => (
                            <div
                                key={idx}
                                className="bg-white/5 rounded-xl p-3 md:p-4 text-center border transition-all duration-300 hover:scale-105 cursor-default"
                                style={{ borderColor: `${b.color}44`, boxShadow: `0 0 18px ${b.glow}` }}
                            >
                                <span style={{ color: b.color }} className="font-bold text-sm md:text-base tracking-widest">{b.label}</span>
                            </div>
                        ))}
                    </motion.div>

                </div>
            </div>
        </div>
    )
}

import React, { useRef, useState } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { createPortal } from 'react-dom'
import resumePdf from '../assets/files/Developer_MayankResume.pdf'

export default function ResumeAnimation() {
    const containerRef = useRef(null)
    const [showResume, setShowResume] = useState(false)
    const [isLanded, setIsLanded] = useState(false)
    
    // Detect when the user scrolls this section into view
    const isInView = useInView(containerRef, { once: true, amount: 0.5 })

    return (
        <div 
            ref={containerRef} 
            className={`w-full h-[200vh] relative font-mono mt-32 ${isLanded ? 'cursor-pointer' : ''}`}
            onClick={() => {
                if (isLanded) setShowResume(true)
            }}
        >
            <div className="sticky top-0 w-full h-screen flex flex-col items-center justify-center overflow-hidden border-t border-blue-500/30">
                <h2 className="absolute top-20 text-5xl font-bold tracking-widest text-blue-500/20 uppercase z-0 pointer-events-none">Resume</h2>
                
                {/* The Paper Plane */}
            <motion.div 
                className={`relative z-10 flex flex-col items-center pointer-events-none ${isLanded ? 'hover:scale-125 transition-transform duration-300' : ''}`}
                initial={{ x: "-80vw", y: "-80vh", rotate: 135, scale: 0.1, opacity: 0 }}
                animate={isInView ? { x: 0, y: 0, rotate: 0, scale: 1.5, opacity: 1 } : {}}
                transition={{ duration: 4, ease: "easeOut" }}
                onAnimationComplete={() => {
                    if (isInView) setIsLanded(true)
                }}
            >
                {/* SVG Paper Plane */}
                <svg xmlns="http://www.w3.org/2000/svg" className="w-20 h-20 text-blue-400 drop-shadow-[0_0_20px_rgba(59,130,246,0.8)]" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M2,21L23,12L2,3V10L17,12L2,14V21Z" />
                </svg>
                
                {/* Click Instruction */}
                <AnimatePresence>
                    {isLanded && (
                        <motion.div 
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="absolute -bottom-10 whitespace-nowrap text-blue-300 font-mono text-xs uppercase tracking-widest bg-blue-900/50 px-3 py-1 rounded-full border border-blue-500/50"
                        >
                            Open Resume
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>
        </div>

        {/* Modal for the Resume (Same flip animation as certificates) */}
            {typeof window !== 'undefined' && createPortal(
                <AnimatePresence>
                    {showResume && (
                        <div 
                            className="fixed inset-0 flex items-center justify-center bg-black/80 backdrop-blur-md" 
                            style={{ perspective: "1200px", zIndex: 9999 }}
                            onClick={(e) => {
                                e.stopPropagation();
                                setShowResume(false); // Close if clicking the background
                            }}
                        >
                            <motion.div
                                onClick={(e) => e.stopPropagation()} // Prevent clicks inside modal from closing it or bubbling to section
                                initial={{ opacity: 0, rotateY: 90 }}
                                animate={{ opacity: 1, rotateY: 0 }}
                                exit={{ opacity: 0, rotateY: -90 }}
                                transition={{ duration: 0.5, ease: "easeInOut" }}
                                className="relative flex flex-col items-center justify-center w-[95vw] max-w-[1200px] h-[98vh] max-h-[1400px] transform-style-preserve-3d p-2 rounded-2xl"
                                style={{
                                    background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%)',
                                    border: '1px solid rgba(99, 102, 241, 0.4)',
                                    boxShadow: '0 0 50px rgba(99, 102, 241, 0.3)'
                                }}
                            >
                                <div className="w-full flex-1 border-2 border-blue-500/30 rounded-xl bg-white overflow-hidden relative shadow-inner">
                                    <iframe src={`${resumePdf}#toolbar=0&navpanes=0&scrollbar=0&view=Fit`} className="w-full h-full border-none opacity-95 overflow-hidden" title="Resume Document" scrolling="no"></iframe>
                                </div>

                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setShowResume(false);
                                    }}
                                    className="absolute top-4 right-4 md:top-6 md:right-6 w-12 h-12 bg-black/60 hover:bg-red-600 rounded-full text-white flex items-center justify-center transition-all hover:scale-110 backdrop-blur-md z-50 border border-white/20 shadow-2xl"
                                    title="Close"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </motion.div>
                        </div>
                    )}
                </AnimatePresence>,
                document.body
            )}
        </div>
    )
}

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import './homepage.css'
import mypic from '../assets/mypic.jpg'
import SkillAnimation from './SkillAnimation'

export default function Homepage({ onGoHome }) {
    const profileRef = useRef(null)
    const { scrollYProgress } = useScroll({
        target: profileRef,
        offset: ["start start", "end end"]
    })

    // Map scrollYProgress strictly between 0 and 1
    // Asymmetric spread to fix visual balance (Text is wider than the image, so it needs less left shift)
    const picX = useTransform(scrollYProgress, [0, 1], ["0vw", "28vw"])
    const picY = useTransform(scrollYProgress, [0, 1], ["0px", "120px"]) // Move image down to perfectly center in viewport
    const textX = useTransform(scrollYProgress, [0, 1], ["0vw", "-20vw"])
    const textY = useTransform(scrollYProgress, [0, 1], ["0px", "-120px"]) // Move text up to perfectly center in viewport

    return (
        <motion.div
            className="relative w-full min-h-screen bg-black homepage-container font-sans text-white"
            exit={{ opacity: 0, filter: "blur(20px)", scale: 1.1 }}
            transition={{ duration: 3, ease: "easeInOut" }}
        >
            {/* The White Flash Overlay to maintain the glowing vanish effect */}
            <motion.div
                className="absolute inset-0 z-50 bg-white"
                initial={{ opacity: 1 }}
                animate={{ opacity: 0 }}
                transition={{ duration: 2, delay: 0.5, ease: "easeOut" }}
                style={{ pointerEvents: 'none' }}
            />

            <motion.div
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 2, ease: "easeOut", delay: 0.5 }}
                className="flex flex-col w-full min-h-screen"
            >
                {/* 1. Navbar Compartment */}
                <nav className="w-full py-6 px-10 flex justify-end items-center border-b border-orange-500/20 backdrop-blur-md sticky top-0 z-40">
                    <ul className="flex space-x-8 text-sm font-bold text-slate-300">
                        <li
                            onClick={onGoHome}
                            className="cursor-pointer hover:text-orange-400 transition-all uppercase tracking-wider bg-black/40 px-6 py-2 rounded-full border border-orange-500/30 hover:shadow-[0_0_15px_rgba(249,115,22,0.5)]"
                        >
                            Home
                        </li>
                    </ul>
                </nav>

                {/* 2. Profile Compartment - FULL WIDTH Sticky Scroll Container */}
                {/* Placed outside the max-w-6xl container so it truly spans the full width of the screen */}
                <div ref={profileRef} className="w-full h-[200vh] relative">
                    {/* h-screen sticky top-0 ensures the screen absolutely locks in place while the animation finishes */}
                    {/* Added px-10 to give breathing room on the edges so name doesn't hit the screen border */}
                    <section className="w-full h-screen sticky top-0 flex flex-col items-center justify-center z-20 overflow-hidden px-10">
                        
                        {/* Profile Image (Starts centered, scrolls right and down) */}
                        <motion.div 
                            style={{ x: picX, y: picY }}
                            className="z-10 flex justify-center w-full"
                        >
                            <div className="w-64 h-64 md:w-80 md:h-80 rounded-full bg-gradient-to-tr from-purple-600 to-orange-500 p-1 shadow-[0_0_60px_rgba(249,115,22,0.4)] group hover:scale-105 transition-transform duration-500 cursor-pointer">
                                <div className="w-full h-full rounded-full bg-slate-900 border-4 border-black overflow-hidden flex items-center justify-center">
                                    <img src={mypic} alt="Mayank" className="w-full h-full object-cover" />
                                </div>
                            </div>
                        </motion.div>

                        {/* Text (Starts below image, scrolls left and up) */}
                        <motion.div 
                            style={{ x: textX, y: textY }}
                            className="z-10 flex flex-col items-center text-center mt-8 w-full"
                        >
                            <h1 className="homepage-title font-bold bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-yellow-300 mb-2 drop-shadow-lg uppercase leading-tight whitespace-nowrap">
                                Mayank Upadhyay
                            </h1>
                            <h2 className="homepage-subtitle text-slate-300 font-medium tracking-wide whitespace-nowrap">
                                Software Engineer
                            </h2>
                        </motion.div>
                    </section>
                </div>

                {/* 3. Skills Compartment (Train Animation, fully integrated with scroll) */}
                <SkillAnimation />

                <div className="flex-1 w-full max-w-6xl mx-auto px-6 py-12 flex flex-col space-y-32 mt-32">

                    {/* 4. Experience Compartment */}
                    <motion.section
                        initial={{ opacity: 0, y: 80 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="w-full min-h-[40vh] border border-dashed border-orange-500/30 rounded-2xl flex items-center justify-center bg-black/20 backdrop-blur-sm"
                    >
                        <h3 className="text-3xl text-orange-300 font-semibold tracking-wider">EXPERIENCE SECTION</h3>
                    </motion.section>

                    {/* 5. Education Compartment */}
                    <motion.section
                        initial={{ opacity: 0, y: 80 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="w-full min-h-[40vh] border border-dashed border-yellow-500/30 rounded-2xl flex items-center justify-center bg-black/20 backdrop-blur-sm mb-20"
                    >
                        <h3 className="text-3xl text-yellow-300 font-semibold tracking-wider">EDUCATION SECTION</h3>
                    </motion.section>

                </div>
            </motion.div>
        </motion.div>
    )
}

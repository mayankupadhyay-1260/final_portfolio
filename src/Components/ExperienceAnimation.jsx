import { useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import auCert from '../assets/files/Gemini_Generated_Image_3upbs13upbs13upb.png'
import ineuronCert from '../assets/files/Gemini_Generated_Image_e0ojzee0ojzee0oj.png'

export default function ExperienceAnimation() {
    const containerRef = useRef(null)
    const [selectedFile, setSelectedFile] = useState(null)

    // We make a scrollable container to drive the tree animation
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    })

    // Animation progress for different tiers of the tree
    // We finish all animations by 0.65 so there's a long "plateau" where the tree is fully visible
    // Tier 1: Lines from Experience -> Internships/Projects
    const tier1Lines = useTransform(scrollYProgress, [0, 0.2], [0, 1])
    const tier1Nodes = useTransform(scrollYProgress, [0.15, 0.3], [0, 1])

    // Tier 2: Lines from Internships/Projects -> Leaf Nodes
    const tier2Lines = useTransform(scrollYProgress, [0.3, 0.5], [0, 1])
    const tier2Nodes = useTransform(scrollYProgress, [0.45, 0.65], [0, 1])

    const SVG_W = 1400
    const SVG_H = 800

    const [expandedNode, setExpandedNode] = useState(null)

    const handleOpen = (actionData) => {
        if (actionData.type === 'link') {
            window.open(actionData.url, '_blank')
        } else if (actionData.type === 'file') {
            setSelectedFile(actionData.file)
        }
    }
    const handleToggle = (id) => setExpandedNode(prev => prev === id ? null : id)

    // Coordinates for nodes (compacted vertically to ensure buttons fit on smaller laptop screens)
    const nodes = {
        root: { id: "root", x: 700, y: 120, label: "EXPERIENCE" },
        internships: { id: "internships", x: 350, y: 350, label: "INTERNSHIPS" },
        projects: { id: "projects", x: 1050, y: 350, label: "PROJECTS" },
        au: {
            id: "au", x: 180, y: 580,
            label: "AU Full Stack...",
            buttons: [{ label: "View Certificate", action: () => handleOpen({ type: 'file', file: auCert }) }]
        },
        ineuron: {
            id: "ineuron", x: 520, y: 580,
            label: "ineuron.ai...",
            buttons: [{ label: "View Certificate", action: () => handleOpen({ type: 'file', file: ineuronCert }) }]
        },
        mental: {
            id: "mental", x: 880, y: 580,
            label: "Mental Health...",
            buttons: [
                { label: "GitHub", action: () => handleOpen({ type: 'link', url: 'https://github.com/mayankupadhyay-1260/mental-health-assessment.git' }) },
                { label: "Live Link", action: () => handleOpen({ type: 'link', url: 'https://mental-health-assessment-0am3.onrender.com' }) }
            ]
        },
        book: {
            id: "book", x: 1220, y: 580,
            label: "Book Recomm...",
            buttons: [
                { label: "GitHub", action: () => handleOpen({ type: 'link', url: 'https://github.com/Harshit130127/KNN_based_Bookrecommendation.git' }) }
            ]
        }
    }

    // Helper component for a Tree Node
    const TreeNode = ({ node, opacity, isExpanded, color = "#a855f7" }) => (
        <motion.g style={{ opacity }}>
            <motion.g
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="cursor-pointer"
                onClick={() => handleToggle(node.id)}
            >
                {/* Glowing Aura */}
                <circle cx={node.x} cy={node.y} r={20} fill={color} opacity={0.3} filter="blur(8px)" />
                {/* Node Circle */}
                <circle cx={node.x} cy={node.y} r={10} fill={color} stroke={isExpanded ? "#f97316" : "#fff"} strokeWidth={3} />
                {/* Node Label Box */}
                <rect x={node.x - 140} y={node.y + 25} width={280} height={50} rx={25} fill="rgba(15,12,25,0.9)" stroke={isExpanded ? "#f97316" : color} strokeWidth={isExpanded ? 3 : 2} />
                {/* Text */}
                <text x={node.x} y={node.y + 55} textAnchor="middle" fill="#fff" fontSize={16} fontFamily="monospace" fontWeight="bold" letterSpacing={1}>
                    {node.label}
                </text>
            </motion.g>

            {/* Render buttons via foreignObject if provided AND expanded */}
            {node.buttons && isExpanded && (
                <foreignObject x={node.x - 140} y={node.y + 85} width={280} height={60}>
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="w-full h-full flex justify-center items-center gap-3"
                    >
                        {node.buttons.map((btn, i) => (
                            <button
                                key={i}
                                onClick={btn.action}
                                className="px-4 py-2 bg-black border border-white/20 hover:border-orange-400 text-xs text-white font-bold tracking-widest rounded-full uppercase transition-all hover:bg-orange-500/20 hover:shadow-[0_0_15px_rgba(249,115,22,0.6)]"
                            >
                                {btn.label}
                            </button>
                        ))}
                    </motion.div>
                </foreignObject>
            )}
        </motion.g>
    )

    // Helper component for animated connecting lines
    const TreePath = ({ start, end, progress, color = "#f97316" }) => {
        // Create a smooth cubic bezier curve for the branches
        const midY = start.y + (end.y - start.y) / 2
        // Control points for the curve: pull vertically from start, and vertically from end
        const d = `M ${start.x} ${start.y} C ${start.x} ${midY}, ${end.x} ${midY}, ${end.x} ${end.y}`

        return (
            <motion.path
                d={d}
                fill="none"
                stroke={color}
                strokeWidth={3}
                style={{ pathLength: progress }}
            />
        )
    }

    return (
        <div ref={containerRef} className="w-full h-[350vh] relative z-10 font-mono">
            {/* Sticky viewport so the tree stays in place while scrolling */}
            <div className="w-full h-screen sticky top-0 flex flex-col items-center justify-center overflow-hidden border-t border-[#a855f7]/30" style={{ background: 'transparent' }}>

                <div className="w-full max-w-[1200px] mx-auto px-4 relative">

                    <svg viewBox={`0 0 ${SVG_W} ${SVG_H}`} className="w-full h-auto drop-shadow-2xl overflow-visible">

                        {/* Lines from Root to Tier 1 */}
                        <TreePath start={nodes.root} end={nodes.internships} progress={tier1Lines} color="#a855f7" />
                        <TreePath start={nodes.root} end={nodes.projects} progress={tier1Lines} color="#f97316" />

                        {/* Lines from Tier 1 to Tier 2 */}
                        <TreePath start={nodes.internships} end={nodes.au} progress={tier2Lines} color="#a855f7" />
                        <TreePath start={nodes.internships} end={nodes.ineuron} progress={tier2Lines} color="#a855f7" />

                        <TreePath start={nodes.projects} end={nodes.mental} progress={tier2Lines} color="#f97316" />
                        <TreePath start={nodes.projects} end={nodes.book} progress={tier2Lines} color="#f97316" />

                        {/* Root Node (Always visible) */}
                        <TreeNode node={nodes.root} opacity={1} isExpanded={expandedNode === nodes.root.id} color="#fff" />

                        {/* Tier 1 Nodes */}
                        <TreeNode node={nodes.internships} opacity={tier1Nodes} isExpanded={expandedNode === nodes.internships.id} color="#a855f7" />
                        <TreeNode node={nodes.projects} opacity={tier1Nodes} isExpanded={expandedNode === nodes.projects.id} color="#f97316" />

                        {/* Tier 2 Nodes */}
                        <TreeNode node={nodes.au} opacity={tier2Nodes} isExpanded={expandedNode === nodes.au.id} color="#a855f7" />
                        <TreeNode node={nodes.ineuron} opacity={tier2Nodes} isExpanded={expandedNode === nodes.ineuron.id} color="#a855f7" />
                        <TreeNode node={nodes.mental} opacity={tier2Nodes} isExpanded={expandedNode === nodes.mental.id} color="#f97316" />
                        <TreeNode node={nodes.book} opacity={tier2Nodes} isExpanded={expandedNode === nodes.book.id} color="#f97316" />

                    </svg>

                </div>
            </div>

            {/* Modal Placeholder for Buttons - Uses Portal to escape stacking contexts and cover the navbar */}
            {typeof window !== 'undefined' && createPortal(
                <AnimatePresence>
                    {selectedFile && (
                        <div className="fixed inset-0 flex items-center justify-center bg-black/80 backdrop-blur-md" style={{ perspective: "1200px", zIndex: 9999 }}>
                            <motion.div
                                initial={{ opacity: 0, rotateY: 90 }}
                                animate={{ opacity: 1, rotateY: 0 }}
                                exit={{ opacity: 0, rotateY: -90 }}
                                transition={{ duration: 0.5, ease: "easeInOut" }}
                                className="relative flex flex-col items-center justify-center w-[95vw] max-w-[1400px] h-[95vh] transform-style-preserve-3d"
                            >
                                <img src={selectedFile} className="w-full h-full object-contain drop-shadow-[0_0_50px_rgba(0,0,0,0.8)]" alt="Certificate Document" />

                                <button
                                    onClick={() => setSelectedFile(null)}
                                    className="absolute top-2 right-2 md:top-4 md:right-4 w-12 h-12 bg-black/60 hover:bg-red-600 rounded-full text-white flex items-center justify-center transition-all hover:scale-110 backdrop-blur-md z-50 border border-white/20 shadow-2xl"
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

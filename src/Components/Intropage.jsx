import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect, Suspense, lazy } from 'react'
import "./intropage.css"
import snapAudioFile from '../assets/thanos-snap-sound-effect.mp3'

// Lazy load the Homepage component for better performance on long pages
const Homepage = lazy(() => import('./Homepage'))

export default function Intropage() {
    const [isSnapped, setIsSnapped] = useState(() => {
        const saved = localStorage.getItem('portfolio_isSnapped');
        return saved === 'true';
    });

    useEffect(() => {
        localStorage.setItem('portfolio_isSnapped', isSnapped.toString());
    }, [isSnapped]);
    const [isSnapping, setIsSnapping] = useState(false);



    const playDustSound = () => {
        try {
            const AudioContext = window.AudioContext || window.AudioContext;
            if (!AudioContext) return;
            const ctx = new AudioContext();
            const duration = 4.5; // match slower vanish animation
            const bufferSize = ctx.sampleRate * duration;
            const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
            const data = buffer.getChannelData(0);
            for (let i = 0; i < bufferSize; i++) data[i] = Math.random() * 2 - 1;
            const noise = ctx.createBufferSource();
            noise.buffer = buffer;
            const filter = ctx.createBiquadFilter();
            filter.type = 'lowpass';
            filter.frequency.setValueAtTime(100, ctx.currentTime);
            filter.frequency.linearRampToValueAtTime(2000, ctx.currentTime + 1.5);
            filter.frequency.linearRampToValueAtTime(100, ctx.currentTime + duration);
            const gain = ctx.createGain();
            gain.gain.setValueAtTime(0, ctx.currentTime);
            gain.gain.linearRampToValueAtTime(0.8, ctx.currentTime + 1.0);
            gain.gain.linearRampToValueAtTime(0, ctx.currentTime + duration);
            noise.connect(filter);
            filter.connect(gain);
            gain.connect(ctx.destination);
            noise.start();
        } catch (e) { console.error(e); }
    };

    const playReverseDustSound = () => {
        try {
            const AudioContext = window.AudioContext || window.AudioContext;
            if (!AudioContext) return;
            const ctx = new AudioContext();
            const duration = 4.5;
            const bufferSize = ctx.sampleRate * duration;
            const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
            const data = buffer.getChannelData(0);
            for (let i = 0; i < bufferSize; i++) data[i] = Math.random() * 2 - 1;
            const noise = ctx.createBufferSource();
            noise.buffer = buffer;
            const filter = ctx.createBiquadFilter();
            filter.type = 'lowpass';
            // Reverse sweep: start low, build up to high (sucking dust in)
            filter.frequency.setValueAtTime(100, ctx.currentTime);
            filter.frequency.exponentialRampToValueAtTime(3000, ctx.currentTime + duration - 0.5);
            filter.frequency.linearRampToValueAtTime(100, ctx.currentTime + duration);
            const gain = ctx.createGain();
            gain.gain.setValueAtTime(0, ctx.currentTime);
            gain.gain.linearRampToValueAtTime(0.8, ctx.currentTime + duration - 0.5);
            gain.gain.linearRampToValueAtTime(0, ctx.currentTime + duration);
            noise.connect(filter);
            filter.connect(gain);
            gain.connect(ctx.destination);
            noise.start();
        } catch (e) { console.error(e); }
    };

    const handleReturnHome = () => {
        playReverseDustSound();
        setIsSnapped(false);
        setIsSnapping(false);
    };

    const typeText = "Here is my portfolio. I am an engineer, This is the starting, Snap the Gauntlet to move further..."
    const quoteText = `"Strongest Projects require a stronger AI ~ Thanos from alternate universe"`

    const handleSnap = () => {
        if (isSnapping || isSnapped) return;
        setIsSnapping(true);

        // Play the user's provided snap sound from assets
        const snapAudio = new Audio(snapAudioFile);
        snapAudio.play().catch(e => console.log("Audio play blocked", e));

        // Freeze the screen for a moment after snap, then trigger vanish and dust sound
        setTimeout(() => {
            setIsSnapped(true);
            playDustSound();
        }, 2000); // 2 second pause gap
    };

    return (
        <div className="relative min-h-screen bg-black w-full flex flex-col items-center justify-center">

            <AnimatePresence mode="wait">
                {!isSnapped ? (
                    <motion.div
                        key="intro"
                        initial={{
                            opacity: 0,
                            filter: "blur(20px)",
                            scale: 1.05
                        }}
                        animate={{
                            opacity: 1,
                            filter: "blur(0px)",
                            scale: 1
                        }}
                        exit={{
                            opacity: 0,
                            filter: "blur(20px)",
                            scale: 1.05
                        }}
                        transition={{ duration: 4.5, ease: "easeInOut" }}
                        className="absolute inset-0 w-full h-full flex flex-col items-center justify-center"
                    >
                        {/* Tech Background Image */}
                        <div
                            className="absolute inset-0 z-0 bg-cover bg-center"
                            style={{ backgroundImage: `url('/bg.png')` }}
                        >
                            {/* Dark overlay for readability */}
                            <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-[2px]" />
                        </div>

                        {/* Initial Content (Text and Quote) */}
                        <div className="relative z-10 flex flex-col w-full h-full px-8 pt-12 md:px-20 md:pt-16">

                            <h1 className="font-bold mb-6 text-white leading-relaxed max-w-[90%] md:max-w-[60%] text-left min-h-[100px]">
                                {typeText.split('').map((char, index) => (
                                    <motion.span
                                        key={index}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ duration: 0.05, delay: 4.5 + index * 0.03 }} // Waits 4.5s for the blur/dust to clear!
                                        className={`intro-text text-[50px] ${char === '.' || char === ',' ? "text-purple-400" : ""}`}
                                    >
                                        {char}
                                    </motion.span>
                                ))}
                            </h1>

                            <motion.p
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 1, delay: 4.5 + typeText.length * 0.03 + 0.5 }}
                                className="my-quote text-[10px] text-pink-300 font-mono italic border-r-4 border-pink-500 pr-4 py-2 mt-8 self-end text-right max-w-[80%] md:max-w-[50%]"
                            >
                                {quoteText}
                            </motion.p>
                        </div>

                        {/* Thanos Gauntlet Button */}
                        <motion.div
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 4.5 + typeText.length * 0.03 + 1.5, duration: 1 }}
                            className="absolute bottom-10 z-20 flex flex-col items-center cursor-pointer"
                            onClick={handleSnap}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                        >
                            <span className="text-xs uppercase tracking-widest mb-3 text-yellow-400 font-semibold drop-shadow-[0_0_8px_rgba(234,179,8,0.8)]">Snap to Enter</span>

                            <motion.img
                                src="/gauntlet.png"
                                alt="Thanos Gauntlet"
                                className="w-24 h-24 object-contain"
                                style={{ mixBlendMode: 'screen', originY: 1 }}
                                animate={isSnapping ? { scaleY: [1, 0.7, 1.2, 1], scaleX: [1, 1.2, 0.9, 1], rotate: [0, -5, 5, 0] } : {}}
                                transition={{ duration: 0.3, ease: "easeInOut" }}
                            />
                        </motion.div>

                    </motion.div>
                ) : (
                    <Suspense fallback={<div className="absolute inset-0 w-full h-full bg-white z-50"></div>}>
                        <Homepage key="next" onGoHome={handleReturnHome} />
                    </Suspense>
                )}
            </AnimatePresence>

        </div>
    )
}

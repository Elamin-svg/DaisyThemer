import { PREVIEW_THEMES } from "#/features/creator/constants/previewThemes";
import { Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { InfiniteSlider } from "#/shared/ui/motion/infinite-slider";
import PreviewThemeCard from "./PreviewThemeCard";

export default function Hero() {
    return (
        <section className="max-w-6xl mx-auto py-16   flex flex-col items-center gap-12 text-center ">
            <div className="text-left md:text-center flex flex-col items-center">
                <motion.h2
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, ease: "linear" }}
                    className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-center tracking-tight mx-auto max-w-4xl leading-tight sm:leading-[1.1]"
                >
                    Create, Share & Discover beautiful{" "}
                    <span className="text-primary">DaisyUI</span> Themes
                </motion.h2>
                <motion.p
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.1, ease: "linear" }}
                    className="text-base  text-base-content/80 text-center sm:text-xl opacity-80 mt-6 max-w-2xl leading-relaxed"
                >
                    Create a stunning theme in seconds, fine-tune the colors, and share your masterpiece with the community.
                </motion.p>
                <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.2, ease: "linear" }}
                    className="mt-8 flex-col justify-center flex md:flex-row md:space-x-4 space-y-3 md:space-y-0 w-full md:w-auto"
                >
                    <Link to="/browse" className="btn md:btn-wide lg:btn-lg btn-primary text-base shadow-lg shadow-primary/20">
                        Browse Themes
                    </Link>
                    <Link to="/create" className="btn md:btn-wide lg:btn-lg btn-outline text-base">
                        Create Theme
                    </Link>
                </motion.div>
            </div>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.3, ease: "linear" }}
                style={{ gap: '16px', maskImage: 'linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)' }}
                className="gap-6 flex flex-col max-w-7xl mx-auto relative w-full"
            >
                <InfiniteSlider speedOnHover={20} gap={24}>
                    {PREVIEW_THEMES.map((themeData, idx) => (
                        <PreviewThemeCard key={`${idx}-1`} data={themeData} />
                    ))}
                </InfiniteSlider>
                <InfiniteSlider speedOnHover={20} reverse gap={24}>
                    {PREVIEW_THEMES.reverse().map((themeData, idx) => (
                        <PreviewThemeCard key={`${idx}-2`} data={themeData} />
                    ))}
                </InfiniteSlider>
            </motion.div>

        </section >
    );
}
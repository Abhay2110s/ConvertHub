import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import DashboardHeader from "../dashboard/DashboardHeader";

export default function CalculatorLayout({ title, description, eyebrow = "ConvertHub Tool", accent = "#8B5CF6", children }) {
  return (
    <>
      <DashboardHeader />
      <main className="relative min-h-screen overflow-hidden bg-[#FFF8EC]">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-[0.10] [background-image:linear-gradient(#000_1px,transparent_1px),linear-gradient(90deg,#000_1px,transparent_1px)] [background-size:32px_32px]" />
      <div aria-hidden="true" className="pointer-events-none absolute -left-32 top-32 h-80 w-80 rounded-full bg-[#8B5CF6] opacity-[0.13] blur-3xl" />
      <div aria-hidden="true" className="pointer-events-none absolute -right-32 top-72 h-96 w-96 rounded-full bg-[#5EEAD4] opacity-[0.13] blur-3xl" />
      <div className="relative z-10 mx-auto max-w-6xl px-5 py-8 sm:px-8 lg:px-10">
        <Link to="/dashboard" className="inline-flex items-center gap-2 border-[3px] border-black bg-white px-4 py-2.5 font-black shadow-[4px_4px_0px_#000] transition-transform hover:-translate-y-0.5">
          <ArrowLeft size={17} strokeWidth={3} /> Dashboard
        </Link>
        <section className="py-12">
          <motion.div initial={{opacity:0,x:-15}} animate={{opacity:1,x:0}} className="inline-flex items-center border-[3px] border-black px-4 py-2 text-xs font-black uppercase tracking-[0.16em] shadow-[4px_4px_0px_#000]" style={{backgroundColor: accent}}>
            {eyebrow}
          </motion.div>
          <motion.h1 initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:.08}} className="mt-6 text-5xl font-black leading-none sm:text-7xl" style={{fontFamily:"'Fredoka', sans-serif"}}>
            {title}<span style={{color:accent}}>.</span>
          </motion.h1>
          <p className="mt-5 max-w-2xl text-lg leading-7 text-zinc-600">{description}</p>
        </section>
        {children}
      </div>
      </main>
    </>
  );
}

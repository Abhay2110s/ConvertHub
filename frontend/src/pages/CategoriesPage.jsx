import { Link } from "react-router-dom";
import { ArrowRight, Layers } from "lucide-react";
import { motion } from "framer-motion";
import DashboardHeader from "../components/dashboard/DashboardHeader";
import { categories } from "../data/categories";

export default function CategoriesPage(){
  return <>
    <DashboardHeader/>
    <main className="relative min-h-screen overflow-hidden bg-[#F4F0FF]">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-[0.10] [background-image:linear-gradient(#000_1px,transparent_1px),linear-gradient(90deg,#000_1px,transparent_1px)] [background-size:30px_30px]"/>
      <div aria-hidden="true" className="pointer-events-none absolute -left-32 top-28 h-80 w-80 rounded-full bg-[#8B5CF6] opacity-[0.13] blur-3xl"/>
      <div aria-hidden="true" className="pointer-events-none absolute -right-24 bottom-20 h-96 w-96 rounded-full bg-[#F43F5E] opacity-[0.10] blur-3xl"/>
      <div className="relative z-10 mx-auto max-w-7xl px-5 py-10 sm:px-8 lg:px-10">
        <section className="py-10 sm:py-14">
          <div className="inline-flex items-center gap-2 border-[3px] border-black bg-[#8B5CF6] px-4 py-2 text-xs font-black uppercase tracking-wider text-white shadow-[4px_4px_0px_#000]"><Layers size={15}/> Categories</div>
          <h1 className="mt-6 text-5xl font-black sm:text-7xl" style={{fontFamily:"'Fredoka', sans-serif"}}>Find your<br/><span className="text-[#F43F5E]">category.</span></h1>
          <p className="mt-5 max-w-2xl text-lg leading-7 text-zinc-600">Every ConvertHub tool is grouped so you can reach the right calculator without hunting.</p>
        </section>
        <div className="grid gap-7 pb-24 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((c,i)=><motion.div key={c.id} initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{delay:i*.06}}>
            <Link to={`/category/${c.id}`} className="block h-full border-[3px] border-black bg-white p-7 shadow-[6px_6px_0px_#000] transition-transform hover:-translate-y-1">
              <div className="flex h-14 w-14 items-center justify-center border-[3px] border-black shadow-[3px_3px_0px_#000]" style={{backgroundColor:c.accent}}><span className="text-2xl">{c.icon}</span></div>
              <h2 className="mt-6 text-2xl font-black" style={{fontFamily:"'Fredoka', sans-serif"}}>{c.name}</h2>
              <p className="mt-2 leading-6 text-zinc-500">{c.description}</p>
              <div className="mt-7 flex items-center justify-between text-xs font-black uppercase tracking-wider"><span>{c.count} tools</span><ArrowRight size={18}/></div>
            </Link>
          </motion.div>)}
        </div>
      </div>
    </main>
  </>;
}

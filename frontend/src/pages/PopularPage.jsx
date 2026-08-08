import { Link } from "react-router-dom";
import { ArrowRight, Flame } from "lucide-react";
import { motion } from "framer-motion";
import DashboardHeader from "../components/dashboard/DashboardHeader";

const POPULAR = [
  ["length","Length Converter","Convert meters, kilometers, miles, feet and more.","#8B5CF6"],
  ["currency","Currency Converter","Convert between major currencies.","#FDE047"],
  ["percentage","Percentage Calculator","Solve percentage-of, reverse, increase, decrease and difference calculations.","#5EEAD4"],
  ["simpleInterest","Simple Interest Calculator","Calculate simple interest and maturity amount.","#F43F5E"],
  ["compoundInterest","Compound Interest Calculator","Compare growth across compounding frequencies.","#8B5CF6"],
  ["emi","EMI Calculator","Estimate monthly payment, total interest and total payment.","#FDE047"],
  ["dateDifference","Date Difference Calculator","Compare two dates without separate month or year fields.","#5EEAD4"],
  ["age","Age Calculator","Calculate exact calendar age from a birth date.","#F43F5E"],
  ["cooking","Cooking Converter","Convert common kitchen volume measurements.","#8B5CF6"],
  ["shoeSize","Shoe Size Converter","Convert shoe sizes across major systems.","#FDE047"]
];

export default function PopularPage(){
  return <>
    <DashboardHeader/>
    <main className="relative min-h-screen overflow-hidden bg-[#FFF8EC]">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-[0.10] [background-image:radial-gradient(#000_1.1px,transparent_1.1px)] [background-size:20px_20px]"/>
      <div aria-hidden="true" className="pointer-events-none absolute -left-24 top-48 h-80 w-80 rounded-full bg-[#F43F5E] opacity-[0.10] blur-3xl"/>
      <div aria-hidden="true" className="pointer-events-none absolute -right-24 bottom-10 h-96 w-96 rounded-full bg-[#8B5CF6] opacity-[0.11] blur-3xl"/>
      <div className="relative z-10 mx-auto max-w-7xl px-5 py-10 sm:px-8 lg:px-10">
        <section className="py-10 sm:py-14">
          <div className="inline-flex items-center gap-2 border-[3px] border-black bg-[#F43F5E] px-4 py-2 text-xs font-black uppercase tracking-wider text-white shadow-[4px_4px_0px_#000]"><Flame size={15}/> Popular Tools</div>
          <h1 className="mt-6 text-5xl font-black sm:text-7xl" style={{fontFamily:"'Fredoka', sans-serif"}}>What people use<br/><span className="text-[#8B5CF6]">most often.</span></h1>
          <p className="mt-5 max-w-2xl text-lg leading-7 text-zinc-600">Fast access to the calculators and converters that matter most.</p>
        </section>
        <div className="grid gap-7 pb-24 sm:grid-cols-2 lg:grid-cols-3">
          {POPULAR.map(([id,title,description,accent],i)=><motion.div key={id} initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{delay:i*.04}} className="border-[3px] border-black bg-white p-6 shadow-[6px_6px_0px_#000] hover:-translate-y-1">
            <div className="flex h-12 w-12 items-center justify-center border-[3px] border-black shadow-[3px_3px_0px_#000]" style={{backgroundColor:accent}}><span className="font-black">{String(i+1).padStart(2,"0")}</span></div>
            <h2 className="mt-6 text-2xl font-black" style={{fontFamily:"'Fredoka', sans-serif"}}>{title}</h2><p className="mt-2 text-sm leading-6 text-zinc-500">{description}</p>
            <Link to={`/calculator/${id}`} className="mt-6 inline-flex items-center gap-2 border-[3px] border-black bg-[#FDE047] px-4 py-2.5 font-black shadow-[3px_3px_0px_#000]">Open <ArrowRight size={17}/></Link>
          </motion.div>)}
        </div>
      </div>
    </main>
  </>;
}

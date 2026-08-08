import { Link, useLocation } from "react-router-dom";
import { ArrowRight, Menu, X } from "lucide-react";
import { useState } from "react";

const NAV_ITEMS = [
  ["Dashboard","/dashboard"],
  ["Categories","/categories"],
  ["Popular","/popular"]
];

export default function DashboardHeader(){
  const [open,setOpen]=useState(false);
  const location=useLocation();
  return <header className="relative z-50 border-b-[3px] border-black bg-[#FFF8EC]">
    <div className="pointer-events-none absolute inset-0 opacity-30 [background-image:radial-gradient(#111_1.2px,transparent_1.2px)] [background-size:18px_18px] [mask-image:linear-gradient(to_right,black,transparent_85%)]"/>
    <div className="relative mx-auto flex h-[78px] max-w-7xl items-center justify-between px-5 sm:px-8 lg:px-10">
      <Link to="/dashboard" className="flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-[42%] border-[3px] border-black bg-[#8B5CF6] text-xl font-black text-white shadow-[4px_4px_0px_#000]">C</div>
        <div className="hidden sm:block"><div className="text-2xl font-bold" style={{fontFamily:"'Fredoka', sans-serif"}}>Convert<span className="text-[#8B5CF6]">Hub</span></div><div className="text-[9px] font-black uppercase tracking-[0.22em] text-zinc-500">Simple • Fast • Useful</div></div>
      </Link>
      <nav className="hidden items-center gap-2 lg:flex">{NAV_ITEMS.map(([label,href])=><Link key={href} to={href} className={`relative px-4 py-2 text-sm font-bold ${location.pathname===href ? "text-[#F43F5E]":"text-black"}`}>{label}{location.pathname===href&&<span className="absolute bottom-0 left-4 right-4 h-1 bg-[#F43F5E]"/>}</Link>)}</nav>
      <div className="flex items-center gap-3">
        <Link to="/" className="hidden items-center gap-2 border-[3px] border-black bg-[#F43F5E] px-4 py-2.5 text-sm font-black text-white shadow-[4px_4px_0px_#000] md:flex">Home <ArrowRight size={17}/></Link>
        <button onClick={()=>setOpen(v=>!v)} className="flex h-10 w-10 items-center justify-center border-[3px] border-black bg-[#FDE047] shadow-[3px_3px_0px_#000] lg:hidden" aria-label="Menu">{open?<X size={20}/>:<Menu size={20}/>}</button>
      </div>
    </div>
    {open&&<div className="border-t-[3px] border-black bg-white p-5 lg:hidden"><div className="grid gap-3">{NAV_ITEMS.map(([label,href])=><Link onClick={()=>setOpen(false)} key={href} to={href} className="border-[3px] border-black bg-[#FFF8EC] px-4 py-3 font-black shadow-[3px_3px_0px_#000]">{label}</Link>)}<Link onClick={()=>setOpen(false)} to="/" className="border-[3px] border-black bg-[#F43F5E] px-4 py-3 font-black text-white shadow-[3px_3px_0px_#000]">Back to Home</Link></div></div>}
  </header>
}

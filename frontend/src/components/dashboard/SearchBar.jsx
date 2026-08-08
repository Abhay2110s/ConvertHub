import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Search, X } from "lucide-react";
import { financeCalculators } from "../../data/financeCalculators";
import { dateTimeCalculators } from "../../data/dateTimeCalculators";
import { everydayCalculators } from "../../data/everydayCalculators";
import { unitConverters } from "../../data/unitConverters";

const ITEMS = [
  ...unitConverters.map(x => ({ title:x.name, description:`${x.name} for everyday measurements`, category:"Unit Conversion", path:`/calculator/${x.id}`, keywords:x.id })),
  ...financeCalculators.map(x => ({ title:x.name, description:"Finance calculator", category:"Finance", path:`/calculator/${x.id}`, keywords:x.id })),
  ...dateTimeCalculators.map(x => ({ title:x.name, description:"Date & time calculator", category:"Date & Time", path:`/calculator/${x.id}`, keywords:x.id })),
  ...everydayCalculators.map(x => ({ title:x.name, description:x.description, category:"Everyday", path:`/calculator/${x.id}`, keywords:x.id }))
];

export default function SearchBar() {
  const [query,setQuery] = useState("");
  const [open,setOpen] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    const onKeyDown = (event) => {
      const target = event.target;
      const typing = target instanceof HTMLInputElement || target instanceof HTMLTextAreaElement || target instanceof HTMLSelectElement;
      if (event.key === "/" && !typing) {
        event.preventDefault();
        inputRef.current?.focus();
        setOpen(true);
      }
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return ITEMS.slice(0,10);
    return ITEMS.filter(x => `${x.title} ${x.description} ${x.category} ${x.keywords}`.toLowerCase().includes(q)).slice(0,12);
  },[query]);

  return (
    <div className="relative">
      <div className={`flex items-center gap-3 border-[3px] border-black bg-white px-4 py-3 shadow-[5px_5px_0px_#000] ${open ? "shadow-[7px_7px_0px_#8B5CF6]" : ""}`}>
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-[3px] border-black bg-[#FDE047]"><Search size={20} strokeWidth={3}/></div>
        <input ref={inputRef} value={query} onFocus={()=>setOpen(true)} onChange={e=>setQuery(e.target.value)} onKeyDown={e=>{if(e.key==="Escape")setOpen(false)}} className="w-full bg-transparent font-bold outline-none" placeholder="Search converters and calculators..."/>
        {query && <button onClick={()=>setQuery("")} aria-label="Clear"><X size={18}/></button>}
        {!query && <kbd className="hidden border-2 border-zinc-300 px-2 py-1 text-xs sm:block">/</kbd>}
      </div>
      {open && <div className="absolute left-0 right-0 top-[calc(100%+10px)] z-50 overflow-hidden border-[3px] border-black bg-white shadow-[7px_7px_0px_#F43F5E]">
        <div className="flex justify-between border-b-[3px] border-black bg-[#FFF8EC] px-4 py-3 text-xs font-black uppercase tracking-wider"><span>{query?"Search Results":"All Tools"}</span><span>{results.length}</span></div>
        <div className="max-h-[420px] overflow-y-auto p-2">
          {results.length ? results.map((x,i)=><Link key={`${x.path}-${i}`} onClick={()=>setOpen(false)} to={x.path} className="group flex items-center gap-3 border-b-2 border-dashed border-zinc-200 px-3 py-3 hover:bg-[#FFF8EC]">
            <div className="min-w-0 flex-1"><div className="font-black">{x.title}</div><div className="text-xs text-zinc-500">{x.description} • {x.category}</div></div>
            <ArrowRight size={18} className="shrink-0 transition-transform group-hover:translate-x-1"/>
          </Link>) : <div className="p-8 text-center text-sm font-bold text-zinc-500">Nothing found. Try another tool.</div>}
        </div>
      </div>}
    </div>
  );
}

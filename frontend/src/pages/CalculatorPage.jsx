import { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowRight, RefreshCcw, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { convert as convertUnit } from "../engines/unitEngine";
import { calculate as calculateFinance } from "../engines/financeEngine";
import { calculate as calculateDate } from "../engines/dateEngine";
import { calculate as calculateEveryday } from "../engines/everydayEngine";
import CalculatorLayout from "../components/calculator/CalculatorLayout";
import { formatNumber } from "../utils/formatter";

const UNIT_OPTIONS = {
  length:[["meter","Meter"],["kilometer","Kilometer"],["centimeter","Centimeter"],["millimeter","Millimeter"],["mile","Mile"],["yard","Yard"],["foot","Foot"],["inch","Inch"]],
  weight:[["kilogram","Kilogram"],["gram","Gram"],["milligram","Milligram"],["metricTon","Metric Ton"],["pound","Pound"],["ounce","Ounce"],["stone","Stone"]],
  area:[["squareMeter","Square Meter"],["squareKilometer","Square Kilometer"],["squareFoot","Square Foot"],["squareInch","Square Inch"],["acre","Acre"],["hectare","Hectare"]],
  volume:[["liter","Liter"],["milliliter","Milliliter"],["cubicMeter","Cubic Meter"],["cubicCentimeter","Cubic Centimeter"],["gallon","Gallon"],["quart","Quart"],["pint","Pint"],["cup","Cup"]],
  speed:[["meterPerSecond","Meter / Second"],["kilometerPerHour","Kilometer / Hour"],["milePerHour","Mile / Hour"],["footPerSecond","Foot / Second"],["knot","Knot"]],
  temperature:[["celsius","Celsius"],["fahrenheit","Fahrenheit"],["kelvin","Kelvin"]],
  pressure:[["pascal","Pascal"],["kilopascal","Kilopascal"],["bar","Bar"],["atm","Atmosphere"],["psi","PSI"],["mmHg","mmHg"],["torr","Torr"]],
  force:[["newton","Newton"],["kilonewton","Kilonewton"],["dyne","Dyne"],["poundForce","Pound-force"],["kilogramForce","Kilogram-force"]],
  torque:[["newtonMeter","Newton Meter"],["kilonewtonMeter","Kilonewton Meter"],["poundForceFoot","Pound-force Foot"],["dyneCentimeter","Dyne Centimeter"]],
  density:[["kgPerM3","kg/m³"],["gPerCm3","g/cm³"],["lbPerFt3","lb/ft³"]],
  energy:[["joule","Joule"],["kilojoule","Kilojoule"],["calorie","Calorie"],["kilocalorie","Kilocalorie"],["wattHour","Watt-hour"],["kilowattHour","Kilowatt-hour"],["btu","BTU"]],
  power:[["watt","Watt"],["kilowatt","Kilowatt"],["megawatt","Megawatt"],["horsepower","Horsepower"],["btuPerHour","BTU/hour"]],
  frequency:[["hertz","Hertz"],["kilohertz","Kilohertz"],["megahertz","Megahertz"],["gigahertz","Gigahertz"]],
  fuelConsumption:[["kmPerLiter","km/L"],["milesPerGallon","MPG"],["litersPer100km","L/100 km"]]
};

const CURRENCY_OPTIONS = [["USD","US Dollar"],["EUR","Euro"],["GBP","British Pound"],["INR","Indian Rupee"],["JPY","Japanese Yen"],["AUD","Australian Dollar"],["CAD","Canadian Dollar"]];

const CONFIG = {
  length:["Length Converter","Convert length units precisely.","unit"],
  weight:["Weight Converter","Convert mass and weight units.","unit"],
  area:["Area Converter","Convert area measurements.","unit"],
  volume:["Volume Converter","Convert liquid and cubic volume.","unit"],
  speed:["Speed Converter","Convert speed between common units.","unit"],
  temperature:["Temperature Converter","Convert Celsius, Fahrenheit and Kelvin.","unit"],
  pressure:["Pressure Converter","Convert pressure measurements.","unit"],
  force:["Force Converter","Convert force measurements.","unit"],
  torque:["Torque Converter","Convert torque measurements.","unit"],
  density:["Density Converter","Convert density units.","unit"],
  energy:["Energy Converter","Convert energy measurements.","unit"],
  power:["Power Converter","Convert power measurements.","unit"],
  frequency:["Frequency Converter","Convert frequency measurements.","unit"],
  fuelConsumption:["Fuel Consumption Converter","Convert fuel economy formats.","unit"],
  percentage:["Percentage Calculator","Solve common percentage problems with the fields that each calculation needs.","finance"],
  simpleInterest:["Simple Interest Calculator","Calculate principal, simple interest and total amount.","finance"],
  compoundInterest:["Compound Interest Calculator","Calculate compound growth with selectable compounding.","finance"],
  profitLoss:["Profit & Loss Calculator","Calculate profit, loss and percentage.","finance"],
  discount:["Discount Calculator","Calculate discount amount and final price.","finance"],
  gst:["GST Calculator","Calculate GST amount and total price.","finance"],
  tax:["Tax Calculator","Calculate tax amount and total price.","finance"],
  emi:["EMI Calculator","Calculate monthly EMI, interest and total payment.","finance"],
  loan:["Loan Calculator","Estimate monthly loan payment and total interest.","finance"],
  sip:["SIP Calculator","Estimate SIP future value and invested amount.","finance"],
  currency:["Currency Converter","Convert between major currencies.","finance"],
  age:["Age Calculator","Calculate age from one birth date. No month or year fields are required.","datetime"],
  dateDifference:["Date Difference Calculator","Compare two dates using date fields only.","datetime"],
  businessDays:["Business Days Calculator","Count weekdays between two dates.","datetime"],
  countdown:["Countdown Timer","Calculate the remaining time until a target date and time.","datetime"],
  timezone:["Timezone Converter","Convert a date and time between supported time zones.","datetime"],
  bmi:["BMI Calculator","Estimate BMI from weight and height.","everyday"],
  calories:["Calorie Calculator","Estimate daily calorie needs from body and activity details.","everyday"],
  cooking:["Cooking Converter","Convert common kitchen volume measurements.","everyday"],
  clothingSize:["Clothing Size Converter","Convert clothing sizes between US, EU, UK and JP.","everyday"],
  shoeSize:["Shoe Size Converter","Convert shoe sizes between US, EU, UK and JP.","everyday"]
};

function Field({label,value,onChange,type="number",placeholder}) {
  return (
    <label className="block min-w-0">
      <span className="mb-2 block text-xs font-black uppercase tracking-wider text-zinc-500">
        {label}
      </span>
      <input
        type={type}
        inputMode={type === "number" ? "decimal" : undefined}
        step={type === "number" ? "any" : undefined}
        value={value ?? ""}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        className="
          h-12 w-full min-w-0 border-[3px] border-black bg-white
          px-4 py-3 font-bold outline-none transition
          placeholder:text-zinc-400
          focus:translate-y-[-1px]
          focus:shadow-[4px_4px_0px_#8B5CF6]
        "
      />
    </label>
  );
}

function SelectField({label,value,onChange,options}) {
  return (
    <label className="block min-w-0">
      <span className="mb-2 block text-xs font-black uppercase tracking-wider text-zinc-500">
        {label}
      </span>
      <div className="relative">
        <select
          value={value}
          onChange={e => onChange(e.target.value)}
          className="
            h-12 w-full min-w-0 appearance-none border-[3px] border-black
            bg-[#FFF8EC] px-4 pr-11 py-3 font-black text-black outline-none
            transition cursor-pointer
            hover:-translate-y-0.5 hover:bg-[#FDE047]
            focus:translate-y-[-1px]
            focus:bg-white
            focus:shadow-[4px_4px_0px_#8B5CF6]
          "
        >
          {options.map(([id,name]) => (
            <option key={id} value={id}>{name}</option>
          ))}
        </select>
        <ChevronDown
          aria-hidden="true"
          size={20}
          strokeWidth={3}
          className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2"
        />
      </div>
    </label>
  );
}
function DateField({label,value,onChange,dateTime=false}) { return <Field label={label} value={value} onChange={onChange} type={dateTime?"datetime-local":"date"}/>; }

function Result({result}) {
  return <AnimatePresence mode="wait">
    {result != null && (
      <motion.div key="result" initial={{opacity:0,y:12}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-8}} transition={{duration:0.2}} className="mt-8 grid gap-4 sm:grid-cols-2">
        {(typeof result === "object" ? Object.entries(result) : [["result",result]]).map(([key,value],i)=><div key={key} className={`border-[3px] border-black p-4 shadow-[4px_4px_0px_#000] ${i===0?"bg-[#FDE047]":"bg-[#FFF8EC]"}`}>
          <div className="text-xs font-black uppercase tracking-wider text-zinc-500">{key.replace(/([A-Z])/g," $1")}</div>
          <div className="mt-1 break-words text-2xl font-black">{typeof value==="number"?(Number.isFinite(value)?formatNumber(value):"—"):String(value)}</div>
        </div>)}
      </motion.div>
    )}
  </AnimatePresence>;
}

export default function CalculatorPage() {
  const {type} = useParams();
  const config = CONFIG[type];
  const [values,setValues]=useState({});
  const [result,setResult]=useState(null);
  const [error,setError]=useState("");
  const units=UNIT_OPTIONS[type];
  const set=(key,value)=>setValues(v=>({...v,[key]:value}));
  const defaults=useMemo(()=>({from:units?.[0]?.[0]??"",to:units?.[1]?.[0]??units?.[0]?.[0]??""}),[type]);

  if (!config) return <CalculatorLayout title="Calculator Not Found" description="That tool is not configured yet."><Link to="/dashboard" className="inline-flex border-[3px] border-black bg-[#FDE047] px-4 py-2 font-black shadow-[3px_3px_0px_#000]">Back to Dashboard</Link></CalculatorLayout>;

  const num=(v,label="Value")=>{
    const n=parseFloat(v);
    if(v===undefined||v===null||v===""||!Number.isFinite(n)) throw new Error(`${label} must be a valid number.`);
    return n;
  };

  const calculate=async()=>{
    setError("");
    try {
      let output;
      if (units) output=await convertUnit(num(values.value,"Value"),values.from||defaults.from,values.to||defaults.to,type);
      else if (type==="percentage") output=await calculateFinance(type,[values.mode||"of",num(values.a,"X"),num(values.b,"Y")]);
      else if (type==="simpleInterest") output=await calculateFinance(type,[num(values.principal,"Principal"),num(values.rate,"Rate"),num(values.time,"Time")]);
      else if (type==="compoundInterest") output=await calculateFinance(type,[num(values.principal,"Principal"),num(values.rate,"Rate"),num(values.time,"Time"),num(values.frequency||1,"Compounds/Year")]);
      else if (type==="profitLoss") output=await calculateFinance(type,[num(values.cost,"Cost Price"),num(values.selling,"Selling Price")]);
      else if (["discount","gst","tax"].includes(type)) output=await calculateFinance(type,[num(values.amount,"Amount"),num(values.rate,"Rate")]);
      else if (type==="emi"||type==="loan") output=await calculateFinance(type,[num(values.principal,"Principal"),num(values.rate,"Rate"),num(values.tenure,"Tenure")]);
      else if (type==="sip") output=await calculateFinance(type,[num(values.monthly,"Monthly Investment"),num(values.rate,"Rate"),num(values.time,"Time")]);
      else if (type==="currency") {
        const rates={USD:1,EUR:.92,GBP:.79,INR:83.5,JPY:149.5,AUD:1.52,CAD:1.36};
        output=await calculateFinance(type,[num(values.amount,"Amount"),values.fromCurrency||"USD",values.toCurrency||"INR",rates]);
      } else if (type==="age") output=await calculateDate(type,[values.birth,values.asOf||new Date().toISOString().slice(0,10)]);
      else if (type==="dateDifference"||type==="businessDays") output=await calculateDate(type,[values.start,values.end]);
      else if (type==="countdown") output=await calculateDate(type,[values.target]);
      else if (type==="timezone") output=await calculateDate(type,[values.dateTime,values.fromZone||"UTC",values.toZone||"Asia/Kolkata"]);
      else if (["bmi","calories","cooking","clothingSize","shoeSize"].includes(type)) {
        if(type==="bmi") output=await calculateEveryday(type,[num(values.weight,"Weight"),num(values.height,"Height")]);
        if(type==="calories") output=await calculateEveryday(type,[num(values.weight,"Weight"),num(values.height,"Height"),num(values.age,"Age"),values.gender||"male",values.activityLevel||"moderate"]);
        if(type==="cooking") output=await calculateEveryday(type,[num(values.amount,"Amount"),values.fromUnit||"cup",values.toUnit||"milliliter"]);
        if(type==="clothingSize"||type==="shoeSize") output=await calculateEveryday(type,[num(values.size,"Size"),values.fromSystem||"us",values.toSystem||"eu"]);
      } else throw new Error("This calculator is not configured yet.");
      setResult(output);
    } catch(e) { setError(e.message||"Please check your inputs."); setResult(null); }
  };

  const renderFields=()=>{
    if(units) return <div className="grid gap-5 md:grid-cols-[1fr_auto_1fr] md:items-end"><Field label="Value" value={values.value} onChange={v=>set("value",v)} placeholder="Enter a value"/><div className="hidden text-2xl font-black md:block">→</div><div className="grid gap-5 sm:grid-cols-2"><SelectField label="From" value={values.from||defaults.from} onChange={v=>set("from",v)} options={units}/><SelectField label="To" value={values.to||defaults.to} onChange={v=>set("to",v)} options={units}/></div></div>;

    switch(type) {
      case "percentage": return <div className="space-y-5"><SelectField label="Calculation" value={values.mode||"of"} onChange={v=>set("mode",v)} options={[["of","What is X% of Y?"],["isWhat","X is what % of Y?"],["increase","Increase X by Y%"],["decrease","Decrease X by Y%"],["difference","Percentage difference between X and Y"],["change","Percentage change from X to Y"],["part","What percentage is X of Y?"]]}/><div className="grid gap-5 sm:grid-cols-2"><Field label={values.mode==="isWhat"||values.mode==="part"?"X / Part":"X / Starting Value"} value={values.a} onChange={v=>set("a",v)} placeholder="Enter first value"/><Field label={values.mode==="of"||values.mode==="increase"||values.mode==="decrease"?"Y / Percentage":"Y / Total or New Value"} value={values.b} onChange={v=>set("b",v)} placeholder="Enter second value"/></div></div>;
      case "simpleInterest": return <div className="grid gap-5 sm:grid-cols-3"><Field label="Principal" value={values.principal} onChange={v=>set("principal",v)}/><Field label="Annual Rate %" value={values.rate} onChange={v=>set("rate",v)}/><Field label="Time (years)" value={values.time} onChange={v=>set("time",v)}/></div>;
      case "compoundInterest": return <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4"><Field label="Principal" value={values.principal} onChange={v=>set("principal",v)}/><Field label="Annual Rate %" value={values.rate} onChange={v=>set("rate",v)}/><Field label="Time (years)" value={values.time} onChange={v=>set("time",v)}/><SelectField label="Compounds / Year" value={values.frequency||"1"} onChange={v=>set("frequency",v)} options={[["1","Annually"],["2","Half-yearly"],["4","Quarterly"],["12","Monthly"],["365","Daily"]]}/></div>;
      case "profitLoss": return <div className="grid gap-5 sm:grid-cols-2"><Field label="Cost Price" value={values.cost} onChange={v=>set("cost",v)}/><Field label="Selling Price" value={values.selling} onChange={v=>set("selling",v)}/></div>;
      case "discount": case "gst": case "tax": return <div className="grid gap-5 sm:grid-cols-2"><Field label="Amount" value={values.amount} onChange={v=>set("amount",v)}/><Field label="Rate %" value={values.rate} onChange={v=>set("rate",v)}/></div>;
      case "emi": return <div className="grid gap-5 sm:grid-cols-3"><Field label="Principal" value={values.principal} onChange={v=>set("principal",v)}/><Field label="Annual Rate %" value={values.rate} onChange={v=>set("rate",v)}/><Field label="Tenure (months)" value={values.tenure} onChange={v=>set("tenure",v)}/></div>;
      case "loan": return <div className="grid gap-5 sm:grid-cols-3"><Field label="Principal" value={values.principal} onChange={v=>set("principal",v)}/><Field label="Annual Rate %" value={values.rate} onChange={v=>set("rate",v)}/><Field label="Tenure (years)" value={values.tenure} onChange={v=>set("tenure",v)}/></div>;
      case "sip": return <div className="grid gap-5 sm:grid-cols-3"><Field label="Monthly Investment" value={values.monthly} onChange={v=>set("monthly",v)}/><Field label="Expected Return %" value={values.rate} onChange={v=>set("rate",v)}/><Field label="Time (years)" value={values.time} onChange={v=>set("time",v)}/></div>;
      case "currency": return <div className="grid gap-5 sm:grid-cols-3"><Field label="Amount" value={values.amount} onChange={v=>set("amount",v)}/><SelectField label="From" value={values.fromCurrency||"USD"} onChange={v=>set("fromCurrency",v)} options={CURRENCY_OPTIONS}/><SelectField label="To" value={values.toCurrency||"INR"} onChange={v=>set("toCurrency",v)} options={CURRENCY_OPTIONS}/></div>;
      case "age": return <div className="grid gap-5 sm:grid-cols-2"><DateField label="Birth Date" value={values.birth} onChange={v=>set("birth",v)}/><DateField label="Calculate As Of (optional)" value={values.asOf} onChange={v=>set("asOf",v)}/></div>;
      case "dateDifference": case "businessDays": return <div className="grid gap-5 sm:grid-cols-2"><DateField label="Start Date" value={values.start} onChange={v=>set("start",v)}/><DateField label="End Date" value={values.end} onChange={v=>set("end",v)}/></div>;
      case "countdown": return <DateField label="Target Date & Time" value={values.target} onChange={v=>set("target",v)} dateTime/>;
      case "timezone": return <div className="grid gap-5 sm:grid-cols-3"><DateField label="Date & Time" value={values.dateTime} onChange={v=>set("dateTime",v)} dateTime/><SelectField label="From Time Zone" value={values.fromZone||"UTC"} onChange={v=>set("fromZone",v)} options={[["UTC","UTC"],["Asia/Kolkata","India"],["America/New_York","New York"],["America/Los_Angeles","Los Angeles"],["Europe/London","London"],["Asia/Tokyo","Tokyo"]]}/><SelectField label="To Time Zone" value={values.toZone||"Asia/Kolkata"} onChange={v=>set("toZone",v)} options={[["UTC","UTC"],["Asia/Kolkata","India"],["America/New_York","New York"],["America/Los_Angeles","Los Angeles"],["Europe/London","London"],["Asia/Tokyo","Tokyo"]]}/></div>;
      case "bmi": return <div className="grid gap-5 sm:grid-cols-2"><Field label="Weight (kg)" value={values.weight} onChange={v=>set("weight",v)}/><Field label="Height (cm)" value={values.height} onChange={v=>set("height",v)}/></div>;
      case "calories": return <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4"><Field label="Weight (kg)" value={values.weight} onChange={v=>set("weight",v)}/><Field label="Height (cm)" value={values.height} onChange={v=>set("height",v)}/><Field label="Age" value={values.age} onChange={v=>set("age",v)}/><SelectField label="Gender" value={values.gender||"male"} onChange={v=>set("gender",v)} options={[["male","Male"],["female","Female"]]}/><SelectField label="Activity" value={values.activityLevel||"moderate"} onChange={v=>set("activityLevel",v)} options={[["sedentary","Sedentary"],["light","Light"],["moderate","Moderate"],["active","Active"],["veryActive","Very Active"]]}/></div>;
      case "cooking": return <div className="grid gap-5 sm:grid-cols-3"><Field label="Amount" value={values.amount} onChange={v=>set("amount",v)}/><SelectField label="From" value={values.fromUnit||"cup"} onChange={v=>set("fromUnit",v)} options={[["milliliter","Milliliter"],["teaspoon","Teaspoon"],["tablespoon","Tablespoon"],["cup","Cup"],["fluidOunce","Fluid Ounce"],["pint","Pint"],["quart","Quart"],["liter","Liter"],["gallon","Gallon"]]}/><SelectField label="To" value={values.toUnit||"milliliter"} onChange={v=>set("toUnit",v)} options={[["milliliter","Milliliter"],["teaspoon","Teaspoon"],["tablespoon","Tablespoon"],["cup","Cup"],["fluidOunce","Fluid Ounce"],["pint","Pint"],["quart","Quart"],["liter","Liter"],["gallon","Gallon"]]}/></div>;
      case "clothingSize": case "shoeSize": return <div className="grid gap-5 sm:grid-cols-3"><Field label="Size" value={values.size} onChange={v=>set("size",v)}/><SelectField label="From System" value={values.fromSystem||"us"} onChange={v=>set("fromSystem",v)} options={[["us","US"],["eu","EU"],["uk","UK"],["jp","JP"]]}/><SelectField label="To System" value={values.toSystem||"eu"} onChange={v=>set("toSystem",v)} options={[["us","US"],["eu","EU"],["uk","UK"],["jp","JP"]]}/></div>;
      default: return <p className="text-zinc-500">This tool needs a dedicated input panel.</p>;
    }
  };

  const accent = config[2]==="unit" ? "#8B5CF6" : config[2]==="finance" ? "#FDE047" : config[2]==="datetime" ? "#F43F5E" : "#5EEAD4";

  return <CalculatorLayout title={config[0]} description={config[1]} accent={accent} eyebrow={`${config[2]} • ConvertHub`}>
    <motion.section initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} className="w-full border-[3px] border-black bg-white p-4 shadow-[5px_5px_0px_#000] sm:p-6 sm:shadow-[7px_7px_0px_#000] md:p-8">
      {renderFields()}
      {error&&<div className="mt-5 border-[3px] border-black bg-[#F43F5E] p-4 font-bold text-white">{error}</div>}
      <div className="mt-7 grid grid-cols-1 gap-3 sm:flex sm:flex-wrap">
        <button onClick={calculate} className="inline-flex min-h-12 w-full items-center justify-center gap-2 border-[3px] border-black bg-[#FDE047] px-5 py-3 font-black shadow-[4px_4px_0px_#000] transition-transform hover:-translate-y-0.5 sm:w-auto">Calculate <ArrowRight size={18} strokeWidth={3}/></button>
        <button onClick={()=>{setValues({});setResult(null);setError("")}} className="inline-flex min-h-12 w-full items-center justify-center gap-2 border-[3px] border-black bg-white px-5 py-3 font-black shadow-[4px_4px_0px_#000] sm:w-auto"><RefreshCcw size={17}/> Reset</button>
      </div>
      <Result result={result}/>
    </motion.section>
  </CalculatorLayout>;
}

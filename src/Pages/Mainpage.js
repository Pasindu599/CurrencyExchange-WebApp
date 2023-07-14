
import React,{useEffect,useState} from 'react';
import axios from "axios";

function Mainpage() {
    //state 
    const [date,setDate] = useState(null);
    const [sourceCurrency,setSourceCurrency] = useState("");
    const [targetCurrency,setTargetCurrency] = useState("");
    const [amountSourceCurrency,setAmountSourceCurrency] = useState(0);
    const [amountTargetCurrency,setTargetSourceCurrency] = useState(0);
    const [currencyNames , setCurrencyNames] = useState([]);
    const [loading, setLoading] = useState(true);

    //handle submit method
    const handleSubmit = async(e)=>{
        setLoading(false);
        e.preventDefault();
        try {
            const response = await axios.get("http://localhost:5000/convert",{
                params: {
                    date,sourceCurrency,targetCurrency,amountSourceCurrency
                }
            });

            setTargetSourceCurrency(response.data);

        } catch (err) {
            console.error(err);
        }
    }

    useEffect(()=>{
        const getCurrencyNames = async()=>{
            try {
                const response = await axios.get(
                    "http://localhost:5000/getAllCurrencies"
                );
                setCurrencyNames(response.data);
            } catch (err) {
                console.error(err);
            }
            
        };
        getCurrencyNames();
    }, []) 
    
  return (
    <div>
        <h1 className='lg:mx-32 text-5xl font-bold text-green-500'>Convert your Currencies</h1>
        <p className='lg:mx-32 opacity-40 py-6 '>You can exchange any currency.
        </p>

        <div className='mt-5 flex items-center justify-center flex-col'>
            <section className='w-full lg:w-1/2'>
                <form onSubmit={handleSubmit}>
                    <div className='mb-4'>
                    <label htmlFor={date} className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Date</label>
            <input 
            onChange={(e)=>setDate(e.target.value)}
            type="date" id={date} name={date} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="John" required/>
       </div>
                
        
                    <div className='mb-4 '>
                    <label htmlFor={sourceCurrency} className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select Source Currency</label>
            <select onChange={(e)=>setSourceCurrency(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Select Source Currency" 
            id={sourceCurrency}
            name={sourceCurrency}
            value={sourceCurrency}
            >
            <option value="">Select source currency</option>
            {Object.keys(currencyNames).map((currency)=>(
                <option className='p-1' key={currency} value={currency}>
                    {currencyNames[currency]}
                </option>
            ))}
            </select>

       </div>
                
        
                    <div className='mb-4'>
                    <label htmlFor={targetCurrency} className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Target Currency</label>
            <select onChange={(e)=>setTargetCurrency(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Target Currency" 
            id={targetCurrency}
            name={targetCurrency}
            value={targetCurrency}
            required
            >
                <option>Select Target currency</option>
                {Object.keys(currencyNames).map((currency)=>(
                <option className='p-1' key={currency} value={currency}>
                    {currencyNames[currency]}
                </option>
            ))}
            </select>

       </div>
               
        
                    <div className='mb-4'>
                    <label htmlFor={amountSourceCurrency} className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Amount in source currency</label>
            <input onChange={(e)=>setAmountSourceCurrency(e.target.value)}
            type="text" id={amountSourceCurrency} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Amount in source currency" 
            name={amountSourceCurrency}
            required
            />
       </div>
              
        <button  
        className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-md'>Get the target currency</button>
        </form>
            </section>
        </div>
                    {!loading ? 
        <section className='lg:mx-32 mt-5 flex items-center justify-center  '>
            {amountSourceCurrency}  {currencyNames[sourceCurrency]} = <span className='text-red-500'>{amountTargetCurrency} </span> <span>  </span>{currencyNames[targetCurrency]}
        </section> : null
}
    </div>
  )
}

export default Mainpage
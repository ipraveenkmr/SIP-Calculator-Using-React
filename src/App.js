import React, { useEffect, useState } from 'react'
import Slider from '@mui/material/Slider';

export default function App() {
  const [monthlyInvestment, setMonthlyInvestment] = useState(25000);
  const [interestRate, setInterestRate] = useState(12);
  const [years, setYears] = useState(10);
  const [totalInvestment, setTotalInvestment] = useState(0);
  const [totalReturn, setTotalReturn] = useState(0);
  const [totalValue, setTotalValue] = useState(0);

  useEffect(() => {
    calculateSIP();
  }, [])

  const calculateSIP = () => {
    const P = parseFloat(monthlyInvestment);
    const n = parseFloat(years) * 12; // investment period in months
    const r = parseFloat(interestRate) / 100 / 12; // monthly rate

    // Total amount invested
    const investedAmount = P * n;

    // Future value (Total Value)
    const futureValue = P * (((1 + r) ** n - 1) / r) * (1 + r);

    // Estimated returns
    const estimatedReturn = futureValue - investedAmount;

    // Update state
    setTotalInvestment(investedAmount.toFixed(2));
    setTotalReturn(estimatedReturn.toFixed(2));
    setTotalValue(futureValue.toFixed(2));
  };

  const handleMonthlyInvestementChange = (e) => {
    const monthlyRange = e.target.value * 10000;
    setMonthlyInvestment(monthlyRange);
    calculateSIP();
  }

  const handleInterestRateChange = (e) => {
    setInterestRate(e.target.value);
    calculateSIP();
  }


  const handleYearChange = (e) => {
    const yearRange = e.target.value / 2;
    setYears(yearRange);
    calculateSIP();
  }

  return (
    <div>
      <div className='text-3xl font-semibold mt-10 ml-20'>
        SIP Calculator
      </div>

      <div className='flex justify-center'>
        <div className='border border-slate-400 rounded-lg mt-10 min-w-[40vw] min-h-[80vh] p-8'>

          <div>
            <div className='flex justify-between'>
              <div className='font-semibold text-md'>
                Monthly Investment
              </div>

              <div className='bg-blue-100 p-1 px-2 min-w-[80px] rounded-md font-semibold text-blue-700 flex justify-end'>
                ₹ <span className='ml-2'>{monthlyInvestment}</span>
              </div>
            </div>

            <div className='mt-4'>
              <Slider
                value={monthlyInvestment / 10000}
                aria-label="Default"
                onChange={handleMonthlyInvestementChange}
              />
            </div>
          </div>

          <div className='mt-20'>
            <div className='flex justify-between'>
              <div className='font-semibold text-md'>
                Expected Return Rate (per annum)
              </div>

              <div className='bg-blue-100 p-1 px-2 min-w-[80px] rounded-md font-semibold text-blue-700 flex justify-end'>
                <span className='mr-1'>{interestRate}</span> %
              </div>
            </div>

            <div className='mt-4'>
              <Slider
                value={interestRate}
                aria-label="Default"
                onChange={handleInterestRateChange}
              />
            </div>
          </div>

          <div className='mt-20'>
            <div className='flex justify-between'>
              <div className='font-semibold text-md'>
                Time Period
              </div>

              <div className='bg-blue-100 p-1 px-2 min-w-[80px] rounded-md font-semibold text-blue-700 flex justify-end'>
                <span className='mr-1'>{years}</span> Yr
              </div>
            </div>

            <div className='mt-4'>
              <Slider
                value={years * 2}
                aria-label="Default"
                onChange={handleYearChange}
              />
            </div>
          </div>

          <div className='mt-20'>
            <div className='flex justify-between'>
              <div className='text-md'>
                Invested Amount
              </div>

              <div className='p-1 px-2 min-w-[80px] rounded-md font-semibold flex justify-end'>
                ₹ <span className='mr-1'>{totalInvestment}</span>
              </div>
            </div>
          </div>

          <div className='mt-4'>
            <div className='flex justify-between'>
              <div className=''>
                Est. Return
              </div>

              <div className='p-1 px-2 min-w-[80px] rounded-md font-semibold flex justify-end'>
                ₹ <span className='mr-1'>{totalReturn}</span>
              </div>
            </div>
          </div>

          <div className='mt-4'>
            <div className='flex justify-between'>
              <div className=''>
                Total Value
              </div>

              <div className='p-1 px-2 min-w-[80px] rounded-md font-semibold flex justify-end'>
                ₹ <span className='mr-1'>{totalValue}</span>
              </div>
            </div>
          </div>


        </div>
      </div>

    </div>
  )
}

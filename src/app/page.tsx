'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { QuoteIcon } from 'lucide-react'

function isPrime(num: number): boolean {
  if (num <= 1) return false
  for (let i = 2; i <= Math.sqrt(num); i++) {
    if (num % i === 0) return false
  }
  return true
}

function getPrimesUpTo(num: number): number[] {
  const primes: number[] = []
  for (let i = 2; i < num; i++) {
    if (isPrime(i)) primes.push(i)
  }
  return primes
}

function generateChartData(num: number): { x: number; y: number }[] {
  const data: { x: number; y: number }[] = []
  let primeCount = 0
  for (let i = 2; i <= num; i++) {
    if (isPrime(i)) {
      primeCount++
    }
    data.push({ x: i, y: primeCount })
  }
  return data
}

const primeQuotes = [
  'Prime numbers are the most basic objects in mathematics.',
  'Prime numbers are like the atoms of arithmetic.',
  'The distribution of primes is a profound mystery.',
  'Every even number greater than 2 is the sum of two primes.',
]

export default function PrimeChecker() {
  const [number, setNumber] = useState<number | ''>('')
  const [result, setResult] = useState<{
    isPrime: boolean
    lowerPrimes: number[]
    chartData: { x: number; y: number }[]
  } | null>(null)
  const [, setKey] = useState(0)

  const handleConfirm = () => {
    if (typeof number === 'number') {
      const isPrimeResult = isPrime(number)
      const lowerPrimes = getPrimesUpTo(number)
      const chartData = generateChartData(number)
      setResult({ isPrime: isPrimeResult, lowerPrimes, chartData })
      setKey((prev) => prev + 1)
    }
  }

  useEffect(() => {
    setResult(null)
  }, [number])

  return (
    <div className='min-h-screen bg-gradient-to-br from-purple-700 via-pink-500 to-red-500'>
      <div className='max-w-4xl mx-auto p-8'>
        <div className='p-8 bg-white bg-opacity-20 backdrop-blur-lg rounded-xl shadow-lg'>
          <h1 className='text-3xl font-bold mb-6 text-white text-center'>Prime Number Checker</h1>
          <div className='space-y-6'>
            <div className='space-y-2'>
              <label htmlFor='number-input' className='text-white'>
                Enter a number:
              </label>
              <input
                id='number-input'
                type='text'
                value={number}
                maxLength={5}
                onChange={(e) => {
                  if (e.target.value.match(/^\d+$/) || e.target.value === '') setNumber(Number(e.target.value))
                }}
                placeholder='Enter a number'
                className='flex h-10 w-full rounded-md border px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 bg-white bg-opacity-20 text-white placeholder-gray-300 border-white border-opacity-30'
              />
            </div>
            <button
              onClick={handleConfirm}
              className='inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-primary/90 h-10 px-4 py-2 w-full bg-white text-purple-700 hover:bg-opacity-90'
            >
              Confirm
            </button>
            <AnimatePresence>
              {result && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                    transition: {
                      type: 'spring',
                      stiffness: 300,
                      damping: 20,
                    },
                  }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className='mt-6 space-y-4'
                >
                  <motion.p
                    className='font-semibold text-white text-center text-xl'
                    animate={
                      result.isPrime
                        ? {
                            scale: [1, 1.2, 1],
                            transition: {
                              duration: 0.5,
                              times: [0, 0.5, 1],
                            },
                          }
                        : {}
                    }
                  >
                    {number} is {result.isPrime ? '' : 'not '}a prime number.
                  </motion.p>
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className='flex items-center justify-center text-white'
                  >
                    <QuoteIcon className='w-6 h-6 mr-2' />
                    <p className='italic text-sm'>
                      {result.isPrime
                        ? primeQuotes[Math.floor(Math.random() * primeQuotes.length)]
                        : 'You shall not pass!'}
                    </p>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <div className='p-8 bg-white bg-opacity-20 backdrop-blur-lg rounded-xl shadow-lg'>
                      <h2 className='text-2xl font-bold mb-4 text-white text-center'>Prime Number Distribution</h2>
                      <div className='w-full h-64'>
                        <ResponsiveContainer width='100%' height='100%'>
                          <LineChart data={result.chartData}>
                            <CartesianGrid strokeDasharray='3 3' stroke='rgba(255, 255, 255, 0.2)' />
                            <XAxis
                              dataKey='x'
                              stroke='white'
                              label={{ value: 'Number', position: 'insideBottom', offset: -5, fill: 'white' }}
                            />
                            <YAxis
                              stroke='white'
                              label={{ value: 'Prime Count', angle: -90, position: 'insideLeft', fill: 'white' }}
                            />
                            <Tooltip
                              contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.8)', color: '#6b46c1' }}
                              labelStyle={{ color: '#6b46c1' }}
                            />
                            <Line type='monotone' dataKey='y' stroke='#ffffff' strokeWidth={2} dot={false} />
                          </LineChart>
                        </ResponsiveContainer>
                      </div>
                    </div>
                  </motion.div>
                  <div>
                    <h2 className='font-semibold text-white text-center text-lg mb-4'>
                      Prime numbers lower than {number}:
                    </h2>
                    {result.lowerPrimes.length > 0 ? (
                      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4'>
                        {result.lowerPrimes.map((prime, index) => (
                          <motion.div
                            key={prime}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05 }}
                            className='bg-white bg-opacity-20 p-4 rounded-lg shadow-md flex items-center justify-center'
                          >
                            <span className='text-white font-semibold text-lg'>{prime}</span>
                          </motion.div>
                        ))}
                      </div>
                    ) : (
                      <p className='text-white text-center'>No prime numbers found.</p>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  )
}

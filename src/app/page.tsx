'use client'
import { useState } from 'react'
import { PrimeNumber } from '@/utils/PrimeNumber'

const isNumber = (num: number) => !isNaN(num)

export default function Home() {
  const [prime, setPrime] = useState<string | null>(null)
  const [primes, setPrimes] = useState<number[]>([])

  const handePrimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length === 0 || e.target.value.match(/^\d+$/)) {
      setPrime(e.target.value)
    }
  }

  return (
    <div>
      <div className={'flex flex-col items-center justify-center gap-8'}>
        <form
          onSubmit={(formEvent) => {
            formEvent.preventDefault()
            const data = new FormData(formEvent.currentTarget)
            const num = parseInt(data.get('prime') as string)

            if (isNumber(num)) {
              const primeNumber = new PrimeNumber(num)
              const numbers: number[] = []
              for (const i of primeNumber) {
                numbers.push(i)
              }
              setPrimes(numbers)
            }
          }}
        >
          <input
            name={'prime'}
            className={
              'shadow-inner shadow-slate-400 text-black h-14 text-2xl px-3 bg-amber-100 border-none rounded-md outline outline-2 outline-purple-400 focus:outline-purple-600'
            }
            type={'text'}
            value={prime ?? ''}
            maxLength={5}
            onChange={handePrimeChange}
          />
          <button type={'submit'}>Get my primes</button>
        </form>
        <div className={'w-full grid grid-cols primes gap-2 px-4 content-center'}>
          {primes.map((primeNum) => (
            <div
              key={primeNum}
              className={
                'object-cover flex justify-center items-center px-4 h-12 bg-amber-200 rounded-md transition transition-300 hover:bg-amber-300'
              }
            >
              <strong className={''}>{primeNum.toLocaleString('cs')}</strong>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

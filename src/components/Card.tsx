import { PropsWithChildren } from 'react'

export const Card = ({ children }: PropsWithChildren<unknown>) => (
  <div className={'border text-card-foreground p-8 bg-white bg-opacity-20 backdrop-blur-lg rounded-xl shadow-lg'}>
    {children}
  </div>
)

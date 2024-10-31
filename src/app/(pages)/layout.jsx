import InquireApp from '@/components/fixed/inquire'
import FooterApp from '@/components/footer/FooterApp'
import HeaderApp from '@/components/Header'
import React from 'react'

export default function layout({ children }) {
  return (
    <div>
        <HeaderApp />
        <div className='-mt-24 md:-mt-40'></div>
        {children}
        <InquireApp/>
        <FooterApp />
    </div>
  )
}

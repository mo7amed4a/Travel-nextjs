"use client"
import NavbarAdmin from '@/components/dashboard/Header/NavbarAdmin'
import SidenavAdmin from '@/components/dashboard/Header/SidenavAdmin'
import React, { useState } from 'react'

export default function layout({ children }) {
  const [asideToggle,setAsideToggle] = useState(false)
  return (
    <div>
      <NavbarAdmin
        setAsideToggle={setAsideToggle}
        className="h-16 bg-red-400"
        onClick={() => setAsideToggle((e) => !e)}
      />

      <main className="flex bg-[#e8edf2]">
        <SidenavAdmin asideToggle={asideToggle} setAsideToggle={setAsideToggle} />
        <div className={`flex  w-full p-4 overflow-x-scroll`}>
          { children }
        </div>
      </main>
    </div>
  )
}

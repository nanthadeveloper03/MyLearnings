
'use client'
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function SwitchLink({ tabId }) {
    let router = useRouter()
    return (
        <>
            <h3 className="heading mb-4">{(tabId == 0) ? 'Sign In' : 'Sign Up'} to Ultrapro</h3>
            <div className="tabs_row">
                <ul className="menu-tab">
                    <li className={`cursor-pointer ${(tabId == 0) ? 'active' : ''}`} onClick={()=>{router.push('/login')}}> <h6>Sign In</h6> </li>
                    <li className={`cursor-pointer ${(tabId == 1) ? 'active' : ''}`} onClick={()=>{router.push('/register')}}> <h6>Sign Up</h6> </li>
                </ul>
            </div>
        </>
    )
}

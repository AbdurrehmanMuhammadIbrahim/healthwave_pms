"use client"
import React,{useEffect, useState} from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  
} from "@/components/ui/dialog"
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp"
import { Button } from './ui/button'
import { decryptKey, encryptKey } from '@/lib/utils'
import { useRouter, usePathname } from 'next/navigation'
import { access } from 'fs'
// import Image from 'next/image';

const PassKeyModal = () => {
  const path = usePathname()
  const router = useRouter();

  const [open,setOpen] = useState(false);
  const [passkey,setPasskey] = useState("") ;
const [error,setError] = useState("")

const encryptedKey = typeof window !== 'undefined' ? window.localStorage.getItem("accessKey") : null; 

useEffect(() =>{
  const accesskey = encryptedKey && decryptKey(encryptedKey)

if (path){
  if (accesskey === process.env.NEXT_PUBLIC_ADMIN_PASSKEY){
    // const encryptedKey = encryptKey(passkey);
    
    // localStorage.setItem('accesskey',encryptedKey)
   
    setOpen(false)
    router.push('/admin')

    
    }else{
      setOpen(true)
    }
}
},[encryptedKey])

const validatePasskey = (e: React.MouseEvent<HTMLButtonElement,MouseEvent>) => {
e.preventDefault();

if (passkey === process.env.NEXT_PUBLIC_ADMIN_PASSKEY) {
  const encryptedKey = encryptKey(passkey);

  localStorage.setItem("accessKey", encryptedKey);

  setOpen(false);
} else {
  setError("Invalid passkey. Please try again.");
}
}
  return (
<Dialog open={open} onOpenChange={setOpen}>
  <DialogContent className="shad-alert-dialog">
    <DialogHeader>
      <DialogTitle  className="flex items-start justify-between">            Admin Access Verification
      {/* <Image
              src="/assets/icons/close.svg"
              alt="close"
              width={20}
              height={20}
              // onClick={() => closeModal()}
              className="cursor-pointer"
            /> */}
      </DialogTitle>
      <DialogDescription>
      To access the admin page, please enter the passkey.
      </DialogDescription>
    </DialogHeader>
    <div>
    <InputOTP maxLength={6} value={passkey} onChange={(value)=> setPasskey(value)}>
  <InputOTPGroup className="shad-otp">
    <InputOTPSlot className="shad-otp-slot"  index={0} />
    <InputOTPSlot className="shad-otp-slot"  index={1} />
    <InputOTPSlot className="shad-otp-slot"  index={2} />
    <InputOTPSlot className="shad-otp-slot"  index={3} />
    <InputOTPSlot className="shad-otp-slot"  index={4} />
    <InputOTPSlot className="shad-otp-slot"  index={5} />
  </InputOTPGroup>
</InputOTP>
{error && ( <p className="shad-error text-14-regular mt-4 flex justify-center">
              {error}
            </p>)}
    </div>

    <Button onClick={(e) =>validatePasskey(e)}
       className="shad-primary-btn w-full"> 
        Enter Admin Passkey
       </Button>

  </DialogContent>

</Dialog>

  )
}
 
export default PassKeyModal

import { SignUp } from '@clerk/nextjs'
import { neobrutalism } from '@clerk/themes'
export default function Page() {
  return(
  <div className='flex items-center justify-center h-screen'>
   <SignUp appearance={{ baseTheme: neobrutalism }} />
  </div>
  
)
}
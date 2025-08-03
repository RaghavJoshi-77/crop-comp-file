import { SignIn } from '@clerk/nextjs'
import { neobrutalism,dark,shadesOfPurple } from '@clerk/themes'
// basic styling karde 
export default function Page() {
  return (
    <div className='flex items-center justify-center h-screen'>
      <SignIn appearance={{ baseTheme: neobrutalism }} />
    </div>
  )
}
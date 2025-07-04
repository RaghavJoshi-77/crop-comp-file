
import React from 'react'
import { auth } from '@clerk/nextjs/server'

export default async function SocialShare() {
    const {userId,redirectToSignIn} = await auth()
    if (!userId) {
        return redirectToSignIn()
    }
  return (
    <div>Social-share</div>
  )
}

 
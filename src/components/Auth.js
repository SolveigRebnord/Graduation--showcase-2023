import { useState } from 'react'
import { supabase } from '../supabaseClient'

export default function Auth() {
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('')

  const handleLogin = async (event) => {
    event.preventDefault()

    const getURL = () => {
      let url =
        process.env.NEXT_PUBLIC_SITE_URL ?? 
        process.env.NEXT_PUBLIC_VERCEL_URL ?? 
        'http://localhost:3000/';

      url = url.includes('http') ? url : `https://${url}`;
 
      url = url.charAt(url.length - 1) === '/' ? url : `${url}/`;
      return url;
    };
    
 

    setLoading(true)
    const { error } = await supabase.auth.signInWithOtp({ email,   options: {
      redirectTo: getURL()
    } })

    if (error) {
      alert(error.error_description || error.message)
    } else {
      alert('Check your email for the login link!')
    }
    setLoading(false)
  }

  return (
    <div className="mt-20">
      <div className="flex flex-col items-center justify-center text-center gap-8">
        <h1 className="header">Register</h1>
        <p className="description">Sign in via magic link with your email below</p>
        <form className="form-widget" onSubmit={handleLogin}>
          <div>
            <input
              className="inputField w-full border border-black"
              type="email"
              placeholder="Your email"
              value={email}
              required={true}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <button className='border border-black px-12 py-2 my-8' disabled={loading}>
              {loading ? <span>Loading</span> : <span>Send magic link</span>}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
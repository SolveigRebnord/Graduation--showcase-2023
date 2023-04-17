import { useState, useEffect } from 'react'
import Auth from '../components/Auth';
import MainForm from '../components/MainForm';

import { createClient } from '@supabase/supabase-js';
const SUPABASE_URL = process.env.REACT_APP_SUPABASE_URL;
const SUPABASE_KEY = process.env.REACT_APP_SUPABASE_KEY;



const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)


const FormPage = () => {


    const [session, setSession] = useState(null)

    useEffect(() => {
      supabase.auth.getSession().then(({ data: { session } }) => {
        setSession(session)
      })
    
      supabase.auth.onAuthStateChange((_event, session) => {
        setSession(session)
      })
    }, [])
    
      const [isReq, setReq] = useState(false)
    
        return (
            <>
         
        {!session ? <Auth /> : <MainForm key={session.user.id} session={session} />}
            </>
        )
    }
     
 
export default FormPage;
import { createClient } from '@supabase/supabase-js'

// Create a single supabase client for interacting with your database
const supabase = createClient('https://lxclpclnqwwvggeernfv.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx4Y2xwY2xucXd3dmdnZWVybmZ2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzg2MDE2NjMsImV4cCI6MjA1NDE3NzY2M30.TFiiQ-gZKcT-WbHoQbu-6rLsdF6gZdfYCtziLDuJNC8')

export default supabase;
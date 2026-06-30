import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient'

export function useMenuCategories() {
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  async function fetch() {
    setLoading(true)
    const { data, error } = await supabase
      .from('menu_categories')
      .select('*')
      .order('display_order')
    if (error) setError(error)
    else setCategories(data)
    setLoading(false)
  }

  useEffect(() => { fetch() }, [])

  return { categories, loading, error, refetch: fetch }
}

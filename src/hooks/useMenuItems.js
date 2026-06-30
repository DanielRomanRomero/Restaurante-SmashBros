import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient'

export function useMenuItems(categoryId = null) {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  async function fetch() {
    setLoading(true)
    let query = supabase
      .from('menu_items')
      .select('*, menu_categories(name, slug)')
      .eq('is_available', true)
      .order('display_order')

    if (categoryId) query = query.eq('category_id', categoryId)

    const { data, error } = await query
    if (error) setError(error)
    else setItems(data)
    setLoading(false)
  }

  useEffect(() => { fetch() }, [categoryId])

  return { items, loading, error, refetch: fetch }
}

export function useAllMenuItems() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  async function fetch() {
    setLoading(true)
    const { data, error } = await supabase
      .from('menu_items')
      .select('*, menu_categories(name, slug)')
      .order('display_order')
    if (error) setError(error)
    else setItems(data)
    setLoading(false)
  }

  useEffect(() => { fetch() }, [])

  return { items, loading, error, refetch: fetch }
}

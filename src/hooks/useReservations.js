import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient'
import { useAuth } from '../context/AuthContext'

async function markPastReservationsCompleted(reservations) {
  const today = new Date().toISOString().split('T')[0]
  const toComplete = reservations.filter(r => r.date < today && r.status !== 'cancelada' && r.status !== 'completada')
  if (toComplete.length === 0) return
  const { error } = await supabase
    .from('reservations')
    .update({ status: 'completada' })
    .in('id', toComplete.map(r => r.id))
  if (error) console.error('Error al marcar reservas como completadas:', error.message)
}

export function useReservations() {
  const { user } = useAuth()
  const [reservations, setReservations] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  async function fetch() {
    if (!user) return
    setLoading(true)
    const { data, error } = await supabase
      .from('reservations')
      .select('*')
      .eq('user_id', user.id)
      .order('date')
      .order('time_slot')
    if (error) {
      setError(error)
      setLoading(false)
      return
    }
    await markPastReservationsCompleted(data ?? [])
    const { data: updated } = await supabase
      .from('reservations')
      .select('*')
      .eq('user_id', user.id)
      .order('date')
      .order('time_slot')
    setReservations(updated ?? [])
    setLoading(false)
  }

  async function cancelReservation(id) {
    const { error } = await supabase
      .from('reservations')
      .update({ status: 'cancelada' })
      .eq('id', id)
    if (!error) fetch()
    return { error }
  }

  useEffect(() => { fetch() }, [user])

  return { reservations, loading, error, cancelReservation, refetch: fetch }
}

export function useAllReservations() {
  const [reservations, setReservations] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  async function fetch() {
    setLoading(true)
    const { data: resData, error: resError } = await supabase
      .from('reservations')
      .select('*')
      .order('date', { ascending: false })
      .order('time_slot')
    if (resError) {
      setError(resError)
      setLoading(false)
      return
    }
    await markPastReservationsCompleted(resData ?? [])
    const { data: updated } = await supabase
      .from('reservations')
      .select('*')
      .order('date', { ascending: false })
      .order('time_slot')
    setReservations(updated ?? [])
    setLoading(false)
  }

  async function updateReservation(id, updates) {
    const { error } = await supabase
      .from('reservations')
      .update(updates)
      .eq('id', id)
    if (!error) fetch()
    return { error }
  }

  async function deleteReservation(id) {
    const { error } = await supabase
      .from('reservations')
      .delete()
      .eq('id', id)
    if (!error) fetch()
    return { error }
  }

  useEffect(() => { fetch() }, [])

  return { reservations, loading, error, updateReservation, deleteReservation, refetch: fetch }
}

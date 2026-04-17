/**
 * useHymns hook - fetches and manages hymn data
 */

import { useState, useEffect, useCallback } from 'react'
import { Hymn } from '../types'
import { getHymnById, getHymnCount, getAllHymns, initDatabase, seedIfEmpty } from '../db/database'

export function useHymns() {
  const [hymns, setHymns] = useState<Hymn[]>([])
  const [totalCount, setTotalCount] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    initialize()
  }, [])

  const initialize = async () => {
    try {
      setLoading(true)
      await initDatabase()
      await seedIfEmpty()

      const count = await getHymnCount()
      setTotalCount(count)

      const firstBatch = await getAllHymns(50, 0)
      setHymns(firstBatch)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load hymns')
      console.error('Hymn initialization error:', err)
    } finally {
      setLoading(false)
    }
  }

  const getHymn = useCallback(async (id: number): Promise<Hymn | null> => {
    try {
      return await getHymnById(id)
    } catch (err) {
      console.error('Error fetching hymn:', err)
      return null
    }
  }, [])

  const loadMore = useCallback(async (limit: number = 50, offset: number) => {
    try {
      const batch = await getAllHymns(limit, offset)
      setHymns(prev => [...prev, ...batch])
    } catch (err) {
      console.error('Error loading more hymns:', err)
    }
  }, [])

  return {
    hymns,
    totalCount,
    loading,
    error,
    getHymn,
    loadMore,
    refresh: initialize,
  }
}

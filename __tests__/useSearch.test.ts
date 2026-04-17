import { renderHook, act } from '@testing-library/react-native'
import { useSearch } from '../src/hooks/useSearch'
import * as database from '../src/db/database'

jest.mock('../src/db/database')

const mockSearchHymns = database.searchHymns as jest.MockedFunction<typeof database.searchHymns>

const mockHymns = [
  { id: 1, title: 'His Hands', body: 'Verse 1 content' },
  { id: 123, title: 'Amazing Grace', body: 'Amazing grace, how sweet the sound' },
  { id: 45, title: 'His Presence', body: 'In Your presence' },
]

describe('useSearch Hook', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('initializes with empty query and results', () => {
    const { result } = renderHook(() => useSearch())
    expect(result.current.query).toBe('')
    expect(result.current.results).toEqual([])
    expect(result.current.loading).toBe(false)
    expect(result.current.error).toBeNull()
  })

  it('searches by hymn number (e.g., "123")', async () => {
    mockSearchHymns.mockResolvedValueOnce([mockHymns[1]])

    const { result } = renderHook(() => useSearch())

    await act(async () => {
      await result.current.performSearch('123')
    })

    expect(result.current.results).toHaveLength(1)
    expect(result.current.results[0].id).toBe(123)
    expect(result.current.results[0].title).toBe('Amazing Grace')
  })

  it('searches by title (e.g., "His Hands")', async () => {
    mockSearchHymns.mockResolvedValueOnce([mockHymns[0]])

    const { result } = renderHook(() => useSearch())

    await act(async () => {
      await result.current.performSearch('His Hands')
    })

    expect(result.current.results).toHaveLength(1)
    expect(result.current.results[0].title).toBe('His Hands')
  })

  it('returns empty results for non-existent search', async () => {
    mockSearchHymns.mockResolvedValueOnce([])

    const { result } = renderHook(() => useSearch())

    await act(async () => {
      await result.current.performSearch('NonExistentHymn')
    })

    expect(result.current.results).toEqual([])
  })

  it('handles search error gracefully', async () => {
    mockSearchHymns.mockRejectedValueOnce(new Error('Database error'))

    const { result } = renderHook(() => useSearch())

    await act(async () => {
      await result.current.performSearch('test')
    })

    expect(result.current.error).toBe('Database error')
    expect(result.current.results).toEqual([])
  })

  it('clears search state', async () => {
    mockSearchHymns.mockResolvedValueOnce([mockHymns[0]])

    const { result } = renderHook(() => useSearch())

    await act(async () => {
      await result.current.performSearch('His Hands')
    })

    expect(result.current.results.length).toBeGreaterThan(0)

    act(() => {
      result.current.clearSearch()
    })

    expect(result.current.query).toBe('')
    expect(result.current.results).toEqual([])
    expect(result.current.error).toBeNull()
  })

  it('searches with multiple results', async () => {
    mockSearchHymns.mockResolvedValueOnce([mockHymns[0], mockHymns[2]])

    const { result } = renderHook(() => useSearch())

    await act(async () => {
      await result.current.performSearch('His')
    })

    expect(result.current.results).toHaveLength(2)
  })

  it('handles empty query', async () => {
    const { result } = renderHook(() => useSearch())

    await act(async () => {
      await result.current.performSearch('')
    })

    expect(result.current.results).toEqual([])
    expect(mockSearchHymns).not.toHaveBeenCalled()
  })
})

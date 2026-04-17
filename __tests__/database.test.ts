import * as SQLite from 'expo-sqlite'
import {
  getHymnById,
  searchHymns,
  getAllHymns,
  getHymnCount,
  addBookmark,
  removeBookmark,
  getBookmarkedHymns,
  isHymnBookmarked,
} from '../src/db/database'
import { HYMNS } from '../src/data/hymns'

jest.mock('expo-sqlite')

const mockDb = {
  getFirstAsync: jest.fn(),
  getAllAsync: jest.fn(),
  runAsync: jest.fn(),
  execAsync: jest.fn(),
  prepareAsync: jest.fn().mockResolvedValue({
    executeAsync: jest.fn(),
    finalizeAsync: jest.fn(),
  }),
  withTransactionAsync: jest.fn(),
}

;(SQLite.openDatabaseAsync as jest.Mock).mockResolvedValue(mockDb)

describe('Database Layer', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('Empty State Handling', () => {
    it('getHymnById returns null when no hymn found', async () => {
      mockDb.getFirstAsync.mockResolvedValueOnce(null)

      const result = await getHymnById(9999)

      expect(result).toBeNull()
    })

    it('searchHymns returns empty array when no results', async () => {
      mockDb.getAllAsync.mockResolvedValueOnce([])

      const results = await searchHymns('xyznonexistent')

      expect(results).toEqual([])
    })

    it('searchHymns returns empty array for empty database', async () => {
      mockDb.getAllAsync.mockResolvedValueOnce(null)

      const results = await searchHymns('test')

      expect(results).toEqual([])
    })

    it('getAllHymns returns empty array when no hymns', async () => {
      mockDb.getAllAsync.mockResolvedValueOnce([])

      const results = await getAllHymns()

      expect(results).toEqual([])
    })

    it('getAllHymns handles null response', async () => {
      mockDb.getAllAsync.mockResolvedValueOnce(null)

      const results = await getAllHymns()

      expect(results).toEqual([])
    })

    it('getHymnCount returns 0 when empty', async () => {
      mockDb.getFirstAsync.mockResolvedValueOnce(null)

      const count = await getHymnCount()

      expect(count).toBe(0)
    })

    it('getHymnCount handles missing count field', async () => {
      mockDb.getFirstAsync.mockResolvedValueOnce({})

      const count = await getHymnCount()

      expect(count).toBe(0)
    })

    it('getBookmarkedHymns returns empty array when no bookmarks', async () => {
      mockDb.getAllAsync.mockResolvedValueOnce([])

      const results = await getBookmarkedHymns()

      expect(results).toEqual([])
    })

    it('getBookmarkedHymns handles null response', async () => {
      mockDb.getAllAsync.mockResolvedValueOnce(null)

      const results = await getBookmarkedHymns()

      expect(results).toEqual([])
    })

    it('isHymnBookmarked returns false when not bookmarked', async () => {
      mockDb.getFirstAsync.mockResolvedValueOnce({ count: 0 })

      const isBookmarked = await isHymnBookmarked(1)

      expect(isBookmarked).toBe(false)
    })

    it('isHymnBookmarked handles null response', async () => {
      mockDb.getFirstAsync.mockResolvedValueOnce(null)

      const isBookmarked = await isHymnBookmarked(1)

      expect(isBookmarked).toBe(false)
    })
  })

  describe('Happy Path - Data Retrieval', () => {
    it('getHymnById returns hymn when found', async () => {
      const mockHymn = { id: 1, title: 'His Hands', body: 'Verse 1' }
      mockDb.getFirstAsync.mockResolvedValueOnce(mockHymn)

      const result = await getHymnById(1)

      expect(result).toEqual(mockHymn)
      expect(mockDb.getFirstAsync).toHaveBeenCalledWith(
        'SELECT id, title, body FROM hymns WHERE id = ?',
        [1]
      )
    })

    it('searchHymns returns matching results', async () => {
      const mockResults = [
        { id: 1, title: 'His Hands', body: 'Verse 1' },
        { id: 2, title: 'His Love', body: 'His love endures' },
      ]
      mockDb.getAllAsync.mockResolvedValueOnce(mockResults)

      const results = await searchHymns('His')

      expect(results).toHaveLength(2)
      expect(results[0].title).toContain('His')
    })

    it('getAllHymns respects pagination', async () => {
      mockDb.getAllAsync.mockResolvedValueOnce([HYMNS[0], HYMNS[1]])

      const results = await getAllHymns(2, 0)

      expect(results).toHaveLength(2)
      expect(mockDb.getAllAsync).toHaveBeenCalledWith(expect.any(String), [2, 0])
    })
  })

  describe('Bookmark Operations', () => {
    it('addBookmark creates entry successfully', async () => {
      mockDb.execAsync.mockResolvedValueOnce(undefined)
      mockDb.runAsync.mockResolvedValueOnce({ rowsAffected: 1 })

      await expect(addBookmark(1)).resolves.not.toThrow()
    })

    it('removeBookmark deletes entry successfully', async () => {
      mockDb.runAsync.mockResolvedValueOnce({ rowsAffected: 1 })

      await expect(removeBookmark(1)).resolves.not.toThrow()
    })

    it('getBookmarkedHymns returns bookmarked hymns', async () => {
      const bookmarkedHymns = [
        { id: 1, title: 'Bookmark 1', body: 'Body 1' },
        { id: 5, title: 'Bookmark 5', body: 'Body 5' },
      ]
      mockDb.getAllAsync.mockResolvedValueOnce(bookmarkedHymns)

      const results = await getBookmarkedHymns()

      expect(results).toHaveLength(2)
      expect(results[0].id).toBe(1)
    })

    it('isHymnBookmarked returns true when bookmarked', async () => {
      mockDb.getFirstAsync.mockResolvedValueOnce({ count: 1 })

      const isBookmarked = await isHymnBookmarked(1)

      expect(isBookmarked).toBe(true)
    })
  })
})

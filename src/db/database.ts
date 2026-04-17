/**
 * Database layer for Springs of Joy hymn app
 * Uses expo-sqlite for on-device storage
 */

import * as SQLite from 'expo-sqlite'
import { HYMNS, Hymn } from '../data/hymns'

let db: SQLite.SQLiteDatabase | null = null

/**
 * Get or create the database connection
 */
export async function getDatabase(): Promise<SQLite.SQLiteDatabase> {
  if (db) {
    return db
  }

  db = await SQLite.openDatabaseAsync('hymns.db')
  return db
}

/**
 * Initialize the database: create table if it doesn't exist
 */
export async function initDatabase(): Promise<void> {
  const database = await getDatabase()

  await database.execAsync(`
    CREATE TABLE IF NOT EXISTS hymns (
      id INTEGER PRIMARY KEY NOT NULL,
      title TEXT NOT NULL,
      body TEXT NOT NULL
    );
  `)
}

/**
 * Seed the database with all hymns on first launch
 * Only seeds if the hymns table is empty
 */
export async function seedIfEmpty(): Promise<void> {
  const database = await getDatabase()

  // Check if database already has hymns
  const result = await database.getFirstAsync<{ count: number }>(
    'SELECT COUNT(*) as count FROM hymns'
  )

  const count = (result as any)?.count || 0

  if (count === 0) {
    // Insert all hymns
    // Use a transaction for better performance
    await database.withTransactionAsync(async () => {
      const insertStmt = await database.prepareAsync(
        'INSERT INTO hymns (id, title, body) VALUES (?, ?, ?)'
      )

      try {
        for (const hymn of HYMNS) {
          await insertStmt.executeAsync(hymn.id, hymn.title, hymn.body)
        }
      } finally {
        await insertStmt.finalizeAsync()
      }
    })

    console.log(`✓ Seeded ${HYMNS.length} hymns to database`)
  }
}

/**
 * Get a single hymn by ID
 */
export async function getHymnById(id: number): Promise<Hymn | null> {
  const database = await getDatabase()

  const result = await database.getFirstAsync<Hymn>(
    'SELECT id, title, body FROM hymns WHERE id = ?',
    [id]
  )

  return result || null
}

/**
 * Search hymns by title or body text
 * Uses LIKE pattern matching
 */
export async function searchHymns(query: string): Promise<Hymn[]> {
  const database = await getDatabase()

  const likePattern = `%${query}%`

  const results = await database.getAllAsync<Hymn>(
    `SELECT id, title, body FROM hymns 
     WHERE title LIKE ? OR body LIKE ?
     ORDER BY id ASC`,
    [likePattern, likePattern]
  )

  return results || []
}

/**
 * Get all hymns with optional pagination
 */
export async function getAllHymns(limit: number = 50, offset: number = 0): Promise<Hymn[]> {
  const database = await getDatabase()

  const results = await database.getAllAsync<Hymn>(
    `SELECT id, title, body FROM hymns 
     ORDER BY id ASC
     LIMIT ? OFFSET ?`,
    [limit, offset]
  )

  return results || []
}

/**
 * Get total hymn count
 */
export async function getHymnCount(): Promise<number> {
  const database = await getDatabase()

  const result = await database.getFirstAsync<{ count: number }>(
    'SELECT COUNT(*) as count FROM hymns'
  )

  return (result as any)?.count || 0
}

/**
 * Search auto-complete: get unique first letters of titles
 */
export async function getHymnTitlesByPrefix(prefix: string): Promise<string[]> {
  const database = await getDatabase()

  const results = await database.getAllAsync<{ title: string }>(
    `SELECT DISTINCT title FROM hymns 
     WHERE title LIKE ? 
     ORDER BY title ASC
     LIMIT 20`,
    [`${prefix}%`]
  )

  return results?.map(r => r.title) || []
}

/**
 * Add a bookmark (user-saved hymn)
 */
export async function addBookmark(hymnId: number): Promise<void> {
  const database = await getDatabase()

  // Check if bookmarks table exists, create if not
  await database.execAsync(`
    CREATE TABLE IF NOT EXISTS bookmarks (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      hymn_id INTEGER NOT NULL UNIQUE,
      created_at TEXT NOT NULL,
      FOREIGN KEY(hymn_id) REFERENCES hymns(id)
    );
  `)

  const now = new Date().toISOString()
  await database.runAsync('INSERT OR IGNORE INTO bookmarks (hymn_id, created_at) VALUES (?, ?)', [
    hymnId,
    now,
  ])
}

/**
 * Remove a bookmark
 */
export async function removeBookmark(hymnId: number): Promise<void> {
  const database = await getDatabase()

  await database.runAsync('DELETE FROM bookmarks WHERE hymn_id = ?', [hymnId])
}

/**
 * Get all bookmarked hymns
 */
export async function getBookmarkedHymns(): Promise<Hymn[]> {
  const database = await getDatabase()

  const results = await database.getAllAsync<Hymn>(
    `SELECT h.id, h.title, h.body FROM hymns h
     INNER JOIN bookmarks b ON h.id = b.hymn_id
     ORDER BY b.created_at DESC`,
    []
  )

  return results || []
}

/**
 * Check if a hymn is bookmarked
 */
export async function isHymnBookmarked(hymnId: number): Promise<boolean> {
  const database = await getDatabase()

  const result = await database.getFirstAsync<{ count: number }>(
    'SELECT COUNT(*) as count FROM bookmarks WHERE hymn_id = ?',
    [hymnId]
  )

  return (result as any)?.count > 0
}

/**
 * Clear all data (for testing/debug)
 */
export async function clearDatabase(): Promise<void> {
  const database = await getDatabase()

  await database.execAsync('DELETE FROM hymns; DELETE FROM bookmarks;')
  console.log('✓ Database cleared')
}

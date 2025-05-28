// init-db.js
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import fs from 'fs/promises';
import path from 'path';

const dbPath = path.resolve('db', 'quiz.db');
const sqlPath = path.resolve('db', 'init_quiz.sql');

async function initDB() {
  try {
    const db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    });

    const sql = await fs.readFile(sqlPath, 'utf-8');
    await db.exec(sql);

    console.log('✅ Database initialized successfully.');
    await db.close();
  } catch (err) {
    console.error('❌ Failed to initialize database:', err);
  }
}

initDB();

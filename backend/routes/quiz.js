import express from 'express';
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

const router = express.Router();

const getDB = () => open({
  filename: './db/quiz.db',
  driver: sqlite3.Database,
});

router.get('/full_question_bank', async (req, res) => {
  const db = await getDB();

  const subjects = await db.all(`SELECT * FROM subjects`);
  const quiz = {
    total_subject: subjects.length,
    subject_names: [],
    questions: {},
  };

  for (const { id, name } of subjects) {
    quiz.subject_names.push(name);

    const questions = await db.all(
      `SELECT question_id, question, options FROM questions WHERE subject_id = ?`,
      id
    );

    for (const q of questions) {
      q.options = JSON.parse(q.options);
    }

    quiz.questions[name] = {
      total_question: questions.length,
      question_list: questions,
    };
  }

  res.json(quiz);
});






router.post('/custom', async (req, res) => {
  const db = await getDB();
  const { subjects } = req.body;

  if (!Array.isArray(subjects) || subjects.length === 0) {
    return res.status(400).json({ error: 'Invalid or empty subjects list' });
  }

  
  const quiz={
    total_subject: subjects.length,
    subject_names: [],
    questions: {},
  }

  try {
    for (const { name, count } of subjects) {
      const subject = await db.get(`SELECT id FROM subjects WHERE name = ?`, name);

      if (!subject) {
        quiz.questions[name] = { error: 'Subject not found' };
        continue;
      }
      quiz.subject_names.push(name)

      const questions = await db.all(
        `
        SELECT question_id, question, options
        FROM questions
        WHERE subject_id = ?
        ORDER BY RANDOM()
        LIMIT ?
        `,
        subject.id,
        count
      );
      

      for (const q of questions) {
      q.options = JSON.parse(q.options);
    }
     

     quiz.questions[name] = {
      total_question: questions.length,
      question_list: questions,
    };
  }

    res.json(quiz);

  } catch (err) {
    console.error('❌ Error processing custom quiz request:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.post('/add-question', async (req, res) => {
  const db = await getDB();
  const { subject_name, question, options } = req.body;

  if (!subject_name || !question || !options) {
    return res.status(400).json({ error: 'Incomplete detail.' });
  }

  try {
    // Parse options if it comes in as a JSON string
    const parsedOptions = typeof options === 'string' ? JSON.parse(options) : options;

    if (!Array.isArray(parsedOptions)) {
      return res.status(400).json({ error: 'Options should be an array or JSON array string.' });
    }

    // Get the subject 
    const subject = await db.get('SELECT * FROM subjects WHERE name = ?', [subject_name]);

    if (!subject) {
      return res.status(404).json({ error: 'Subject not found.' });
    }

    // Insert the question with options stored as a JSON string
    await db.run(
      'INSERT INTO questions (subject_id, question, options) VALUES (?, ?, ?)',
      [subject.id, question, JSON.stringify(parsedOptions)]
    );

    res.status(201).json({ message: 'Question added with options as JSON string.' });

  } catch (err) {
    console.error('❌ Error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});



router.put('/update-question/:id', async (req, res) => {
  const db = await getDB();
  const questionId = req.params.id;
  const { subject_name, question, options } = req.body;

  if (!questionId||!subject_name || !question || !options) {
    return res.status(400).json({ error: 'Incomplete detail.' });
  }

  try {
    // Parse options if it comes in as a JSON string
    const parsedOptions = typeof options === 'string' ? JSON.parse(options) : options;

    if (!Array.isArray(parsedOptions)) {
      return res.status(400).json({ error: 'Options should be an array or JSON array string.' });
    }
     

    // Get the subject 
    const subject = await db.get('SELECT * FROM subjects WHERE name = ?', [subject_name]);
    
    if (!subject) {
      return res.status(404).json({ error: 'Subject not found.' });
    }
      
    // Get the question 
    const ExisitingQuestion = await db.get('SELECT * FROM questions WHERE question_id = ?', [questionId]);

    if (!ExisitingQuestion) {
      return res.status(404).json({ error: 'Question not found.' });
    }

    // Insert the question with options stored as a JSON string
    await db.run(
      'UPDATE questions SET subject_id= ?, question = ?, options = ? WHERE question_id = ?',
      [subject.id, question, JSON.stringify(parsedOptions),questionId]
    );

    res.status(200).json({ message: 'Question updated successfully.' });

  } catch (err) {
    console.error('❌ Error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }


});

router.delete('/delete-question/:id',async (req,res)=>{
  const db = await getDB();
  const questionId = req.params.id;
    
  if (!questionId){
    return res.status(400).json({error:'invalid detail'})
  }

  try{
     
   const ExisitingQuestion = await db.get('SELECT * FROM questions WHERE question_id = ?', [questionId]);

    if (!ExisitingQuestion) {
      return res.status(404).json({ error: 'Question not found.' });
    }

    await db.run(
      'DELETE FROM questions WHERE question_id=?',[questionId]
    )

    res.status(200).json({message:'question deleted successfully.'})

    

  }
  catch(err){
    console.error('❌ Error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }

})

router.put('/update-subject/:id',async (req,res)=>{
  const db=await getDB()
  const {subject_name}=req.body;
  const subjectId=req.params.id;
    if (!subjectId||!subject_name){
      return res.status(400).json({error:'Invalid subject data.'})
  }
  try{
  
  const subject=await db.get('SELECT * FROM subjects WHERE id=?',subjectId)

  if (!subject){
    return res.status(400).json({error:'subject does not exist.'})
  }
  await db.run(
    'UPDATE subjects SET name=? WHERE id=?',[subject_name,subjectId]
  )

  res.status(200).json({message:'subject updated successfully.'})
}
  catch(err){
     console.error('❌ Error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }

})


router.post('/add-subject',async (req,res)=>{
  const db=await getDB()
  const {subject_name}=req.body;
  
    if (!subject_name || typeof subject_name !== 'string') {
    return res.status(400).json({ error: 'Invalid subject data.' });
  }

  // Capitalize each word
  subject_name = subject_name.trim().toLowerCase().replace(/\b\w/g, char => char.toUpperCase());


  try{
  
  const existing_subject=await db.get('SELECT * FROM subjects WHERE name=?',subject_name)

  if (existing_subject){
    return res.status(400).json({error:'subject already exists.'})
  }
  await db.run(
    'INSERT INTO subjects (name) VALUES (?)',[subject_name]
  )

  res.status(200).json({message:'subject added successfully.'})
}
  catch(err){
     console.error('❌ Error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }

})

router.delete('/delete-subject/:id', async (req, res) => {
  const db = await getDB();
  const subjectId = req.params.id;

  if (!subjectId) {
    return res.status(400).json({ error: 'Invalid subject ID.' });
  }

  try {
    const subject = await db.get('SELECT * FROM subjects WHERE id = ?', [subjectId]);

    if (!subject) {
      return res.status(404).json({ error: 'Subject not found.' });
    }

    const usedInQuestions = await db.get(
      'SELECT COUNT(*) AS count FROM questions WHERE subject_id = ?',
      [subjectId]
    );

    if (usedInQuestions.count > 0) {
      return res.status(400).json({ error: `Subject is in use by (${usedInQuestions.count}) question(s) and cannot be deleted.` });
    }

    await db.run('DELETE FROM subjects WHERE id = ?', [subjectId]);

    res.status(200).json({ message: 'Subject deleted successfully.' });
  } catch (err) {
    console.error('❌ Error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});




export default router;

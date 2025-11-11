import React, { useState } from 'react';
import { Paper, Typography, RadioGroup, FormControlLabel, Radio, Button } from '@mui/material';
import api from '../../api/axios';
import { useSnackbar } from 'notistack';
import ConfettiOverlay from '../common/ConfettiOverlay';

export default function QuizRunner({ assessment }) {
  const [answers, setAnswers] = useState([]);
  const [celebrate, setCelebrate] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  function handleAnswer(questionIndex, answerIndex) {
    const updated = [...answers];
    const existing = updated.find(a => a.questionIndex === questionIndex);
    if (existing) {
      existing.answerIndex = answerIndex;
    } else {
      updated.push({ questionIndex, answerIndex });
    }
    setAnswers(updated);
  }

  async function submitQuiz() {
    try {
      const { data } = await api.post(`/assessments/${assessment._id}/attempt`, { answers });
      enqueueSnackbar(`Submitted! Score: ${data.attempt.score}%`, { variant: 'info' });
      enqueueSnackbar(`Points awarded: ${data.pointsAwarded}`, { variant: 'success' });

      if (data.badgeAwarded) {
        enqueueSnackbar(`🎖 New badge earned: ${data.badgeAwarded.name}`, { variant: 'success' });
        setCelebrate(true);
        setTimeout(() => setCelebrate(false), 5000);
      }
      if (data.certificateUrl) {
        enqueueSnackbar(`📜 Certificate awarded!`, { variant: 'success' });
        setCelebrate(true);
        setTimeout(() => setCelebrate(false), 5000);
      }
      if (data.courseCompleted) {
        enqueueSnackbar(`🎉 Course completed!`, { variant: 'success' });
        setCelebrate(true);
        setTimeout(() => setCelebrate(false), 5000);
      }
    } catch (err) {
      enqueueSnackbar('Submission failed', { variant: 'error' });
    }
  }

  return (
    <>
      <ConfettiOverlay active={celebrate} />
      <Paper className="p-6 space-y-6">
        <Typography variant="h6">{assessment.title}</Typography>
        {assessment.questions.map((q, i) => (
          <div key={i} className="space-y-2">
            <Typography>{q.prompt}</Typography>
            {(q.type === 'MCQ' || q.type === 'TrueFalse') ? (
              <RadioGroup
                value={answers.find(a => a.questionIndex === i)?.answerIndex ?? ''}
                onChange={e => handleAnswer(i, Number(e.target.value))}
              >
                {q.options.map((opt, idx) => (
                  <FormControlLabel key={idx} value={idx} control={<Radio />} label={opt} />
                ))}
              </RadioGroup>
            ) : (
              <textarea
                className="w-full border p-2"
                placeholder="Your answer..."
                onChange={e => setAnswers(prev => {
                  const updated = [...prev];
                  const existing = updated.find(a => a.questionIndex === i);
                  if (existing) existing.text = e.target.value;
                  else updated.push({ questionIndex: i, text: e.target.value });
                  return updated;
                })}
              />
            )}
          </div>
        ))}
        <Button variant="contained" onClick={submitQuiz}>Submit</Button>
      </Paper>
    </>
  );
}
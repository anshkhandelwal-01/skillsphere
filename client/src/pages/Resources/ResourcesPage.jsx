import React from 'react';
import { Grid, Paper, Typography, Link } from '@mui/material';

export default function ResourcesPage() {
  const faq = [
    { q: 'How do I reset password?', a: 'Go to Profile -> Security.' },
    { q: 'How are points calculated?', a: 'Points scale by assessment score and course weightage.' }
  ];
  const links = [
    { title: 'Help Center', url: '#' },
    { title: 'Technical Support', url: '#' },
    { title: 'Community Forum', url: '#' }
  ];

  return (
    <div className="p-6 space-y-4">
      <Typography variant="h5">Resources & support</Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper className="p-4">
            <Typography variant="subtitle1">Help Center / FAQ</Typography>
            <ul className="list-disc pl-6">
              {faq.map((f, i) => <li key={i}><strong>{f.q}</strong> — {f.a}</li>)}
            </ul>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper className="p-4">
            <Typography variant="subtitle1">Learning resources</Typography>
            <ul className="list-disc pl-6">
              {links.map((l, i) => <li key={i}><Link href={l.url}>{l.title}</Link></li>)}
            </ul>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}
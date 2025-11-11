const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const { PORT } = require('./config/env');

const authRoutes = require('./routes/auth.routes');
const usersRoutes = require('./routes/users.routes');
const coursesRoutes = require('./routes/courses.routes');
const assessmentsRoutes = require('./routes/assessments.routes');
const adminRoutes = require('./routes/admin.routes');
const badgesRoutes = require('./routes/badges.routes');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/auth', authRoutes);
app.use('/users', usersRoutes);
app.use('/courses', coursesRoutes);
app.use('/assessments', assessmentsRoutes);
app.use('/admin', adminRoutes);
app.use('/badges', badgesRoutes);

app.get('/', (_, res) => res.send('SkillSphere API running'));

connectDB().then(() => {
  app.listen(PORT, () => console.log(`Server running on ${PORT}`));
});
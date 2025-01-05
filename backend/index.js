const kamRoutes = require('./routes/kam');
const leadRoutes = require('./routes/lead');
const callPlanningRoutes = require('./routes/callplanning');
const contactsRoutes = require('./routes/contacts');
const performanceRoutes = require('./routes/performance');
const interactionRoutes = require('./routes/interaction');
const express = require('express');
const bodyParser = require('body-parser')
const sequelize = require('./config/db')
const authRoutes = require('./routes/auth')
const {authenticateToken} = require('./middleware/auth');
const logger = require('./middleware/logger');
require('dotenv').config();
const cors = require('cors');

const app = express();

app.use(bodyParser.json());
app.use(logger);
app.use(cors());

app.use('/auth',authRoutes);

app.use('/lead',authenticateToken, leadRoutes);
app.use('/kam', authenticateToken, kamRoutes);
app.use('/callplanning',authenticateToken,callPlanningRoutes)
app.use('/contact',authenticateToken,contactsRoutes);
app.use('/interaction',authenticateToken, interactionRoutes);
app.use('/performance',authenticateToken, performanceRoutes);

sequelize.sync()//({alter:true})
    .then(()=> console.log('Database synced'))
    .catch(err => console.log('Error',err));

app.listen(process.env.PORT, () => console.log(`Server running on port ${process.env.PORT}`));
const Lead = require('./Lead');
const Contacts = require('./Contacts');
const Interaction = require('./Interaction');
const Performance = require('./Performance');
const CallPlanning = require('./CallPlanning');

// Associations
Lead.hasMany(Contacts, { foreignKey: 'leadId', onDelete: 'CASCADE' });
Contacts.belongsTo(Lead, { foreignKey: 'leadId' });

Lead.hasMany(Interaction, { foreignKey: 'leadId', onDelete: 'CASCADE' });
Interaction.belongsTo(Lead, { foreignKey: 'leadId' });

Lead.hasOne(Performance, { foreignKey: 'leadId', onDelete: 'CASCADE' });
Performance.belongsTo(Lead, { foreignKey: 'leadId' });

Lead.hasOne(CallPlanning, { foreignKey: 'leadId', onDelete: 'CASCADE' });
CallPlanning.belongsTo(Lead, { foreignKey: 'leadId' });

module.exports = { Lead, Contacts, Interaction, Performance, CallPlanning };

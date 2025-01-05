const sequelize = require('./config/db');
const Lead = require('./models/Lead');
const Contact = require('./models/Contacts');
const Interaction = require('./models/Interaction');
const CallPlanning = require('./models/CallPlanning');
const Performance = require('./models/Performance');

const seedDatabase = async () => {
    try {
        // Sync database (drops and recreates tables)
        await sequelize.query('SET FOREIGN_KEY_CHECKS = 0');
        await sequelize.sync({ force: true });

        console.log('Database synced!');

        // Seed Leads
        const leads = await Lead.bulkCreate([
            { name: 'Donald Trump',restaurantName:'Trump Hotel', address: '123 Main St', contactNumber: '1234567890', status: 'Active', assignedKAM:2 },
            { name: 'Narendra Modi',restaurantName:'Modi Foods' ,address: '456 Elm St', contactNumber: '0987654321', status: 'Active', assignedKAM:3 },
        ]);

        console.log('Leads seeded!');

        // Seed Contacts
        const contacts = await Contact.bulkCreate([
            { leadId: leads[0].id, name: 'Alice', role: 'Manager', phone: '1112223333', email: 'alice@restaurantA.com' },
            { leadId: leads[0].id, name: 'Bob', role: 'Owner', phone: '4445556666', email: 'bob@restaurantA.com' },
            { leadId: leads[1].id, name: 'Charlie', role: 'Manager', phone: '7778889999', email: 'charlie@restaurantB.com' },
        ]);

        console.log('Contacts seeded!');

        // Seed Interactions
        const interactions = await Interaction.bulkCreate([
            { leadId: leads[0].id, type: 'Call', notes: 'Discussed new menu options', interaction_date: '2024-12-01', followUpRequired: true },
            { leadId: leads[1].id, type: 'Order', notes: 'Ordered 50 units of Product A', interaction_date: '2024-12-05', followUpRequired: false },
        ]);

        console.log('Interactions seeded!');

        // Seed CallPlanning
        const callPlanning = await CallPlanning.bulkCreate([
            { leadId: leads[0].id, callFrequency: 7, lastCallDate: '2024-12-01' },
            { leadId: leads[1].id, callFrequency: 14, lastCallDate: '2024-12-05' },
        ]);

        console.log('CallPlanning seeded!');

        // Seed Performance
        const performance = await Performance.bulkCreate([
            { leadId: leads[0].id, totalOrders: 3, lastOrderDate: '2024-12-01' },
            { leadId: leads[1].id, totalOrders: 5, lastOrderDate: '2024-12-05' },
        ]);

        console.log('Performance seeded!');

        console.log('Seeding complete!');
    } catch (err) {
        console.error('Error seeding database:', err);
    } finally {
        // Close the database connection
        await sequelize.close();
        console.log('Database connection closed.');
    }
};

seedDatabase();

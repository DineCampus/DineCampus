const { AllowedID, sequelize } = require('./models/index');

const seedAllowedIDs = async () => {
  try {
    await sequelize.sync({ force: true }); // This will drop the tables and recreate them
    await AllowedID.bulkCreate([
      { id: '2021130022', role: 'student' },
      { id: '2021130025', role: 'student' },
      { id: '2021130026', role: 'student' },
      { id: 'S111000101', role: 'staff' },
      { id: 'S111000102', role: 'staff' },
      { id: 'S111000103', role: 'staff' },
      // Add more allowed IDs as necessary
    ]);
    console.log('Allowed IDs have been seeded');
  } catch (err) {
    console.error('Error seeding allowed IDs:', err);
  } finally {
    process.exit(); // Exit the process when seeding is done
  }
};

seedAllowedIDs();

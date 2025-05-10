const m = require('./sections');

module.exports = async function seedFunction(db: any) {
  for (let section of m.sections) {
    await db.section.upsert({
      where: { id: section.id },
      update: { ...section },
      create: { ...section },
    });
  }
};

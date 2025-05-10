const bcrypt = require("bcryptjs");

const users = [
  {
    id: 1,
    name: "superadmin",
    slug: "superadmin",
    data: "{}",
    leadership: false,
  },
];

const cerdentials = [
  {
    id: 1,
    username: "superadmin@mu.com",
    password: bcrypt.hashSync("superadmin", 10),
    userId: 1,
  },
];

const roles = [
  {
    id: 1,
    name: "superadmin",
    description: "has all access over all",
  },
  {
    id: 2,
    name: "admin",
    description: "has control  over one entity add staff, pages, sections...",
  },
  {
    id: 3,
    name: "editor",
    description:
      "has control over one entity can update daynamic data such as news",
  },
  { id: 4, name: "user", description: "has control only on his data and cv" },
];

module.exports = async function seedFunction(db: any) {
  for (let role of roles) {
    await db.role.upsert({
      where: { name: role.name },
      update: { ...role },
      create: {
        ...role,
      },
    });
  }

  for (let user of users) {
    let id = user.id;

    await db.user.upsert({
      where: { id },
      update: { ...user },
      create: {
        ...user,
      },
    });
  }
  for (let cerdential of cerdentials) {
    await db.cerdential.upsert({
      where: { id: cerdential.id },
      update: { ...cerdential },
      create: {
        ...cerdential,
      },
    });
  }
};

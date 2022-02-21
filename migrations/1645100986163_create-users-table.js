exports.up = pgm => {
  pgm.createTable('users', {
    id: {
      type: 'VARCHAR(20)',
      primaryKey: true,
      notNull: true
    },
    username: {
      type: 'TEXT',
      notNull: true
    }
  })
};

exports.down = pgm => {
  pgm.dropTable('users');
};

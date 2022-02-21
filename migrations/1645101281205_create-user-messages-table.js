exports.up = pgm => {
  pgm.createTable('usermessage', {
    user_id: {
      type: 'VARCHAR(20)',
      notNull: true
    },
    message: {
      type: 'TEXT[]'
    },
  });

  pgm.addConstraint('usermessage', 'fk_usermessage.user_id_users.id', 'FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE')
};

exports.down = pgm => {

};

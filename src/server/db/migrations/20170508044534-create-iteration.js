module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('Iterations', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      postId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Posts',
          key: 'id',
          onUpdate: 'cascade',
          onDelete: 'cascade',
        },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      body: {
        type: Sequelize.TEXT,
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false,
      },
    }),

  down: (queryInterface, Sequelize) => queryInterface.dropTable('Iterations'),
}

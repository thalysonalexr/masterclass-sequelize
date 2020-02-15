module.exports = {
  localhost: {
    dialect: 'postgres',
    host: 'localhost',
    username: 'root',
    password: 'root',
    port: 5433,
    database: 'sqlnode',
    define: {
      timestamps: true,
      underscored: true
    }
  },
  development: {
    dialect: 'postgres',
    host: 'postgres',
    username: 'root',
    password: 'root',
    port: 5432,
    database: 'sqlnode',
    define: {
      timestamps: true,
      underscored: true
    }
  }
};

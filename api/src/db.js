require('dotenv').config();
const { Sequelize } = require('sequelize');
const fs = require('fs');
const path = require('path');
const {
    DB_USER, DB_PASSWORD, DB_HOST, DB_NAME } = process.env;
let sequelize =
    process.env.NODE_ENV === "production"
        ? new Sequelize({
            database: DB_NAME,
            dialect: "postgres",
            host: DB_HOST,
            port: 5432,
            username: DB_USER,
            password: DB_PASSWORD,
            pool: {
                max: 3,
                min: 1,
                idle: 10000,
            },
            dialectOptions: {
                ssl: {
                    require: true,
                    // Ref.: https://github.com/brianc/node-postgres/issues/2009
                    rejectUnauthorized: false,
                },
                keepAlive: true,
            },
            ssl: true,
        })
        : new Sequelize(
            `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/henryoverflow`,
            { logging: false, native: false }
        );
// const sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/pokemon`, {
//   logging: false, // set to console.log to see the raw SQL queries
//   native: false, // lets Sequelize know we can use pg-native for ~30% more speed
// });
const basename = path.basename(__filename);

const modelDefiners = [];

// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, '/models'))
    .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
    .forEach((file) => {
        modelDefiners.push(require(path.join(__dirname, '/models', file)));
    });

// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach(model => model(sequelize));
// Capitalizamos los nombres de los modelos ie: product => Product
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [entry[0][0].toUpperCase() + entry[0].slice(1), entry[1]]);
sequelize.models = Object.fromEntries(capsEntries);

// En sequelize.models están todos los modelos importados como propiedades
// Para relacionarlos hacemos un destructuring
const {
    Post,
    Tag,
    User,
    Comment,
    Module,
    Like_comment,
    Like_post,
    Order,
    Product
} = sequelize.models;

// Aca vendrian las relaciones
// Product.hasMany(Reviews);


// Foo.hasOne(Bar);
// Bar.belongsTo(Foo);


User.hasMany(Like_post)
Like_post.belongsTo(User)

Post.hasMany(Like_post)
Like_post.belongsTo(Post)

User.hasMany(Like_comment)
Like_comment.belongsTo(User)

Comment.hasMany(Like_comment)
Like_comment.belongsTo(Comment)

Post.belongsToMany(Tag, { through: "Posts_Tags" });
Tag.belongsToMany(Post, { through: "Posts_Tags" });

Module.hasMany(Post);
Post.belongsTo(Module);

User.hasMany(Post);
Post.belongsTo(User);

Post.hasMany(Comment);
Comment.belongsTo(Post);

User.hasMany(Comment);
Comment.belongsTo(User);

Module.hasMany(Tag);
Tag.belongsTo(Module);

// User.hasMany(Order);
// Order.belongsTo(User);



module.exports = {
    ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
    conn: sequelize,     // para importart la conexión { conn } = require('./db.js');
};

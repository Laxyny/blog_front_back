const express = require('express');
const cors = require(
    'cors'
)
const app = express();
const port = 3000;

const { MongoClient, ServerApiVersion } = require('mongodb');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');
const articleRoutes = require('./routes/articleRoutes');
const userController = require('./controllers/userController');
const articleController = require('./controllers/articleController')

const cookieParser = require('cookie-parser');
const authMiddleware = require('./middlewares/authMiddleware');
const articleMiddleware = require('./middlewares/articleMiddleware')

const uri = "mongodb+srv://root:blog@blog.dj6ir.mongodb.net/?retryWrites=true&w=majority&appName=blog";

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(express.static('public'));

app.use(cors({
    origin: 'http://localhost:4200',
    credentials: true,
}));

async function run() {
    try {
        await client.connect();
        const database = client.db("Stockage");

        const usercollection = database.collection("Users");
        const tokenCollection = database.collection("Tokens");
        const articleCollection = database.collection("Articles");

        userController.init(usercollection, tokenCollection);
        articleController.init(articleCollection);

        app.use('/', userRoutes);
        app.use('/', articleRoutes);

        app.get('/', authMiddleware, (req, res) => {
            res.sendFile(__dirname + '/public/homepage.html');
        });

        app.get('/login', (req, res) => {
            res.sendFile(__dirname + '/public/login.html');
        });

        app.get('/register', (req, res) => {
            res.sendFile(__dirname + '/public/register.html');
        });

        app.get('/createArticle', authMiddleware, (req, res) => {
            res.sendFile(__dirname + '/public/createArticle.html');
        });

        app.use((err, req, res, next) => {
            console.error(err.stack);
            res.status(500).json({ message: 'Erreur interne du serveur' });
        });

        app.use((req, res, next) => {
            res.status(404).send('404 Page non trouvée');
        });

        app.listen(port, () => {
            console.log(`API en cours d'exécution sur http://localhost:${port}`);
        });

    } catch (err) {
        console.error(err);
    }
}

run().catch(console.dir);
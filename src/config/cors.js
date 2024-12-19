require("dotenv").config();

const configCors = (app) => {
    // Add headers before the routes are defined
    app.use(function (req, res, next) {
        res.setHeader('Access-Control-Allow-Origin', 'https://datn-fe-web.vercel.app', 'http://localhost:3000');

        // Request methods you wish to allow
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

        // Request headers you wish to allow
        res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,authorization');

        // Set to true if you need the website to include cookies in the requests sent
        // to the API (e.g. in case you use sessions)
        res.setHeader('Access-Control-Allow-Credentials', true);

        // Handle preflight request
        if (req.method === "OPTIONS") {
            return res.sendStatus(200);
        }

        // Pass to next layer of middleware
        next();
    });
};

export default configCors;
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const express_asyncify_1 = __importDefault(require("express-asyncify"));
const express_session_1 = __importDefault(require("express-session"));
const client_1 = require("@prisma/client");
var passport = require('passport');
var GoogleStrategy = require('passport-google-oidc');
const app = (0, express_asyncify_1.default)((0, express_1.default)());
const port = 3000;
dotenv_1.default.config();
const prisma = new client_1.PrismaClient({
    datasources: {
        db: {
            url: process.env.DATABASE_URL
        }
    }
});
app.use(express_1.default.json());
app.use((0, express_session_1.default)({
    secret: 'your-secret-here', // Replace with your actual secret
    resave: false,
    saveUninitialized: true,
}));
app.use((0, cors_1.default)());
const cb_url = 'http://localhost:3000/auth/google/callback';
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: cb_url,
}, (issuer, profile, cb) => {
    console.log(profile, issuer);
    // and call cb(null, user) or cb(null, false) accordingly
    if (profile && profile.id && profile.displayName) {
        // Valid profile, return the display name
        cb(null, profile.displayName);
    }
    else {
        // Invalid profile, return false
        cb(null, false);
    }
}));
passport.serializeUser((user, done) => {
    // Serialize the user ID (or any unique identifier) into the session
    console.log("Serializing", user);
    done(null, user);
});
passport.deserializeUser((anything, done) => {
    // Retrieve the user from the database based on the serialized ID
    // Example: findById(id, (err, user) => done(err, user));
    console.log("Deserializing ", anything);
    done(null, anything); // Replace with your actual user retrieval logic
});
app.get('/google', passport.authenticate('google', { scope: ['openid', 'profile'] }));
app.get('/auth/google/callback', passport.authenticate('google'), (req, res) => {
    // Successful authentication
    console.log("yoho");
    res.redirect('/');
});
app.get("/", (req, res) => {
    //res.send("Express + TypeScript Server");
    res.redirect('http://localhost:5173/');
});
app.post("/register", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    if (!data.username || !data.password) {
        console.log("invalid body");
        return res.status(400).json({});
    }
    // username must be unique
    const userExists = yield prisma.user.findFirst({
        where: {
            username: data.username
        }
    });
    if (userExists) {
        console.log(data, userExists);
        return res.status(400).json({});
    }
    const id = yield prisma.user.create({
        data: {
            username: data.username,
            password: data.password,
            pomo_cycles: 0
        }
    });
    // return their uuid for further identification
    return res.json({ id });
}));
app.post("/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    if (!data.username || !data.password) {
        console.log("invalid body");
        return res.status(400).json({});
    }
    const userExists = yield prisma.user.findFirst({
        where: {
            username: data.username
        }
    });
    if (!userExists) {
        return res.status(400).json({});
    }
    if (userExists.password == data.password) {
        return res.json({ id: userExists.id });
    }
    else {
        return res.status(400).json({});
    }
}));
// expects { id: "" }
app.put("/increment_pomo_cycles", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    const user = yield prisma.user.findUnique({
        where: {
            id: data.id
        }
    });
    if (!user) {
        return res.status(400).json({});
    }
    yield prisma.user.update({
        where: {
            id: user.id
        },
        data: {
            id: user.id,
            username: user.username,
            password: user.password,
            pomo_cycles: user.pomo_cycles + 1
        }
    });
    return res.json({});
}));
app.get("/leaderboard", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield prisma.user.findMany({
        orderBy: {
            pomo_cycles: 'desc',
        },
        take: 5,
    });
    return res.json({
        leaderboard: users,
    });
}));
app.get("/test", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const allUsers = yield prisma.user.findMany();
    console.log(allUsers);
}));
app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});

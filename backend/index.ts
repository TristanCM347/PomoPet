import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import cors from 'cors';
import asyncify from 'express-asyncify';
import session from 'express-session'
import { PrismaClient } from "@prisma/client";
var passport = require('passport');
var GoogleStrategy = require('passport-google-oidc');


const app: Express = asyncify(express());
const port = 3000;
dotenv.config();
const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL
    }
  }
})



app.use(express.json());
app.use(session({
  secret: 'your-secret-here', // Replace with your actual secret
  resave: false,
  saveUninitialized: true,
}));
app.use(cors())

const cb_url = 'http://localhost:3000/auth/google/callback'

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: cb_url,
}, (issuer: any, profile: any, cb: any) => {
  console.log(profile, issuer)
  // and call cb(null, user) or cb(null, false) accordingly
  if (profile && profile.id && profile.displayName) {
    // Valid profile, return the display name
    cb(null, profile);
  } else {
    // Invalid profile, return false
    cb(null, false);
  }
}));

passport.serializeUser((user: any, done: any) => {
  // Serialize the user ID (or any unique identifier) into the session
  console.log("Serializing", user)
  done(null, user);
});

passport.deserializeUser((anything: any, done: any) => {
  // Retrieve the user from the database based on the serialized ID
  // Example: findById(id, (err, user) => done(err, user));
  console.log("Deserializing ", anything)
  done(null, anything); // Replace with your actual user retrieval logic
});

app.get('/google', passport.authenticate('google', { scope: ['openid', 'profile'] }));

app.get('/auth/google/callback',
  passport.authenticate('google'),
  (req, res) => {
    // Successful authentication
    console.log("yoho")
    console.log(req.session);

    // @ts-ignore
    const id = req.session.passport.user.id;
    // @ts-ignore
    const username = req.session.passport.user.displayName;

    res.cookie('id', id, { maxAge: 60000, httpOnly: false });
    // @ts-ignore
    res.cookie('name', username, { maxAge: 60000, httpOnly: false });
    res.redirect('/success');
  }
);

app.get('/success', async (req: Request, res: Response) => {
  // @ts-ignore
  const id = req.session.passport.user.id;
  // @ts-ignore
  const username = req.session.passport.user.displayName;

  let user = await prisma.user.findUnique({
    where: {
      id: id
    }
  })

  if (!user) {
    user = await prisma.user.create({
      data: {
        id: id,
        username: username,
        password: "",
        pomo_cycles: 0
      }
    })
  }

  console.log(user);

  res.redirect("/");
})


app.get("/", (req: Request, res: Response) => {
  //res.send("Express + TypeScript Server");
  res.redirect('http://localhost:5173/')
});

/*
app.post("/register", async (req: Request, res: Response) => {
  const data = req.body;

  if (!data.username || !data.password) {
    console.log("invalid body");
    return res.status(400).json({});
  }

  // username must be unique
  const userExists = await prisma.user.findFirst({
    where: {
      username: data.username
    }
  });

  if (userExists) {
    console.log(data, userExists);
    return res.status(400).json({});
  }

  const id = await prisma.user.create({
    data: {
      username: data.username,
      password: data.password,
      pomo_cycles: 0
    }
  })

  // return their uuid for further identification
  return res.json({ id });
})

app.post("/login", async (req: Request, res: Response) => {
  const data = req.body;

  if (!data.username || !data.password) {
    console.log("invalid body");
    return res.status(400).json({});
  }

  const userExists = await prisma.user.findFirst({
    where: {
      username: data.username
    }
  });

  if (!userExists) {
    return res.status(400).json({});
  }

  if (userExists.password == data.password) {
    return res.json({ id: userExists.id });
  } else {
    return res.status(400).json({});
  }
})
*/

app.get("/get_pomo_cycles", async (req: Request, res: Response) => {
  const queryToken = req.query.token as string;
  const user = await prisma.user.findUnique({
    where: {
      id: queryToken
    }
  });

  if (!user) {
    return res.status(400).json({});
  }

  return res.json({ pomo_cycles: user.pomo_cycles });
})

// expects { id: "" }
app.put("/increment_pomo_cycles", async (req: Request, res: Response) => {
  const data = req.body;

  const user = await prisma.user.findUnique({
    where: {
      id: data.id
    }
  });

  if (!user) {
    return res.status(400).json({});
  }

  await prisma.user.update({
    where: {
      id: user.id
    },
    data: {
      id: user.id,
      username: user.username,
      password: user.password,
      pomo_cycles: user.pomo_cycles + 1
    }
  })

  return res.json({});
})

app.get("/leaderboard", async (req: Request, res: Response) => {
  const users = await prisma.user.findMany({
    orderBy: {
      pomo_cycles: 'desc',
    },
    take: 5,
  });

  return res.json({
    leaderboard: users,
  });
});

app.get("/test", async (req: Request, res: Response) => {
  const allUsers = await prisma.user.findMany();
  console.log(allUsers);
})

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});

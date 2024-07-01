import express, { text } from 'express';
import cors from 'cors';
import config from './config/config.js';
import sequelize from './config/database.js';
import authRoutes from './routes/auth.js';
import cookieParser from 'cookie-parser';
import User from './models/User.js';
import Message from './models/Messages.js';
import 'dotenv/config';
import authMiddleware from './middleware/auth.Middleware.js';

const app = express();

app.use(cookieParser());
app.use(cors({
  origin: 'http://localhost:5173', // Ensure this matches your client URL
  credentials: true
}));
app.use(express.static('public'));
app.use(express.json());

app.use('/api/v1', authRoutes);

// app.use('/api/v1', (req, res, next) => {
//   const token = req.cookies.token; // Extract the token from cookies
//   console.log("Cookie :", req.cookies)

//   // console.log(token)

//   // if (!token) return res.status(401).json({ error: 'Access denied' });

//   try {
//     const verified = jwt.verify(token, process.env.JWT_SECRET);
//     // console.log(verified)
//     req.user = verified;
//     next();
//   } catch (error) {
//     res.status(400).json({ error: 'Invalid token' });
//   }
// });


app.get('/api/v1/users', async (req, res) => {
  try {
    const q = req.query.q;
    const myID = req.user.id;
    console.log(myID);

    let users;

    if (q) {
      users = await User.findAll({
        where: {
          username: sequelize.where(
            sequelize.fn("LOWER", sequelize.col("username")),
            "LIKE",
            "%" + q + "%"
          ),
        },
      });
    } else {
      users = await User.findAll({});
    }

    const modifiedUserList = users.map(eachUser => {
      let user = {
        id: eachUser.id,
        username: eachUser.username,
        email: eachUser.email,
      };

      if (eachUser.id === myID) {
        console.log('matched');
        user.me = true;
      }

      return user;
    });

    res.json(modifiedUserList);

  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ message: 'Error retrieving users' });
  }
});


app.post('/api/v1/message', async (req, res) => {

  if (!req.body.text ||
    !req.body.toUserId) {
    res.status('400').send('invalid input')
    return;
  }

  const sent = await Message.create({
    fromUserId: req.user.id,
    toUserId: req.body.toUserId,
    text: req.body.text
  })

  console.log('sent', sent)

  res.send('message sent succesfully')

})

app.get('/api/v1/message/:id', async (req, res) => {

  // try {

  // } catch (error) {

  // }
  const messages = await Message.findAll({
    where: {
      fromUserId: req.user.id,
      toUserId: req.params.id,
    },
    limit: 100,
    include: [
      { model: User, as: 'fromUser', attributes: ['username'] },
      { model: User, as: 'toUser', attributes: ['username'] },
    ]
  })

  // messages.forEach(message => {
  //   console.log(`From User: ${message.fromUser.username}`);
  //   console.log(`To User: ${message.toUser.username}`);
  //   console.log(`Message Text: ${message.text}`);
  //   console.log('-----------------');
  // });

  res.send(messages)

})


const PORT = config?.server?.port;
sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}).catch(err => {
  console.error('Error synchronizing the database:', err);
});

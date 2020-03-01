import express from 'express';
import path from 'path';
import helmet from 'helmet';
import cors from 'cors';
import compress from 'compression';
import services from './services';

const root = path.join(__dirname, '../../');
const app = express();
const root_web = path.join(__dirname, '../../../web');

if (process.env.NODE_ENV === 'production') {
  app.use(helmet());
  app.use(
    helmet.contentSecurityPolicy({
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "'unsafe-inline'"],
        styleSrc: ["'self'", "'unsafe-inline'"],
        imgSrc: ["'self'", 'data:', '*.amazonaws.com']
      }
    })
  );
  app.use(compress());
  app.use(cors());
}

app.use(helmet.referrerPolicy({ policy: 'same-origin' }));
app.use('/', express.static(path.join(root_web, 'build/client')));
app.use('/uploads', express.static(path.join(root, 'uploads')));

const serviceNames = Object.keys(services);
for (let i = 0; i < serviceNames.length; i += 1) {
  const name = serviceNames[i];
  if (name === 'graphql') {
    services[name].applyMiddleware({ app });
  } else {
    app.use(`/${name}`, services[name]);
  }
}

app.get('/', (req, res) => {
  res.sendFile(path.join(root_web, '/build/client/index.html'));
});

app.listen(8000, () => console.log('Listening on port 8000!'));

import { Hono } from 'hono';
import { HonoEnv } from '../../@types/hono/generics';
import BadRequestException from '../../exceptions/bad-request.exception';
import { validateUser } from '../../middlewares/auth.middlewares';
import { getAllCatsQueryValidator } from '../../validators/cat.validator';

const app = new Hono<HonoEnv>();

app.get('/', getAllCatsQueryValidator, (c) => {
  const body = c.req.valid('query');

  return c.json({ message: 'list cats' });
});

app.get('/:id', (c) => {
  if (c.req.param('id') === '1') {
    throw new BadRequestException('cat id 1 is not allowed');
  }
  const cats = [
    { id: 1, name: 'cat1' },
    { id: 2, name: 'cat2' },
    { id: 3, name: 'cat3' }
  ];
  return c.json(cats);
});

app.patch('/:id', (c) => {
  // sample error handling
  if (c.req.param('id') === '1') {
    throw new BadRequestException();
  }

  return c.json({ message: `get cat ${c.req.param('id')}` });
});

// for client side auth (a client calling the server)
app.post('/', validateUser, (c) => {
  return c.json('create a cat', 201);
});

export default app;

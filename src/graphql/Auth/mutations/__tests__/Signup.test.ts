import { createTestContext } from '../../../../utils/testHelpers';

const ctx = createTestContext();

test('Create a new user', async () => {
  const userResult = await ctx.client.request(`
    mutation {
      signup(email: "test@user.com", password: "12345678") {
        status
        message
      }
    }
  `);

  expect(userResult).toMatchInlineSnapshot(`
    Object {
      "signup": Object {
        "message": "Se ha creado el usuario correctamente",
        "status": 202,
      },
    }
  `);

  const persistedData = await ctx.db.user.findMany({
    select: {
      id: true,
      email: true,
    },
  });

  expect(persistedData).toMatchInlineSnapshot(`
    Array [
      Object {
        "email": "test@user.com",
        "id": 1,
      },
    ]
  `);
});

test('The user is already created', async () => {
  const userResult = await ctx.client.request(`
    mutation {
      signup(email: "test@user.com", password: "12345678") {
        status
        message
      }
    }
  `);

  expect(userResult).toMatchInlineSnapshot(`
    Object {
      "signup": Object {
        "message": "Se ha creado el usuario correctamente",
        "status": 202,
      },
    }
  `);

  const userCreated = await ctx.client.request(`
    mutation {
      signup(email: "test@user.com", password: "12345678") {
        status
        message
      }
    }
  `);

  expect(userCreated).toMatchInlineSnapshot(`
    Object {
      "signup": Object {
        "message": "Este usuario ya existe",
        "status": 404,
      },
    }
  `);
});

test('The password does not have 8 characters', async () => {
  const userResult = await ctx.client.request(`
    mutation {
      signup(email: "test@user.com", password: "123456") {
        status
        message
      }
    }
  `);

  expect(userResult).toMatchInlineSnapshot(`
    Object {
      "signup": Object {
        "message": "La contraseña debe ser mayor o igual a 8 caracteres",
        "status": 404,
      },
    }
  `);
});

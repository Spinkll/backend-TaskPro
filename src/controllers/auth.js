import { createCookies } from '../constans/createCookies.js';
import {
  getUser,
  loginUser,
  logoutUser,
  patchUsertById,
  refreshSession,
  registerUser,
} from '../services/auth.js';
import { env } from '../utils/env.js';
import { saveFileToCloundinary } from '../utils/saveFileToCloundinary.js';
import { saveFileToUploadDir } from '../utils/saveFileToUploadDir.js';

export const registerController = async (req, res) => {
  const { body } = req;
  const user = await registerUser(body);

  createCookies(user.session, res);

  res.json({
    status: 201,
    message: 'Successfully registered a user!',
    data: {
      user: {
        photo:
          'https://res.cloudinary.com/dnfxykh8j/image/upload/v1730411910/wf6g1bi1qvd7spmurqi3.png',
        name: user.user.name,
        email: user.user.email,
        id: user.user.id,
        theme: 'light',
        createdAt: user.user.createdAt,
        updatedAt: user.user.updatedAt,
      },
      token: {
        accessToken: user.session.accessToken,
      },
    },
  });
};

export const loginController = async (req, res) => {
  const { body } = req;
  const session = await loginUser(body);

  createCookies(session, res);

  res.json({
    status: 200,
    message: 'Successfully logged in an user!',
    data: { accessToken: session.accessToken },
  });
};

export const logoutController = async (req, res) => {
  await logoutUser(req.cookies.sessionId, req.cookies.sessionToken);
  res.clearCookie('sessionId');
  res.clearCookie('sessionToken');
  res.status(204).send();
};

export const refreshUserController = async (req, res) => {
  const session = await refreshSession(
    req.cookies.sessionId,
    req.cookies.sessionToken,
  );

  createCookies(session, res);

  res.json({
    status: 200,
    message: 'Successfully is refreshed!',
    data: { accessToken: session.accessToken },
  });
};

export const getUserController = async (req, res) => {
  const getingUser = await getUser(
    req.cookies.sessionId,
    req.cookies.sessionToken,
  );

  res.json({
    status: 200,
    message: 'Successfully found user!',
    data: getingUser,
  });
};

export const patchUserByIdController = async (req, res) => {
  const body = req.body;
  const photo = req.file;

  let photoUrl;
  if (photo) {
    if (env('ENABLE_CLOUDINARY') === 'true') {
      photoUrl = await saveFileToCloundinary(photo);
    } else {
      photoUrl = await saveFileToUploadDir(photo);
    }
  }

  const patchedUser = await patchUsertById(
    req.cookies.sessionId,
    req.cookies.sessionToken,
    { ...body, photo: photoUrl },
  );

  res.status(200).json({
    status: 200,
    message: 'Successfully patched a user!',
    data: patchedUser,
  });
};

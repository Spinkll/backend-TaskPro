import { Router } from "express";
import { ctrlWrapper } from "../utils/ctrlWrapper.js";
import { getUserController, loginController, logoutController, patchUserByIdController, refreshUserController, registerController } from "../controllers/auth.js";
import { validateBody } from "../middlewares/validateBody.js";
import { registerUserValidationShema } from "../validation/registerUserValidation.js";
import { loginUserValidation } from "../validation/loginUserValidation.js";
import { upload } from '../middlewares/multer.js';
import { PathUserValidationShema } from "../validation/PathUserValidation.js";

const authRouter = Router();

authRouter.post('/register', validateBody(registerUserValidationShema), ctrlWrapper(registerController));
authRouter.post('/login', validateBody(loginUserValidation), ctrlWrapper(loginController));
authRouter.post('/logout', ctrlWrapper(logoutController));
authRouter.post('/refresh', ctrlWrapper(refreshUserController));
authRouter.get('/user', ctrlWrapper(getUserController));
authRouter.patch('/user', upload.single('photo'), validateBody(PathUserValidationShema), ctrlWrapper(patchUserByIdController));

export default authRouter;
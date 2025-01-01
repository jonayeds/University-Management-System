import { Router } from 'express';

import { requestValidator } from '../../middleware/validateRequest';
import { AdminControllers } from './admin.controller';
import { AdminValidations } from './admin.validation';
import { auth } from '../../middleware/auth';
import { User_role } from '../user/user.constant';

const router = Router();

router.get('/', AdminControllers.getAllAdmin);
router.get('/:adminId', AdminControllers.getASingleAdmin);
router.patch(
  '/:adminId',
  auth(User_role.superAdmin ),
  requestValidator(AdminValidations.updateAdminValidation),
  AdminControllers.updateAdmin,
);
router.delete('/:adminId', AdminControllers.deleteAdmin);

export const AdminRoutes = router;

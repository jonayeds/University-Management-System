import { Router } from 'express';

import { requestValidator } from '../../middleware/validateRequest';
import { AdminControllers } from './admin.controller';
import { AdminValidations } from './admin.validation';

const router = Router();

router.get('/', AdminControllers.getAllAdmin);
router.get('/:adminId', AdminControllers.getASingleAdmin);
router.patch(
  '/:adminId',
  requestValidator(AdminValidations.updateAdminValidation),
  AdminControllers.updateAdmin,
);
router.delete('/:adminId', AdminControllers.deleteAdmin);

export const AdminRoutes = router;

import config from "../config"
import { User_role } from "../modules/user/user.constant"
import { User } from "../modules/user/user.model"

const superUser = {
    id:"0001",
    email:"admin@admin.com",
    password:config.super_admin_password,
    needsPasswordChange:false,
    role:User_role.superAdmin,
}

const seedSuperAdmin = async()=>{
    const isSuperAdminExists = await User.findOne({
        role:User_role.superAdmin,
    })
    if(!isSuperAdminExists){
        await User.create(superUser)
    }
}

export default seedSuperAdmin
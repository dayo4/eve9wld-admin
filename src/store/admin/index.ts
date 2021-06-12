import { reactive } from 'vue'

import { Users } from './modules/ManageUsers'
import { System } from './modules/System'

class Admin {
    $users = new Users()
    $system = new System()
}

export const $Admin = reactive(new Admin())

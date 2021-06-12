import { reactive } from 'vue'

import { TopNav } from './modules/TopNav'
import { BottomNav } from './modules/BottomNav'
import { Container } from './modules/Container'


export class Navs {
    $top = new TopNav()
    $bottom = new BottomNav()
    $container = new Container()

}

export const $Navs = reactive(new Navs())

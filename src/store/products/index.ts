/* Import other modules */
// import { Images } from './modules/Images'

import { $Axios, $Notify, $Process } from '@/plugins'
import { reactive } from 'vue'


class Products {

    data: any = null

    async fetch (payload: { id: string }) {
        $Process.add()
        try
        {
            const { data } = await $Axios.get("products/" + payload.id)
            this.data = data
            $Process.hide()
            // this.$images.fetch(true)
            return data
        } catch {
            $Process.hide()
            $Notify.error()
        }
    }

}

export const $Products = reactive(new Products())

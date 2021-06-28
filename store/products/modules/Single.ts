import { $Axios, $Process, $WooApi, $Notify } from '@/plugins'

export class SingleProduct {
    data = null
    reviews = null
    allCategories = null //fetch along all categories relating to products.

    async fetch (payload: { slug: string, id: string }) {
        $Process.add('Fetching content')
        try {
            const { data } = await $Axios.get("products/" + payload.slug)
            this.data = data.product
            this.reviews = data.reviews
            this.allCategories = data.categories
            return data
        }
        catch (e) {
            $Notify.error('Unable to get the requested page')
        }
        finally { $Process.hide() }
    }

}

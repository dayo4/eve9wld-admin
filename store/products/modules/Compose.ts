import { $Auth } from '@/store'
import { $Axios, $Process, $Notify } from '@/plugins'


export class EditProduct {
    // content = ''
    currentMode = 'new'
    productToEdit = null /* if in editing mode */
    reviews: any
    allCategories: any


    async create (payload) {
        $Process.add('Saving...')
        try {
            /* returned data will be only the 'id' of the new post */
            const { data } = await $Axios.post("products/new/" + $Auth.user.id, {
                ...payload
            })
            this.productToEdit = {
                id: data,
                title: payload.title,
                slug: payload.slug
            }
            this.currentMode = 'edit'

            $Notify.success('Product Saved.')
        }
        catch {
            $Notify.error()
        }
        finally { $Process.hide() }
    }

    /* This fetches posts for editing and update. */
    async fetch (payload: { slug: string }, preview = false) {
        $Process.add('Fetching content')
        try {
            const { data } = await $Axios.get("products/" + payload.slug)
            if (data) {
                this.currentMode = 'edit'
                this.productToEdit = data.product
                this.reviews = data.reviews
                this.allCategories = data.categories
                return data
            }
        }
        catch {
            $Notify.error()
        }
        finally { $Process.hide() }
    }

    async update (payload) {
        try {
            const { data } = await $Axios.patch('products/update', {
                ...payload,
                productsIds: [ this.productToEdit.id ]
            })

            $Notify.success('Updated!')
            return data
        }
        catch {
            $Notify.error()
        }
        finally { $Process.hide() }
    }

}

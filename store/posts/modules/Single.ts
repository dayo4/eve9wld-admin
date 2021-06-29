import { $Axios, $Process, $Notify } from '@/plugins'

export class SinglePost {
    data = null
    comments = null
    allCategories = null //fetch along all categories relating to products.

    async fetch (payload: { slug: string, id?: string }) {
        $Process.add('Fetching content')
        try {
            const { data } = await $Axios.get("posts/" + payload.slug)
            this.data = data.post
            this.comments = data.comments
            this.allCategories = data.categories
            return data
        }
        catch (e) {
            $Notify.error('Unable to get the requested page')
        }
        finally { $Process.hide() }
    }

}

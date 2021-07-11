import { $Auth } from '@/store'
import { $Axios, $Process, $Notify } from '@/plugins'


export class EditPost {
    // content = ''
    currentMode = 'new'
    postToEdit = null /* if in editing mode */
    comments: any
    allCategories: any


    async create (payload) {
        $Process.add('Saving...')
        try {
            /* returned data will be only the 'id' of the new post */
            const { data } = await $Axios.post("posts/new/" + $Auth.user.id, {
                ...payload
            })
            this.postToEdit = {
                id: data,
                title: payload.title,
                slug: payload.slug
            }
            this.currentMode = 'edit'

            $Notify.success('post Saved.')
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
            const { data } = await $Axios.get("posts/" + payload.slug)
            if (data) {
                this.currentMode = 'edit'
                this.postToEdit = data.post
                this.comments = data.comments
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
            const { data } = await $Axios.patch('posts/update', {
                ...payload,
                postsIds: [ this.postToEdit.id ]
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

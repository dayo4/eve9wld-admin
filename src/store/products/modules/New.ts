import { $Auth } from '@/store'
import { $Axios, $Process, $Notify } from '@/plugins'


export class NewProduct {
    // content = ''
    currentMode = 'new'
    contentToEdit = null /* if in editing mode */
    productImages: string[] = []

    editorConfig = [

    ]

    addImage (data: object) {
        // console.log(data)
        this.productImages = data as any
    }

    async newProduct (payload: { title: string, slug: string, content: string }) {
        try
        {
            /* returned data will be only the 'id' of the new post */
            const { data } = await $Axios.post("posts/new/" + $Auth.user.id, {
                ...payload
            })
            this.contentToEdit = {
                id: data,
                title: payload.title,
                slug: payload.slug
            }
            this.currentMode = 'edit'
            // if (this.productImages.formData)
            // {
            //     this.uploadImages(this.productImages.formData)
            // }

            // this.productImages. = null
            $Notify.success('Content Saved.')

            $Process.done()
        }
        catch {
            $Notify.error()
            $Process.abort()
        }
    }

    /* This fetches posts for editing and update. */
    async fetchForEditing (payload: { slug: string }, preview = false) {
        $Process.add('Fetching content')
        try
        {
            const { data } = await $Axios.get("posts/" + payload.slug + '/' + (preview ? 'preview' : ''))
            if (data)
            {
                this.contentToEdit = data
                this.currentMode = 'edit-post'
                this.productImages = data.images
                return data
            }
        }
        catch {
            $Notify.error()
        }
        finally { $Process.hide() }
    }

    async update (payload: { name: string, slug: string, content: string }) {
        // this.currentPost_id
        try
        {
            const { data } = await $Axios.patch('posts/' + $Auth.user.id, {
                ...payload,
                productsIds: [ this.contentToEdit.id ]
            })
            if (data)
                // if (this.productImages.formData)
                // {
                //     this.uploadImages(this.productImages.formData)
                // }
            $Notify.success('Updated!')
            return data
        }
        catch {
            $Notify.error()
        }
        finally { $Process.hide() }
    }

    async uploadImages (formData: FormData[]) {
        try
        {
            const { data } = await $Axios.patch('posts/uploadImages/' + this.contentToEdit.id + '/' + $Auth.user.id,
                formData
            )
            if (data)
            {
                $Notify.success('Uploaded!')
                return data
            }
        }
        catch {
            $Notify.error()
            $Process.hide()
        }
    }

    async removeImages (payload: string[]) {
        try
        {
            const deleted = await
                $Axios.patch('posts/deleteImages/' + $Auth.user.id, {
                    imageUrls: payload
                })
            if (deleted)
                $Notify.success('Deleted!')

        }
        catch {
            $Notify.error()
        }
    }

}

/* Import other modules */

import { $Axios, $Notify, $Process } from '@/plugins'
import { $Auth } from '@/store'
import { reactive } from 'vue'


class MediaLibrary {
    // data: any = null

    async uploadImage (formData: FormData) {
        try {
            const { data } = await $Axios.post('login' + $Auth.user.id,
                formData
            )
            console.log('kjbhbhjbkj,b')
            if (data) {
                $Notify.success('Uploaded!')
                return data
            }
        }
        catch {
            $Notify.error()
            $Process.hide()
        }
    }

    async updateImage (imageData: { id: any }) {
        try {
            const { data } = await $Axios.patch('lib/updateImage/' + imageData.id,
                imageData
            )
            if (data) {
                $Notify.success('Updated!')
                return data
            }
        }
        catch {
            $Notify.error()
            $Process.hide()
        }
    }

    async deleteImage (payload: string[]) {
        try {
            const deleted = await
                $Axios.patch('lib/deleteImages/' + $Auth.user.id, {
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

export const $MediaLibrary = new MediaLibrary()

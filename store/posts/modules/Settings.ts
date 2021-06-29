import { $Auth } from '@/store'
import { $Axios, $Process, $Notify } from '@/plugins'

export class Settings {
    // posts: Array<object> = []
    // postsCount: number = 0

    async delete (payload: { postsIds: string[] }) {
        $Process.add('Deleting')
        try {
            const { data } = await
                $Axios.delete('posts/delete', {
                    data: payload
                })
            if (data) {
                $Notify.success(data)/* leave as is! */
                $Process.hide()
            }
            return data
        }
        catch (error) {
            $Notify.error(error)
            $Process.hide()
        }
    }

    async update (payload: { postsIds: string[], data: {} }) {
        $Process.add('Updating')
        try {
            const { data } = await $Axios.patch('posts/update', {
                ...payload
            })
            if (data) {
                $Notify.success(data)
                $Process.hide()
                return data
            }
        }
        catch {
            $Notify.error()
            $Process.hide()
        }

    }

}

/* Import other modules */

import { $Axios, $Notify, $Process } from "@/plugins"
import { $Auth } from "@/store"
import Vue from "vue"

class MediaLibrary {
  formData: any = null;
  images: [ {} ]
  count: 0

  async fetchImages (query: Query = {}) {
    try {
      $Process.add('fetching Files...')

      const { data } = await $Axios.get("lib/fetchImages/" + JSON.stringify(query))

      if (data) {
        this.images = data.images
        this.count = data.count
        // $Notify.success("Uploaded!")
        $Process.hide()
        return data
      }
    } catch {
      $Notify.error()
      $Process.hide()
    }
  }

  async uploadImage () {
    try {
      $Process.add('Uploading File...')
      const { data } = await $Axios.post("lib/uploadImage/" + $Auth.user.id /* + "/" + JSON.stringify(this.query) */,
        this.formData,
        {
          onUploadProgress: (progressEvent) => {
            $Process.progressTotal = progressEvent.total
            $Process.progressElapsed = Math.round((progressEvent.loaded / progressEvent.total) * 100)
          },
        })
      if (data) {
        $Notify.success("Uploaded!")
        $Process.hide()
        return data
      }
    } catch {
      $Notify.error()
      $Process.hide()
    }
  }

  async updateImage (imageData: { id: any }) {
    try {
      const { data } = await $Axios.patch(
        "lib/updateImage/" + imageData.id,
        imageData
      )
      if (data) {
        $Notify.success("Updated!")
        return data
      }
    } catch {
      $Notify.error()
      $Process.hide()
    }
  }

  async deleteImage (payload: string[]) {
    try {
      const deleted = await $Axios.patch("lib/deleteImages/" + $Auth.user.id, {
        imageUrls: payload
      })
      if (deleted) $Notify.success("Deleted!")
    } catch {
      $Notify.error()
    }
  }
}

export const $MediaLibrary = Vue.observable(new MediaLibrary())

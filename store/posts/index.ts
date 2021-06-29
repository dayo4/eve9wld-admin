/* Import other modules */
import { EditPost } from "./modules/Compose"
import { SinglePost } from "./modules/Single"
import { Settings } from "./modules/Settings"

import { $Axios, $Notify, $Process } from "@/plugins"
import Vue from "vue"

class Posts {
  $edit = new EditPost();
  $single = new SinglePost()
  $settings = new Settings()

  data: object[] = null;
  count = 0

  async fetchAll (query: Query) {

    try {
      const { data } = await $Axios.get(`posts/all/${JSON.stringify(query)}`)

      this.data = data.posts
      this.count = data.count
      return data
    }
    catch {
      $Notify.error()
    }
  }
}

export const $Posts = Vue.observable(new Posts())

/* Import other modules */
import { EditProduct } from "./modules/Compose"
import { SingleProduct } from "./modules/Single"
import { Settings } from "./modules/Settings"

import { $Axios, $Notify, $Process } from "@/plugins"
import Vue from "vue"
import Query from "@/types"

class Products {
  $edit = new EditProduct();
  $single = new SingleProduct()
  $settings = new Settings()

  data: object[] = null;
  count = 0

  async fetchAll (query: Query) {

    try {
      const { data } = await $Axios.get(`products/all/${JSON.stringify(query)}`)

      this.data = data.products
      this.count = data.count
      return data
    }
    catch {
      $Notify.error()
    }
  }
}

export const $Products = Vue.observable(new Products())

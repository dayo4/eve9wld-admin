<template>
  <article class="Tab xs12">
    <h2 class="text-center t-blue-grey--1">All Products</h2>

    <section
      class="Quickview flex wrap a-i-center j-c-center xs12 sm9 md7 t-white"
    >
      <div class="xs11 sm6">
        <div class="text-center br2 m-6">
          <h3 class="bg-green p-4">Add New Product</h3>
          <p class="icon-check t-green m-4"></p>
        </div>
      </div>
      <div class="xs11 sm6">
        <div class="text-center br2 m-6">
          <h3 class="bg-light-blue p-4">All Products</h3>
          <p class="t-light-blue m-4">354</p>
        </div>
      </div>
    </section>

    <section class="DtCtrlBox">
      <div class="Divi">
        <section class="">
          <select v-model="query.limit" class="mr-2">
            <option selected :value="20">20</option>
            <option :value="50">50</option>
            <option :value="100">100</option>
            <option :value="'all'">All</option>
          </select>
        </section>

        <section class="flex a-i-center">
          <input
            class="Search"
            type="search"
            name="searchProducts"
            placeholder="search"
          />
          <button
            class="icon-search-2 btn bg-white py-2 t-grey shadow-0"
          ></button>
        </section>
      </div>

      <div class="Divi">
        <section class="flex">
          <select v-model="bulkAction" class="mr-2">
            <option value="-1">Bulk Actions</option>
            <option value="delete">Delete</option>
            <option value="publish">Publish</option>
            <option value="archive">Archive</option>
            <option value="draft">Draft</option>
          </select>
          <button @click="applyBulkAction" class="btn bg-cyan--4 shadow-0">
            Apply
          </button>
        </section>

        <section class="flex a-i-center">
          <select @change="setFilters" name="status" class="mr-1">
            <option selected>All Items</option>
            <option value="draft">Draft</option>
            <option value="published">Published</option>
            <option value="pending">Pending</option>
            <option value="archived">Archived</option>
          </select>
          <select v-model="query.sort" name="filter" class="mr-1">
            <option :value="['created_at', 'desc']">
              Newest First
            </option>
            <option :value="['created_at', 'asc']">
              Oldest First
            </option>
          </select>
          <button @click="applyFilters" class="btn bg-cyan--4 shadow-0">
            Filter
          </button>
        </section>

        <section class="px-4 py-2">{{ count }} items</section>
      </div>
    </section>

    <section>
      <table class="DtTable">
        <thead>
          <tr>
            <td><input type="checkbox" /></td>
            <th scope="col" width="40%">Product Name</th>
            <th scope="col">Price</th>
            <th scope="col">Category</th>
            <th scope="col">Date</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(product, i) in products" :key="i">
            <th><input type="checkbox" @change="checkBox(product.id)" /></th>
            <td>
              {{ product.name }}
            </td>
            <td>{{ product.sale_price }}</td>
            <td>{{ product.categories }}</td>
            <td>{{ product.updated_at }}</td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <td><input type="checkbox" /></td>
            <td colspan="3"></td>
            <td></td>
          </tr>
        </tfoot>
      </table>
    </section>
  </article>
</template>
<script lang="ts">
import Vue from "vue";

import { $Products } from "@/store";
// import { $Confirm } from "@/plugins";

export default Vue.extend({
  data() {
    return {
      checkedProducts: [],
      bulkAction: "-1",
      query: {
        limit: 20,
        offset: 0,
        sort: ["created_at", "desc"],
        filter: {}
      }
    };
  },

  computed: {
    products: () => $Products.data,
    count: () => $Products.count
  },

  methods: {
    checkBox(product_id) {
      // let tg = e.target;
      // let product_id = tg.getAttribute("data-checked");
      let index = this.checkedProducts.indexOf(product_id);
      // tg.classList.toggle("icon-check-1");
      if (index != -1) this.checkedProducts.splice(index, 1);
      else this.checkedProducts.push(product_id);
      console.log(this.checkedProducts);
    },

    applyBulkAction() {
      switch (this.bulkAction) {
        case "delete":
          $Products.$settings.delete(this.checkedProducts);
          break;
        case "publish" || "draft" || "archive":
          $Products.$settings.update({
            productsIds: this.checkedProducts,
            data: { status: this.bulkAction }
          });
          break;
      }
    },

    setFilters(event) {
      const tg = event.target;
      if (tg.value) this.query.filter[tg.name] = tg.value;
      else delete this.query.filter[tg.name];
    },

    applyFilters() {
      $Products.fetchAll(this.query);
    }
  },

  mounted() {
    $Products.fetchAll(this.query);
  }
});
</script>
<style lang="scss">
// .QuickView {

// }
.DtCtrlBox {
  background-color: $grey-2;
  color: $blue-grey--1;
  & > .Divi {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    padding: 8px 16px;
    margin: 0 8px;
  }
  & .Search {
    width: 150px;
    background-color: white;
    border-radius: 4px;
    padding: 7px;
  }
}
// .DtContainer {
//     padding: 10px;
// }

.DtTable {
  width: 100%;
  border-collapse: collapse;
  border: 1.5px solid #f1f3f5;
  letter-spacing: 1px;
  font-size: 0.8rem;
  padding: 10px;
  text-align: left;
  border-radius: 10px;

  & input[type="checkbox"],
  & input[type="checkbox"] {
    width: 1.3em;
    height: 1.3em;
  }
  & td,
  & th {
    /* border: 1px solid rgb(190, 190, 190); */
    padding: 10px;
  }
  & tbody {
    color: $blue-grey--2;
    // border-top: solid 2px rgb(200, 200, 200);
  }
  & thead,
  & tfoot {
    height: 0px !important;
    font-weight: bold;
    background-color: #f1f3f5;
    color: $blue-grey;
  }
  & tfoot {
    border-radius: 0 0 10px 10px;
  }
  & thead {
    border-radius: 10px 10px 0 0;
  }
}
</style>

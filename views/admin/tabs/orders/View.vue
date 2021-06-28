<template>
  <article class="Tab xs12">
    <h2 class="text-center t-blue-grey--1">View Order Detail</h2>

    <section
      class="Quickview flex wrap a-i-center j-c-center xs12 sm9 md7 t-white"
    >
      <div class="xs11 sm6">
        <div class="text-center br2 m-6">
          <h3 class="bg-green p-4">Payment</h3>
          <p class="icon-check t-green m-4">wed, oct 21, 21</p>
        </div>
      </div>
      <div class="xs11 sm6">
        <div class="text-center br2 m-6">
          <h3 class="bg-light-blue p-4">Delivered</h3>
          <p class="t-light-blue m-4">wed, oct 21, 21</p>
        </div>
      </div>
      <div class="xs11 sm6">
        <div class="text-center br2 m-6">
          <h3 class="bg-light-blue p-4">Some detail</h3>
          <p class="t-light-blue m-4">354</p>
        </div>
      </div>
    </section>

    <section class="DtCtrlBox">
      <div class="Divi">
        <section class="">
          <select name="perPage" class="mr-2">
            <option value="10">10</option>
            <option value="20">50</option>
            <option value="30">100</option>
            <option value="all">All</option>
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
          <select name="action" class="mr-2">
            <option value="-1">Bulk Actions</option>
            <option value="edit">Edit</option>
          </select>
          <button class="btn bg-cyan--4 shadow-0">Apply</button>
        </section>

        <section class="flex a-i-center">
          <select name="filter" class="mr-1">
            <option value="-1">All Items</option>
            <option value="mine">Mine Only</option>
            <option value="mine">Published</option>
            <option value="mine">drafts</option>
          </select>
          <select name="filter" class="mr-1">
            <option value="-1">All Categories</option>
            <option value="edit">Others</option>
          </select>
          <button class="btn bg-cyan--4 shadow-0">Filter</button>
        </section>

        <section class="px-4 py-2">5 items</section>
      </div>
    </section>

    <section>
      <table class="DtTable">
        <thead>
          <tr>
            <td><input type="checkbox" /></td>
            <th scope="col">ID</th>
            <th scope="col">Product Name</th>
            <th scope="col">Unit Cost</th>
            <th scope="col">Qty</th>
            <th scope="col">Price($)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th><input type="checkbox" /></th>
            <td>
              yga44545sas
            </td>
            <td>Paypal</td>
            <td>356</td>
            <td><i class="bg-red t-white p-1">Canceled</i></td>
            <td>Nov 29, 2021</td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <td><input type="checkbox" /></td>
            <td colspan="3">SUM</td>
            <td>118</td>
          </tr>
        </tfoot>
      </table>
    </section>

    <section>
      <h3 class="icon-edit p-3 bg-blue-grey-4 t-blue-grey">
        billing details(23)
      </h3>
    </section>
    <section>
      <h3 class="icon-doc p-3 bg-blue-grey-4 t-blue-grey">Log Messages</h3>
      <table class="m-3 p-3">
        <tbody>
          <tr>
            <td class="bg-light-blue t-white p-1 m-1">Order</td>
            <td class="t-blue-grey p-1 text-center m-1">Oct 23, thur 2021</td>
            <td class="t-light-blue p-1 m-1">Support</td>
            <td class="t-green p-1 m-1">Order completed</td>
          </tr>
          <tr>
            <td class="bg-red t-white p-1 m-1">Email</td>
            <td class="t-blue-grey p-1 text-center m-1">Oct 23, thur 2021</td>
            <td class="t-light-blue p-1 m-1">Support</td>
            <td class="icon-alert-danger t-green p-1 m-1">
              Missing payment details. Email was sent and awaiting for payment
              before processing
            </td>
          </tr>
          <!-- ... -->
        </tbody>
      </table>
    </section>
  </article>
</template>
<script lang="ts">
import Vue from "vue";

import { $Admin, $Auth } from "@/store";
import { $Confirm } from "@/plugins";

export default Vue.extend({
  data() {
    return {
      allowReg: null as boolean
    };
  },

  computed: {
    isSAdmin: (): boolean => $Auth.isSAdmin,
    settings: () => $Auth.sysSettings
  },

  methods: {
    saveChanges() {
      let _this = this;
      if (this.isSAdmin)
        $Confirm({
          header: "Save Settings",
          message: `<b>Confirm?</b>`,
          type: "info",
          onConfirm: function() {
            return $Admin.$system
              .update({
                allow_new_reg: _this.allowReg
              })
              .then(done => {
                if (done) {
                  $Auth.getSysSettings();
                  return done;
                }
              });
          }
        });
    }
  },

  mounted() {
    // this.allowReg = this.settings.allow_new_reg
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

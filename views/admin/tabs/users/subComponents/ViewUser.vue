<style lang="scss" scoped>
img {
  margin-top: 4px;
  min-width: 150px;
  min-height: 150px;
  border: solid rgba(175, 175, 175, 0.39) 4px;
  border-radius: 100%;
}

.History > div {
  border-bottom: 1px solid grey;
}

.QuickDetails {
  & p {
    padding: 4px;
    margin: 4px 0;
  }
  & p:not(even) {
    background-color: $grey-4;
  }
  // & p:nth-of-type(odd) {
  //     background-color: $grey-4;
  // }
}

.QuickStats {
  & .Icon {
    background-color: $light-blue;
    color: white;
    font-size: 30px;
    height: 45px;
    width: 45px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>

<template>
  <div>
    <section>
      <!-- Header Section -->
      <h3
        class="Head flex a-i-center j-c-between shadow-1 bg-pink-1 t-white font-7 p-2 noselect br2"
      >
        <span class="Header text-up font-5">User Details</span>
        <div class="Actions flex">
          <div class="labeled-action" @click="$emit('closeUser')">
            <span class="icon-left-open-big font-10"></span>
            <span>Back</span>
          </div>
          <!-- DROPDOWN COMPONENT-->
          <Dropdown
            :ownID="user.id"
            :pos="{ type: 'relative', top: 6, right: 0 }"
            :optPos="{ right: 40 }"
            class="Dropdomn icon-ellipsis-vert shadow-0 btn t-white bg-blue-grey font-10"
            style="width:30px;"
          >
            <!-- slots -->
            <template v-slot:default>
              <router-link
                :to="{
                  name: 'profile',
                  params: { username: user.username }
                }"
                target="_blank"
              >
                <span class="icon-user"></span>
                <span>View Profile</span>
              </router-link>
              <a @click="changeAccess(user.id)">
                <span class="icon-ccw"></span>
                <span>Change Access</span>
              </a>
              <a @click="modal = true">
                <span class="icon-recycle"></span>
                <span>Change Account Status</span>
              </a>
              <a v-if="isSAdmin" @click="del(user.id)">
                <span class="icon-trash-empty t-red"></span>
                <span>Delete</span>
              </a>
            </template>
          </Dropdown>
        </div>
      </h3>

      <div class="Body t-blue-grey">
        <img
          :src="$userBaseUrl + user.profile_image"
          :alt="user.username"
          class="mr-6"
          width="150"
          height="150"
        />
        <div class="Details ml-10 pl-5">
          <div class="mb-4" v-for="(item, key, index) in user" :key="index">
            <div v-if="key !== 'history'">
              <span class="font-6 bold-4">{{ key }}:</span>
              <span class="font-5 bold-2">{{ " " + item }}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="flex wrap">
      <!-- Main Section (1)-->
      <article class="xs11 lg6 pr-2">
        <section class="text-center">
          <h3 class="p-3 bg-blue-grey-4 t-blue-grey">User quick Info</h3>
          <div class="flex j-c-center">
            <img
              :src="$userBaseUrl + user.profile_image"
              :alt="user.username"
              class="mr-6"
              width="150"
              height="150"
            />
          </div>
          <h3>Adigun Alapomerin</h3>
          <div class="QuickDetails flex j-c-center">
            <div class="xs6 text-right">
              <p>Title</p>
              <p>Date of birth</p>
              <p>Registration Date</p>
              <p>Last Visit</p>
              <p>Language</p>
              <p>Subscriptions</p>
              <p>Status</p>
            </div>
            <div cllass="xs6">
              <p>Mr</p>
              <p>Nov 2, 2021</p>
              <p>som edate</p>
              <p>a date</p>
              <p>English</p>
              <p>Newsletter</p>
              <p><i class="icon-check bg-green t-white p-1">Active</i></p>
            </div>
          </div>
        </section>

        <section>
          <h3 class="icon-edit p-3 bg-blue-grey-4 t-blue-grey">
            User quick Stats
          </h3>
          <div>
            <section v-for="i in 5" :key="i" class="QuickStats">
              <div class="text-right">
                <h3>$ 2,456</h3>
                <small>Orders Value</small>
              </div>
              <div class="Icon">
                <i class="icon-edit"></i>
              </div>
            </section>
          </div>
        </section>
      </article>

      <!-- Main Section (2)-->
      <article class="xs11 lg6 pl-2">
        <section>
          <h3 class="icon-edit p-3 bg-blue-grey-4 t-blue-grey">Orders (23)</h3>
          <!-- Create a table here [items, price, status, payment method, date ]-->
        </section>
        <section>
          <h3 class="icon-edit p-3 bg-blue-grey-4 t-blue-grey">
            Products in cart (23)
          </h3>
          <!-- Create a table here [items, price, status, date ]-->
        </section>
        <section>
          <h3 class="icon-edit p-3 bg-blue-grey-4 t-blue-grey">
            Customer Addresses/billing details(23)
          </h3>
        </section>
        <!-- Add other stuffs -->
      </article>
    </section>

    <!-- Footer Section -->
    <article>
      <section class="History">
        <h3 class="icon-user p-3 bg-blue-grey-4 t-blue-grey">
          User's Account Status History
        </h3>

        <div v-for="(h, index) in user.history" :key="index" class="my-2 py-2">
          <h3 class>{{ h.type }}</h3>
          <div>{{ $moment(h.created_at).format("llll") }}</div>
          <div>{{ h.reason }}</div>
        </div>
      </section>
      <section class="History">
        <h3 class="icon-user p-3 bg-blue-grey-4 t-blue-grey">
          Admin Private Notes
        </h3>
        <div>
          <div
            ref="about"
            @input="setAbout"
            contenteditable="true"
            placeholder="Product short description"
          ></div>
        </div>
      </section>
    </article>

    <!-- Account Status Update COMPONENT -->
    <AccStatusUpdate
      :user="user"
      :show="modal"
      @close="closeModal"
    ></AccStatusUpdate>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import AccStatusUpdate from "./AccStatusUpdate.vue";

import { $Auth, $Profile, $Admin } from "@/store";
import { $Confirm } from "@/plugins";

export default Vue.extend({
  components: {
    AccStatusUpdate,
    Dropdown: () => import("@/components/GlobalComponents/utils/Dropdown.vue")
  },
  data() {
    return {
      modal: false /* Disable Account Modal  */
    };
  },
  props: {
    user: {
      required: true,
      type: Object
    }
  },
  computed: {
    isSAdmin: (): boolean => $Auth.isSAdmin
  },
  methods: {
    closeModal(refresh?: boolean) {
      this.modal = false;
      if (refresh) this.$emit("refresh", this.user.id);
    },

    del(user_id) {
      let _this = this;
      if (this.isSAdmin)
        $Confirm({
          header: "Delete Account",
          message: `<b>Confirm?</b>`,
          type: "danger",
          onConfirm: function() {
            return $Admin.$users.delete(user_id).then(data => {
              if (data) {
                _this.$emit("closeUser", true);
                return true;
              }
            });
          }
        });
    },

    changeAccess() {}
  }
});
</script>

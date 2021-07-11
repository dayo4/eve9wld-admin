<style lang="scss" scoped>
.LibModal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 10px 16px;
  z-index: 10;
  overflow-y: scroll;
  overflow-x: hidden;
  background-color: white;
  // background-color: rgba(87, 84, 84, 0.712);
  // .Head {}
  .Tabs > section {
    text-align: center;
    font-weight: bold;
    font-size: 18px;
    cursor: pointer;
    padding: 20px 5px;
    border-radius: 28px 28px 3px 3px;
    transition: background-color 0.3s;
  }

  .Body {
    display: flex;
    flex-wrap: wrap;
    .GridView {
      max-height: 700px;
      overflow-y: scroll;
      padding: 9px;
      border-radius: 5px;
      border: solid 2px $cyan;
    }
    .Img {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      padding-top: 100%;
      margin: 8px 4px 4px 8px;
      & i {
        //custom checkbox
        position: absolute;
        top: -10px;
        right: -10px;
        height: 25px;
        width: 25px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        border: solid 2px $pink--2;
        border-radius: 8px;
        font-size: 18px;
        background-color: white;
        color: $pink--2;
      }
    }
    img {
      position: absolute;
      top: 0;
      bottom: 0;
    }
    // }
  }

  // .Foot {}
}
.LibModalClose {
  position: fixed;
  top: -13px;
  right: -13px;
  height: 70px;
  width: 70px;
  padding: 10px 35px 0 0;
  // display: flex;
  // align-items: center;
  // justify-content: center;
  cursor: pointer;
  border: solid 2px white;
  border-radius: 50%;
  font-size: 45px;
  background-color: $pink--2;
  color: white;
}
@include xs-only {
  .LibModal {
    padding: 10px 5px;
  }
  .GridView {
    max-height: 400px;
  }
  .Tabs > section {
    font-size: 12px !important;
  }
}
</style>

<template>
  <transition name="slide-fade">
    <article v-if="show === true" class="LibModal">
      <h2 class="m-2 px-5 text-center">MANAGE MEDIA FILES</h2>
      <!-- TABS -->
      <div class="Tabs nowrap flex p-1">
        <section
          @click="uploadMode = true"
          class="xs6"
          :class="!uploadMode ? 't-white bg-cyan--3' : ''"
        >
          UPLOAD NEW
        </section>
        <section
          @click="uploadMode = false"
          class="xs6"
          :class="uploadMode ? 't-white bg-cyan--3' : ''"
        >
          MANAGE FILES
        </section>
      </div>

      <!-- MANAGE MEDIA FILES <TAB> -->
      <transition name="slide-fade">
        <div class="Tab_1" v-if="!uploadMode">
          <!-- Header -->
          <section class="Head">
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
                    <option value="delete">delete</option>
                  </select>
                  <button
                    @click="applyBulkAction"
                    class="btn bg-cyan--4 shadow-0"
                  >
                    Apply
                  </button>
                </section>
                <section></section>
                <section class="flex a-i-center">
                  <select name="filter" class="mr-1">
                    <option value="-1">All Dates</option>
                    <option value="mine">This Month</option>
                    <option value="mine">Last</option>
                    <option value="mine">feb 2021</option>
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
          </section>

          <!-- Body -->
          <section class="Body">
            <div class="xs12 sm8 md9 lg10">
              <!-- Table View -->
              <!-- <section>
            <table class="DtTable">
                <thead>
                    <tr>
                        <td>
                            <input type="checkbox" />
                        </td>
                        <th scope="col">thumbnail</th>
                        <th scope="col">name</th>
                        <th scope="col">author</th>
                        <th scope="col">Uploaded To</th>
                        <th scope="col">date</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th>
                            <input type="checkbox" />
                        </th>
                        <td>
                            Hairdresser
                        </td>
                        <td>12/09</td>
                        <td>Great idea</td>
                        <td>30</td>
                        <td>30</td>
                    </tr>
                </tbody>
            </table>
        </section> -->

              <!-- Grid view -->
              <section class="GridView flex wrap m-3">
                <div
                  v-for="(image, i) in images"
                  :key="i"
                  class="xs6 sm4 md3 lg2"
                >
                  <div class="Img">
                    <img @click="selectImage(image)" :src="image.url" />
                    <i @click="checkBox" :data-checked="image.url"></i>
                  </div>
                </div>
              </section>
            </div>

            <div class="xs12 sm4 md3 lg2">
              <section class="">
                <h3 class="t-blue-grey">Attachment details</h3>
                <div class="Img">
                  <img :src="selectedImage.url || '/defaults/pgs/ph.png'" />
                </div>
                <h5 class="my-2">
                  Name:
                  {{ selectedImage.name || "" }}
                </h5>
                <div>
                  Last Modified:
                  {{ selectedImage.date || "" }}
                </div>
                <div>Image size</div>
                <div>Image dimentions</div>
                <a class="no-deco t-blue m-1 mr-3" href="#">Edit Image</a>
                <a class="no-deco t-red m-1" href="#">Delete Image</a>
              </section>
              <hr />
              <section>
                <h3 class="mr-2 mb-2">Image Url</h3>
                <input
                  class="p-4 mb-2 w-full"
                  type="text"
                  :value="selectedImage.url"
                />
                <div class="flex a-i-center"></div>
                <button @click="copyUrl" class="btn bg-white t-blue p-2 mr-3">
                  Copy Url
                </button>
                <button
                  @click="$emit('selected', selectedImage.url, triggeredBy)"
                  class="btn shadow-0 p-2"
                >
                  Select Image
                </button>
              </section>
            </div>
          </section>
        </div>
      </transition>
      <!-- MANAGE MEDIA FILES <TAB> -->

      <!-- UPLOAD NEW MEDIA FILES <TAB> -->
      <transition name="slide-fade">
        <div class="Tab_2" v-if="uploadMode">
          <section class="flex j-c-center">
            <button
              @click="triggerImageEditor"
              class="btn bg-cyan font-6 my-3 p-3 b4"
            >
              Select Image From Device
            </button>
          </section>
          <section
            class="flex a-i-center text-center m-4 p-4 bg-grey-1 font-6"
            style="height: 300px"
          >
            <div class="w-full bold-3">
              DRAG AND DROP IMAGE FILES HERE TO UPLOAD
            </div>
          </section>
        </div>
      </transition>
      <!-- UPLOAD NEW MEDIA FILES <TAB> -->

      <!-- IMAGE LIBRARY CLOSE BUTTON -->
      <i @click="$emit('closed')" class="LibModalClose icon-cancel shadow-3"></i
      ><!-- absolute positioned close button for the modal -->
      <!-- IMAGE LIBRARY CLOSE BUTTON -->

      <!-- IMAGE EDITOR COMPONENT -->
      <ImageTransformer
        @ready="imageReady"
        @upload="uploadImage"
        ref="imageTransformer"
        fieldName="image"
        :cropWidth="600"
        :cropHeight="350"
      />
      <!-- IMAGE EDITOR COMPONENT -->
    </article>
  </transition>
</template>

<script lang="ts">
import Vue from "vue";
import { $MediaLibrary } from "@/store";

export default Vue.extend({
  components: {
    ImageTransformer: () => import("@/components/uploads/ImageTransformer.vue")
  },
  props: {
    show: {
      required: true,
      type: Boolean
    },
    triggeredBy: {
      required: false,
      type: String
    }
  },

  data() {
    return {
      showEditor: false,
      uploadMode: false,
      checkedImages: [],
      selectedImage: {},
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
    formData: () => $MediaLibrary.formData,
    images: () => $MediaLibrary.images,
    count: () => $MediaLibrary.count
  },

  methods: {
    checkBox(e) {
      let tg = e.target;
      let attr = tg.getAttribute("data-checked");
      let index = this.checkedImages.indexOf(attr);
      tg.classList.toggle("icon-check-1");
      if (index != -1) this.checkedImages.splice(index, 1);
      else this.checkedImages.push(attr);

      // this.imageSrc = tg.parentNode.firstChild.getAttribute("src");
    },
    selectImage(image) {
      let splitUrl: string[] = image.url.split("/");
      this.selectedImage = {
        url: image.url,
        name: splitUrl[splitUrl.length - 1],
        date: this.$moment(image.updated_at).format("MMM Do YY, h:mm a")
      };
    },

    copyUrl(e) {
      const copyTarget = e.target.parentNode.children[1];
      copyTarget.select();
      document.execCommand("copy");
      // e.target.append()
    },

    imageReady(formData: FormData, options: object) {
      $MediaLibrary.formData = formData;
    },
    uploadImage() {
      $MediaLibrary.uploadImage().then(data => {
        if (data) this.fetchImages();
      });
    },

    triggerImageEditor() {
      this.$refs.imageTransformer.trigger();
    },

    fetchImages() {
      $MediaLibrary.fetchImages(this.query);
    },

    applyBulkAction() {
      if (this.bulkAction === "delete") {
        $MediaLibrary.deleteImage(this.checkedImages);
      }
    },
    applyFilters() {
      this.fetchImages();
    }
  },
  mounted() {
    this.fetchImages();
  }
});
</script>

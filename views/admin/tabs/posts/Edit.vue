<style lang="scss" scoped>
.MainBoxCont {
  & .TextFeilds {
    border-bottom: 1.5px solid grey;
    div {
      display: flex;
      flex-wrap: wrap;
      margin: 14px 0;
    }
    & input[type="text"] {
      border: solid 1.5px $blue-grey-2;
      border-radius: 4px;
      padding: 7px;
    }
    label {
      font-weight: bold;
      margin: 2px 10px 5px 0;
    }
  }
  .Categ {
    // input[type="checkbox"] {
    //   width: 1.3em;
    //   height: 1.3em;
    //   border: solid 1px grey;
    // }
    & > div {
      max-height: 150px;
      overflow-y: scroll;
      display: flex;
      align-items: center;
    }
  }
  .Tags {
    margin: 8px 0;
    padding: 8px 8px 4px 12px;
    // color: $blue-grey;
    border: 1px solid currentColor;
    border-radius: 12px;
    .Slot {
      display: flex;
      flex-wrap: wrap;
      font-size: 18px;
      padding: 12px 0;
      max-height: 150px;
      overflow-y: scroll;
      & > span {
        margin: 8px;
        padding: 8px 4px 8px 8px;
        background-color: white;
        color: $cyan;
        border-radius: 28px;
        border: 2px solid $cyan;
        & > span {
          cursor: pointer;
          color: $pink;
          border-radius: 28px;
          border: 2px solid $pink;
          padding: 4px;
        }
      }
    }
    .Input {
      display: flex;
      button {
        color: white;
        background-color: $grey;
        padding: 8px;
        box-shadow: none;
      }
    }
  }
}

.AltBoxCont {
  // color: $blue-grey;
  .Images {
    margin: 8px 0;
    padding: 8px 8px 4px 12px;
    // color: $blue-grey;
    border: 1px solid currentColor;
    border-radius: 12px;
  }
  .GalleryImgBox {
    max-height: 400px;
    overflow: scroll;
  }
  .featuredImg,
  .GalleryImg {
    position: relative;
    // display: flex;
    // align-items: center;
    // justify-content: center;
    padding-top: 150px;
    margin: 8px 4px 4px 8px;
    height: 150px;
    width: 150px;
    // border-radius: 8px;
    // overflow: hidden;
    img {
      position: absolute;
      top: 0;
      bottom: 0;
    }
    i {
      position: absolute;
      top: -10px;
      right: -10px;
      height: 25px;
      width: 25px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      border: solid 1px $pink--2;
      border-radius: 8px;
      font-size: 18px;
      background-color: white;
      color: $pink--2;
    }
  }
}
@include md-and-up {
  .AltBoxCont {
    padding-left: 16px;
  }
}
</style>

<template>
  <div>
    <h2 class="text-center t-blue-grey--1">
      {{ currentMode == "new" ? "Add New Post" : "Edit Post" }}
    </h2>

    <article class="flex wrap pl-5 pr-4">
      <section class="MainBoxCont xs12 md8">
        <div class="TextFeilds my-2 t-blue-grey">
          <div>
            <label>Title</label>
            <input
              class="xs12"
              type="text"
              placeholder="Enter Product Name"
              v-model="title"
              @input="setSlug"
            />
          </div>
          <div>
            <label>Slug</label>
            <input
              class="xs12"
              type="text"
              placeholder="Product slug/permalink"
              v-model="slug"
              @input="setSlug"
            />
          </div>
        </div>

        <div class="my-2">
          <h3 class="t-blue-grey mt-5 mb-1">Post Content</h3>
          <div>
            <Composer
              @contentUpdated="setContent"
              :initialContent="postToEdit ? postToEdit.description : null"
              ref="composer"
            >
            </Composer>
          </div>
        </div>

        <div class="my-2">
          <h3 class="mt-5 mb-1">Excerpt</h3>
          <div>
            <div
              ref="excerpt"
              class="b4"
              contenteditable="true"
              placeholder="Product short description"
              @input="setExcerpt"
            ></div>
          </div>
        </div>

        <div class="Categ my-4 p-4 b1 br3">
          <h3 class="mb-3 mt-0">Categories</h3>
          <div v-for="i in 5">
            <input class="mr-2" type="checkbox" name="cat1" value="cat1" />
            <label>Category {{ i }}</label>
          </div>
        </div>

        <div class="Tags">
          <h3 class="mb-3 mt-0">Tags</h3>
          <div class="Input">
            <input type="text" class="xs9 sm7 mr-4 b3" />
            <button class="btn">Add</button>
          </div>
          <small>Separate tags with commas</small>
          <div class="Slot">
            <span v-for="i in 10"
              >tagone <span class="icon-cancel"></span
            ></span>
          </div>
        </div>

        <select @change="setPostType" class="my-3 mr-1">
          <option selected>Select Post Type</option>
          <option value="post">Post</option>
          <option value="page">Page</option>
        </select>

        <div class="t-blue-grey"></div>
      </section>

      <!-- Second Box -->
      <section class="AltBoxCont xs12 md4">
        <!-- Featured Image Detail -->
        <div class="Images">
          <section>
            <h3 class="my-1">Featured Image</h3>
            <small class="mb-4">
              This will be the main post image.
            </small>
            <button @click="openMedLib('featured')" class="btn m-2 p-2">
              <i class="icon-picture mr-2"></i>
              Add Image
            </button>
            <div class="flex wrap md-j-c-center">
              <div class="featuredImg">
                <img :src="featured_image || '/defaults/pgs/ph.png'" />
                <i
                  @click="removeFeaturedImage"
                  v-if="featured_image"
                  class="icon-trash-empty"
                ></i>
              </div>
            </div>
          </section>
          <hr />
          <section>
            <h3 class="my-1">Post Gallery</h3>
            <small class="mb-4">
              This will be shown on sliders
            </small>
            <button @click="openMedLib('gallery')" class="btn m-2 p-2">
              <i class="icon-picture mr-2"></i>
              Add Image
            </button>
            <div
              v-if="images.length > 0"
              class="GalleryImgBox flex wrap md-j-c-center"
            >
              <div class="GalleryImg" v-for="(url, i) in images" :key="i">
                <img :src="url" />
                <i @click="removeImage" class="icon-trash-empty"></i>
              </div>
              <!-- <div class="GalleryImg" v-for="(image, i) in images" :key="i">
                <img :src="image" :alt="image.alt" />
              </div> -->
            </div>
          </section>
        </div>
        <!-- <ImageTransformer @ready="addProductImage" ref="imageTransformer" fieldName="featured_image" :cropWidth="600" :cropHeight="350" /> -->
        <!-- <img v-if="postImageSrc" ref="postImage" :src="
                             $postBaseUrl + postImageSrc[0]
                        " alt="post image" /> -->
        <button class="btn icon-publish my-9">PUBLISH</button>

        <div class="Actions flex j-c-center my-4">
          <button
            id="saveBtn"
            ref="saveBtn"
            @click="SaveProduct"
            class="icon-floppy btn cyan-gradient-btn"
          >
            {{ currentMode === "edit" ? "UPDATE" : "SAVE NEW" }}
          </button>
        </div>
      </section>
    </article>

    <!-- MediaLibrary Component -->
    <MediaLibrary
      v-if="showMedLib"
      @closed="showMedLib = false"
      @selected="setImage"
      :show="showMedLib"
      :triggeredBy="MedLibTarget"
    ></MediaLibrary>
    <!-- MediaLibrary Component -->
  </div>
</template>

<script lang="ts">
import Vue from "vue";

import { $Posts } from "@/store";
import { $Notify, $Process } from "@/plugins";

// import MediaLibrary from "@/components/uploads/MediaLibrary.vue"
// import Composer from "@/components/Editor/Composer.vue"

export default Vue.extend({
  components: {
    // MediaLibrary,
    Composer: () => import("@/components/Editor/TextEditor.vue"),
    MediaLibrary: () => import("@/components/uploads/MediaLibrary.vue")
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.query.mode === "edit") {
        $Posts.$edit.fetch({ slug: to.params.slug });
        $Posts.$edit.currentMode = "edit";
      }
    });
  },
  data() {
    return {
      //component data
      showMedLib: false,
      MedLibTarget: "",

      // post data
      title: "",
      slug: "",
      content: "",
      excerpt: "",
      categories: [],
      tags: [],
      featured_image: "",
      images: [],
      type: "post"
    };
  },

  computed: {
    currentMode: () => $Posts.$edit.currentMode,
    postToEdit: () => $Posts.$edit.postToEdit
  },

  methods: {
    setSlug(e) {
      this.slug = e.target.value
        .replace(/\s{2,}/g, " ")
        .split(" ")
        .join("-")
        .toLowerCase();
    },

    setContent(content: string) {
      this.content = content;
    },

    setExcerpt(e) {
      this.excerpt = e.target.textContent;
    },
    setPostType(event) {
      const tg = event.target;
      if (tg.value) this.type = tg.value;
    },
    /* for media library and image selecion */
    openMedLib(target: string) {
      this.MedLibTarget = target;
      this.showMedLib = true;
    },

    setImage(
      url: string,
      target: string /* emitted event from media library */
    ) {
      this.showMedLib = false;

      if (target === "featured") {
        this.featured_image = url;
      } else {
        this.images.push(url);
      }
    },

    removeImage(e) {
      let tg = e.target;
      let url = tg.parentNode.firstChild.getAttribute("src");
      let index = this.images.indexOf(url);
      if (index != -1) this.images.splice(index, 1);
    },
    removeFeaturedImage() {
      this.featured_image = "";
    },
    /* for media library and image selecion */

    SavePost() {
      const data = {
        title: this.title,
        slug: this.slug,
        content: this.content,
        excerpt: this.excerpt,
        type: this.type,
        categories: JSON.stringify(this.categories),
        tags: JSON.stringify(this.tags),
        featured_image: this.featured_image,
        images: JSON.stringify(this.images)
      };
      // console.log(data);
      if (this.currentMode === "new") {
        $Posts.$edit.create(data);
      } else {
        $Posts.$edit.update(data);
      }
    }
  },
  mounted() {
    $Process.add("Loading Editor...");

    if (this.postToEdit) {
      this.$data.forEach(data => {
        if (this.postToEdit[data]) {
          data = this.postToEdit[data];
        }
      });
      this.$refs.excerpt.textContent = this.excerpt;
    }
  }
});
</script>

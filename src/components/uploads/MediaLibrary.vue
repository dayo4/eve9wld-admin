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
    .GridView {
        max-height: 400px;
    }
}
</style>

<template>
    <transition name="slide-fade">
        <article v-show="show === true" class="LibModal">
            <!-- Header -->
            <section class="Head">
                <div class="flex wrap a-i-center">
                    <h2 class="mr-3">Select Media To Upload</h2>
                    <button @click="triggerImageEditor" class="btn bg-cyan font-6 my-3 p-3 b4">
                        Upload New Image
                    </button>
                </div>
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
                        <section></section>
                        <section class="flex a-i-center">
                            <select name="filter" class="mr-1">
                                <option value="-1">All Dates</option>
                                <option value="mine">This Month</option>
                                <option value="mine">Last</option>
                                <option value="mine">feb 2021</option>
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
                        <div v-for="i in 20" :key="i" class="xs6 sm4 md3 lg2">
                            <div class="Img">
                                <img src="/defaults/usr/adedayo.jpg" alt="image" />
                                <i @click="checkBox" :data-checked="i"></i>
                            </div>
                        </div>
                    </section>
                </div>

                <div class="xs12 sm4 md3 lg2">
                    <section class="">
                        <h3 class="t-blue-grey">Attachment details</h3>
                        <div class="Img">
                            <img :src="imageSrc || '/defaults/pgs/ph.png'" alt="image" />
                        </div>
                        <h5>Image Name</h5>
                        <div>Image Date</div>
                        <div>Image size</div>
                        <div>Image dimentions</div>
                        <a class="no-deco t-blue" href="#">Edit Image</a>
                        <a class="no-deco t-red" href="#">Delete Image</a>
                    </section>
                    <hr />
                    <section>
                        <h3 class="mr-2 mb-2">Image Url</h3>
                        <input class="p-4 mb-2 w-full" type="text" :value="imageSrc" />
                        <button @click="copyUrl" class="btn bg-white t-blue p-3" name="copyUrl">
                            Copy Url
                        </button>
                    </section>
                </div>
            </section>

            <!-- Image Library Close Button -->
            <i @click="$emit('closed')" class="LibModalClose icon-cancel shadow-3"></i
            ><!-- absolute positioned close button for the modal -->
            <!-- Image Library Close Button -->

            <!-- Image Editor Component -->
            <ImageTransformer
                @ready="uploadImage"
                ref="imageTransformer"
                fieldName="image"
                :cropWidth="600"
                :cropHeight="350"
            />
            <!-- Image Editor Component -->
        </article>
    </transition>
</template>

<script lang="ts">
import { defineComponent, defineAsyncComponent } from "vue"
import { $MediaLibrary } from "@/store"

export default defineComponent({
    components: {
        ImageTransformer: defineAsyncComponent(() =>
            import("@/components/uploads/ImageTransformer.vue")
        ),
    },
    props: {
        show: {
            required: true,
            type: Boolean,
        },
    },

    data() {
        return {
            showEditor: false,
            checkedImages: [],
            imageSrc: "",
        }
    },

    methods: {
        checkBox(e) {
            let tg = e.target
            let attr = tg.getAttribute("data-checked")
            let index = this.checkedImages.indexOf(attr)
            tg.classList.toggle("icon-check-1")
            if (index != -1) this.checkedImages.splice(index, 1)
            else this.checkedImages.push(attr)

            this.imageSrc = tg.parentNode.firstChild.getAttribute("src")
        },

        copyUrl(e) {
            const copyTarget = e.target.parentNode.children[1]
            copyTarget.select()
            document.execCommand("copy")
            // e.target.append()
        },

        uploadImage(formData: FormData, base64Image: string) {
            $MediaLibrary
                .uploadImage(formData)
                .then((done) => {
                    console.log('lllllll')
                })
                .catch((e) => {
                    console.log('lkkl')
                })
            // console.log(formData)
        },

        triggerImageEditor() {
            this.$refs.imageTransformer.trigger()
        },

        // uploadImage() {
        // $Axios.
        // },
    },
})
</script>

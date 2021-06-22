<template>

<article class="Tab xs12">
    <h2 class="text-center t-blue-grey--1">Edit Categories</h2>

    <section class="MainCont">
        <div class="textFeilds my-2 t-blue-grey">
            <div class="flex a-i-center wrap m-4">
                <label class="pr-5">Name</label>
                <input class="xs11 md8" type="text" placeholder="Enter Product Name" name="Name" />
            </div>
            <div class="flex a-i-center wrap m-4">
                <label class="pr-5">slug</label>
                <input class="xs11 md8" type="text" placeholder="Product slug/permalink" name="Name" />
            </div>
        </div>

				<div class="my-2">
					<h3 class="t-blue-grey m-1">Short Description</h3>
					<div>
							<div
									ref="about"
									contenteditable="true"
									placeholder="Product short description"
							></div>
					</div>
				</div>

				<div class="my-2">
					<h3 class="t-blue-grey m-1">Parent Category</h3>
					<select name="parent" class="mr-2">
							<option value="-1">parent one</option>
							<option value="edit">parent two</option>
					</select>
				</div>

				<div class="my-2">
					<h3 class="t-blue-grey m-1">Type</h3>
					<select name="catType" class="mr-2">
							<option value="-1">Products</option>
							<option value="edit">Posts</option>
					</select>
				</div>

<div class="my-2">
	<h3 class="t-blue-grey m-1">Thumbnail</h3>
				<div class="flex a-i-center">
					<div class="" width="100" height="100">
						<!-- Thumbnail here -->
					</div>
					<button class="p-3 bg-white t-blue b1">Add Image</button>
        </div>
			</div>
    </section>

<!-- Second Box -->
    <section class="AltBoxCont xs12 md3 px-4">
        <button @click="triggerImageTransformer" class="btn icon-picture my-8">
            Add Product Image
        </button>
        <div class="t-blue-grey--2 mb-8">
            This are the main product images.
        </div>
        <ImageTransformer @ready="addProductImage" ref="imageTransformer" fieldName="featuredImage" :cropWidth="600" :cropHeight="350" />
        <div class="PostImage">
            <img v-if="postImageSrc" ref="postImage" :src="
                            postImageSrc.match(/^data:/)
                                ? postImageSrc
                                : $postBaseUrl + postImageSrc
                        " alt="post image" />
        </div>

        <hr />

        <div class="t-blue-grey--2 mt-10">
            You can save, edit and update your content all you want. Hit the "Publish" button whenever you are ready to go live with it.
        </div>
        <button class="btn icon-publish my-9">PUBLISH</button>

        <div class="Actions flex j-c-center my-4">
            <button id="saveBtn" ref="saveBtn" @click="startProcessing" class="icon-floppy btn cyan-gradient-btn">
                {{ currentMode === "edit" ? "UPDATE" : "SAVE NEW" }}
            </button>
        </div>
    </section>
</article>

</template>

<script lang="ts">

import {
    defineComponent
}
from 'vue'

// import { $Auth } from '@/store'
import {
    $Notify
}
from '@/plugins'

import Composer from "@/components/Editor/Composer.vue"
import {
    $Products
}
from '@/store/products'

export default defineComponent({
    components: {
        Composer,
        ImageTransformer: () =>
            import ("@/components/uploads/ImageTransformer.vue"),
    },
    // data () {
    //     return {
    //         // allowReg: null as boolean
    //     }
    // },

    computed: {
        currentMode: () => $Products.$new.currentMode,
        postImageSrc: () => $Products.$new.productImages,
        contentToEdit: () => $Products.$new.contentToEdit,
    },

    methods: {
        preview(slug: string) {

                // console.log(this.contentToEdit)
                if (!slug) {
                    $Notify.info('You have to Save content first before you can preview.')
                    return
                } else {
                    let route = this.$router.resolve({
                        path: 'posts-preview/' + slug
                    })
                    window.open(route.href, '_blank')
                }

            },

            triggerImageTransformer() {
                (this.$refs.imageTransformer as any /* child component */ ).trigger()
            },

            addProductImage(formData: FormData, base64Image: string) {
                $Products.$new.addImage({
                    postImageSrc: base64Image,
                    formData
                })
            },

            startProcessing() {
                (this.$refs.composer as any /* child component */ ).init()
            }
    },
})
</script>
<style lang="scss" scoped>

.MainCont {
    & .textFeilds {
        border-bottom: 1.5px solid grey;
        & input[type="text"] {
            border: solid 1.5px $blue-grey-2;
            border-radius: 4px;
            padding: 7px;
        }
    }
}

div[contenteditable="true"] {
    max-height: 250px;
}
div[contenteditable="true"],
input {
    border: solid 2px rgba(128, 128, 128, 0.591);
    border-radius: 4px;
    padding: 5px;
}
</style>

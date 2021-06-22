<style lang="scss" scoped>

.MainCont {
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
        input[type="checkbox"] {
            width: 1.3em;
            height: 1.3em;
            border: solid 1px grey;
        }
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
        color: $blue-grey;
        border: 1px solid $blue-grey;
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
    color: $blue-grey;
    .Images {
        margin: 8px 0;
        padding: 8px 8px 4px 12px;
        color: $blue-grey;
        border: 1px solid $blue-grey;
        border-radius: 12px;
    }
		.galleryImgBox{
			max-height: 400px;
			overflow: scroll;
		}
    .featuredImg, .galleryImg {
        position: relative;
        // display: flex;
        // align-items: center;
        // justify-content: center;
        padding-top: 150px;
        margin: 8px 4px 4px 8px;
				height: 150px;
				width: 150px;
				// border-radius: 8px;
				overflow: hidden;
        img {
            position: absolute;
            top: 0;
            bottom: 0;
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

<h2 class="text-center t-blue-grey--1">Add New Product</h2>


<article class="flex wrap pl-5 pr-4">

    <section class="MainCont xs12 md8">
        <div class="TextFeilds my-2 t-blue-grey">
            <div>
                <label>Name</label>
                <input class="xs12" type="text" placeholder="Enter Product Name" name="Name" />
            </div>
            <div>
                <label>Slug</label>
                <input class="xs12" type="text" placeholder="Product slug/permalink" name="Name" />
            </div>
        </div>

        <div class="my-2">
            <h3 class="t-blue-grey mt-5 mb-1">Product Description</h3>
            <div>
                <Composer ref="composer"></Composer>
            </div>
        </div>

        <div class="my-2">
            <h3 class="t-blue-grey mt-5 mb-1">Short Description</h3>
            <div>
                <div ref="about" @input="setAbout" contenteditable="true" placeholder="Product short description"></div>
            </div>
        </div>

        <div class="Categ my-4 p-4  t-blue-grey b1 br3">
            <h3 class="mb-3 mt-0">Categories</h3>
            <div v-for="i in 5">
                <input class="mr-2" type="checkbox" name="cat1" value="cat1">
                <label>Category {{i}}</label>
            </div>
        </div>

        <div class="Tags">
            <h3 class="mb-3 mt-0">Tags</h3>
            <div class="Input">
                <input type="text" class="xs9 sm7 mr-4">
                <button class="btn">Add</button>
            </div>
            <small>Separate tags with commas</small>
            <div class="Slot">
                <span v-for="i in 10">tagone <span class="icon-cancel"></span></span>
            </div>
        </div>

        <div class="TextFeilds my-2 t-blue-grey">
            <div>
                <label>Regular Price</label>
                <input class="xs12" type="text" placeholder="Enter Product Regular Price" name="Name" />
            </div>
            <div>
                <label>Sale Price</label>
                <input class="xs12" type="text" placeholder="Product Price" name="Name" />
            </div>
        </div>

        <div class="t-blue-grey">

        </div>
    </section>

    <!-- Second Box -->
    <section class="AltBoxCont xs12 md4">
        <!-- Featured Image Detail -->
        <div class="Images">
            <section>
							<h3 class="my-1">Featured Image</h3>
							<small class="mb-4">
								This will be the main product image.
							</small>
								<button @click="showMedLib = true" class="btn m-2 p-2"><i class="icon-picture mr-2"></i>
									Add Image
								</button>
								<div class="flex wrap md-j-c-center">
                <div class="featuredImg">
                    <img src="/defaults/pgs/scavorb_technolink.jpg" alt="">
                </div>
                </div>
            </section>
						<hr>
            <section>
							<h3 class="my-1">Product Gallery</h3>
							<small class="mb-4">
								This will be shown on sliders
							</small>
								<button @click="showMedLib = true" class="btn m-2 p-2"><i class="icon-picture mr-2"></i>
									Add Image
								</button>
								<div class="galleryImgBox flex wrap md-j-c-center">
									<div class="galleryImg" v-for="i in 8">
										<img src="/defaults/pgs/scavorb_technolink.jpg" alt="">
									</div>
								</div>
            </section>
        </div>
        <!-- <ImageTransformer @ready="addProductImage" ref="imageTransformer" fieldName="featuredImage" :cropWidth="600" :cropHeight="350" /> -->
            <!-- <img v-if="postImageSrc" ref="postImage" :src="
                             $postBaseUrl + postImageSrc[0]
                        " alt="post image" /> -->
        <button class="btn icon-publish my-9">PUBLISH</button>

        <div class="Actions flex j-c-center my-4">
            <button id="saveBtn" ref="saveBtn" @click="startProcessing" class="icon-floppy btn cyan-gradient-btn">
                {{ currentMode === "edit" ? "UPDATE" : "SAVE NEW" }}
            </button>
        </div>
    </section>

</article>

<!-- MediaLibrary Component -->
<MediaLibrary @closed="showMedLib = false" :show="showMedLib"></MediaLibrary>
<!-- MediaLibrary Component -->

</template>

<script lang="ts">

import {
    defineComponent,defineAsyncComponent
}
from 'vue'

// import { $Auth } from '@/store'
import {
    $Notify
}
from '@/plugins'

// import MediaLibrary from "@/components/uploads/MediaLibrary.vue"
import Composer from "@/components/Editor/Composer.vue"
import {
    $Products
}
from '@/store/products'

export default defineComponent({
    components: {
			// MediaLibrary,
        Composer,
        MediaLibrary: defineAsyncComponent(() =>
            import("@/components/uploads/MediaLibrary.vue")),
    },
    data () {
        return {
            showMedLib: false
        }
    },

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

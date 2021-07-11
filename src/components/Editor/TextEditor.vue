<template>
  <!-- editor -->
  <div>
    <section id="toolbar-container"></section>
    <section id="decoupled-ck-editor"></section>

    <!-- MediaLibrary Component -->
    <!-- <MediaLibrary
      v-if="showMedLib"
      @closed="showMedLib = false"
      :show="showMedLib"
    ></MediaLibrary> -->
    <!-- MediaLibrary Component -->
  </div>
</template>
<script lang="ts">
// import { $Auth, $Posts } from '@/store'
import { $Process, $Notify, $Obstacl, $Validator } from "@/plugins";

import Vue from "vue";
// import CustomCkDocumentEditor from '@ckeditor/ckeditor5-build-decoupled-document'

import CustomCkDocumentEditor from "@/plugins/utils/ckeditor";

import { $Axios } from "@/plugins";
import { $Auth } from "@/store";

export default Vue.extend({
  components: {
    ImageTransformer: () => import("@/components/uploads/ImageTransformer.vue"),
    MediaLibrary: () => import("@/components/uploads/MediaLibrary.vue")
  },
  props: {
    initialContent: { required: false, type: String },
    config: { required: false, type: Array }
    // enableImage: { required: false, default: false, type: Boolean },
  },
  data() {
    return {
      editor: null,

      // media library
      showMedLib: false
    };
  },
  // watch: {
  //     content (val: string) {
  //         this.$emit('content-updated', val)
  //     }
  // },
  computed: {},
  methods: {},
  mounted() {
    // this.content = this.initialContent
    // const editor: HTMLElement = document.getElementsByClassName('ql-editor')[ 0 ] as any
    // editor.addEventListener('paste', $General.pasteAsPlainText, false)
    let _this = this;
    let CkDocumentEditor;

    class MyUploadAdapter {
      loader;

      constructor(loader) {
        this.loader = loader;
      }

      // upload() {
      //   return this.loader.file.then(async file => {
      //     console.log(this.loader);
      //     const formData = new FormData();
      //     formData.append("contentImages", file);

      //     try {
      //       const { data } = await $Axios.patch(
      //         "posts/uploadImages/" + 4 + "/" + $Auth.user.id,
      //         formData,
      //         {
      //           onUploadProgress: progressEvent => {
      //             // setInterval(() => {
      //             //     let uploaded = Math.round((progressEvent.loaded / progressEvent.total) * 100)
      //             console.log(`${progressEvent.loaded}/${progressEvent.total}`);
      //             // }, 20)
      //           }
      //         }
      //       );
      //       console.log(data);
      //       return { default: _this.$postBaseUrl + data.imageUrl };
      //     } catch (e) {
      //       console.log("errr", e);
      //     }

      //     _this.$refs.imageTransformer;
      //   });
      // }
      // abort() {
      //   console.log("abooooooort");
      // }
    }

    if (!CkDocumentEditor) {
      CkDocumentEditor = CustomCkDocumentEditor.create(
        document.querySelector("#decoupled-ck-editor"),
        {
          toolbar: {
            items: [
              "heading",
              "|",
              "fontSize",
              "fontFamily",
              "|",
              "fontColor",
              "fontBackgroundColor",
              "|",
              "bold",
              "italic",
              "underline",
              "strikethrough",
              "|",
              "alignment",
              "|",
              "numberedList",
              "bulletedList",
              "|",
              "outdent",
              "indent",
              "|",
              "todoList",
              "link",
              "blockQuote",
              "imageInsert",
              "insertTable",
              "mediaEmbed",
              "|",
              "undo",
              "redo",
              "code",
              "codeBlock",
              "subscript",
              "superscript",
              "horizontalLine"
            ]
          },
          language: "en",
          image: {
            toolbar: [
              "imageTextAlternative",
              "imageStyle:full",
              "imageStyle:side",
              "linkImage",
              "|",
              "resizeImage:original",
              "resizeImage:75",
              "resizeImage:50"
            ]
          },
          table: {
            contentToolbar: [
              "tableColumn",
              "tableRow",
              "mergeTableCells",
              "tableCellProperties",
              "tableProperties"
            ]
          },
          licenseKey: ""
        }
      )
        .then(editor => {
          _this.editor = editor;
          editor.model.document.on("change:data", () => {
            _this.$emit("contentUpdated", editor.getData());
          });
          if (_this.initialContent) {
            editor.setData(_this.initialContent);
            _this.$emit("contentUpdated", editor.getData());
          }

          const toolbarContainer = document.querySelector("#toolbar-container");
          toolbarContainer.appendChild(editor.ui.view.toolbar.element);

          editor.plugins.get("FileRepository").createUploadAdapter = function(
            loader
          ) {
            return new MyUploadAdapter(loader);
          };

          $Process.hide();
          // let addImageBtn = document.querySelector(
          //   "input[type=file]"
          //   // "#decoupled-ck-editor .ck-file-dialog-button"
          // );
          // addImageBtn.parentNode.removeChild(addImageBtn);
          // console.log(addImageBtn);
          // addImageBtn.addEventListener("click", function(e: Event) {

          //   e.preventDefault();
          //   e.stopPropagation();
          //   e.stopImmediatePropagation();
          // });
        })
        .catch(e => {
          $Process.hide();
          console.log("editor error", e);
        });
    }
  }
});
</script>
<style lang="scss" scoped>
#decoupled-ck-editor {
  min-height: 300px;
  border: solid 2px $grey-2;
  border-radius: 5px;

  // & .ck-file-dialog-button {
  //   position: relative;
  //   &::after {
  //     position: absolute;
  //     top: 0;
  //     bottom: 0;
  //     left: 0;
  //     right: 0;
  //   }
  // }
}
</style>

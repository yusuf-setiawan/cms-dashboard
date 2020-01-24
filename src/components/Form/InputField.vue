<template>
    <b-colxx :sm="col || 12">
        <template v-if="type=='switch'" >
            <label class="">{{title}}</label> <br/>
            <switches  class="mb-3" @input="$emit('update:model', model);" v-model="model" theme="custom" color="primary"></switches>
            <div v-if="error" class="error-feedback">{{ error }}</div>
        </template>

        <b-form-group v-else :label="title" :description="hint"  :class="state">
            <b-textarea v-if="type=='textarea'"  @change="$emit('update:model', model);" @keyup="$emit('update:model', model);" v-model="model"  :rows="2" :max-rows="2"/>
            <vue-dropzone v-else-if="type=='image'" @vdropzone-success="vdropzone_success" ref="myVueDropzone" id="dropzone" :options="dropzoneOptions"></vue-dropzone>
            <v-select v-else-if="type=='select'" :label="selectLabel" @input="$emit('update:model', model);" v-model="model" :options="selectOptions" />
            <v-select multiple v-else-if="type=='multiple-select'" :label="selectLabel" @input="$emit('update:model', model);" v-model="model" :options="selectOptions" />
           <v-date-picker
                v-else-if="type=='date'"
                mode="single"
                @input="$emit('update:model', model);"
                @change="$emit('update:model', model);"
                v-model="model"
                :input-props="{ class:'form-control', placeholder: 'Select Date' }"
            ></v-date-picker>
           <InputTag v-else-if="type=='tags'" :add-tag-on-blur='false' @input="$emit('update:model', model);" 
                @tagChange="$emit('update:model', model);" @change="$emit('update:model', model);" 
                @keyup="$emit('update:model', model);" class="form-control" v-model="model" :state="state"
          />
            <input v-else-if="type=='color'" type="color" style="height:38px;" @change="$emit('update:model', model);" @keyup="$emit('update:model', model);" v-model="model"/>
            <money :disabled="disabled" v-else-if="type=='money'" @input="$emit('update:model', model);" v-bind="{precision: 0, decimal: ',', thousands: '.', prefix: 'Rp ', masked:false }" v-model="model" />
            <money :disabled="disabled" v-else-if="type=='number'" @input="$emit('update:model', model);" v-bind="{precision: 0, decimal: ',', thousands: '.', prefix: '', masked:false }" v-model="model" />
            <b-form-input :disabled="disabled" v-else :type="type || 'text'"  @change="$emit('update:model', model);" @keyup="$emit('update:model', model);" class="form-control" v-model="model" :state="state"/>
            <div v-if="error" class="error-feedback">{{ error }}</div>
        </b-form-group>

    </b-colxx>
</template>

<style lang="scss">
    .error-feedback {
        width: 100%;
        margin-top: .25rem;
        font-size: 80%;
        color: #dc3545;
    }
    .invalid .v-select .vs__dropdown-toggle {
        border-color: #dc3545 !important;
    }
    .invalid input.v-money,
    .invalid input.form-control {
        border-color: #dc3545 !important;
    }
    input.v-money[disabled] {
        background-color: #e9ecef;
    }
</style>

<script>
import { watch } from 'fs'
import InputTag from '@/components/Form/InputTag'
//import InputTag from 'vue-input-tag'

export default {
    components: {
        InputTag,
     },
    name: 'InputField',
    props: ['title', 'model', 'col', 'type', 'error', 'hint', 'textarea', 'selectOptions', 'selectLabel', 'disabled'],
    data () {
        return {
        }
    },
    mounted () {
        console.log('mounted input field', this.$props.model)
    },
    methods: {

        vdropzone_success (file, response) {
            console.log('Success', file, response)
            this.$emit('update:model', response.assets[0])
        },

        dropzoneTemplate () {
            return `<div class="dz-preview dz-file-preview mb-3">
                        <div class="d-flex flex-column "> 
                            <div class="p-0 w-100 position-relative">
                                <div class="dz-error-mark"><span><i></i>  </span></div>
                                <div class="dz-success-mark"><span><i></i></span></div>
                                <div class="preview-container text-center">
                                    <img data-dz-thumbnail class="img-thumbnail border-0" />
                                    <i class="simple-icon-doc preview-icon"></i>
                                </div>
                            </div>
                            <div class="pl-3 pt-2 pr-2 pb-1 w-100 dz-details position-relative text-center">
                                <div> <span data-dz-name /> </div>
                                <div class="text-primary text-extra-small" data-dz-size /> </div>
                                <div class="dz-progress"><span class="dz-upload" data-dz-uploadprogress></span></div>
                                <div class="dz-error-message"><span data-dz-errormessage></span></div>
                            </div>
                            <a href="#" class="remove btn btn-xs btn-danger" data-dz-remove> <i style="color:white" class="glyph-icon simple-icon-trash"></i> </a>
                        </div>
                    </div>
                `
        }

        // thumbnail: function(file, dataUrl) {
        //     console.log("thumbnail", file, dataUrl)
        //     var j, len, ref, thumbnailElement;
        //     if (file.previewElement) {
        //         file.previewElement.classList.remove("dz-file-preview");
        //         ref = file.previewElement.querySelectorAll("[data-dz-thumbnail-bg]");
        //         for (j = 0, len = ref.length; j < len; j++) {
        //             thumbnailElement = ref[j];
        //             thumbnailElement.alt = file.name;
        //             thumbnailElement.style.backgroundImage = 'url("' + dataUrl + '")';
        //         }
        //         return setTimeout(((function(_this) {
        //             return function() {
        //                 return file.previewElement.classList.add("dz-image-preview");
        //             };
        //         })(this)), 1);
        //     }
        // }
    },
    computed: {
        dropzoneOptions () {
            return {
                url: process.env.VUE_APP_API_URL + 'cockpit/addAssets',
                // thumbnailHeight: 160,
                maxFilesize: 2,
                previewTemplate: this.dropzoneTemplate(),
                paramName: 'files[]',
                acceptedFiles: 'image/*',
                uploadMultiple: false,
                headers: { 'BZ-Token': this.$api.getToken() }
            }
        },
        state () {
            if (this.$props.error) return 'invalid'
            else return ''
        }

    }
}

</script>

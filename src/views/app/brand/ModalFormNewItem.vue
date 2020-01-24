<template>
    <div class="top-right-button-container">
          <b-modal
            :static="true"
            id="modalright"
            ref="modalright"
            :no-close-on-backdrop = "true"
            title="Add New Brand"
            class="modal-right"
          >
            <b-form>
                <b-row>
                    <input-field type="switch" title="Published" :model.sync="model.published" />
                    <input-field type="text" title="Title" :model.sync="model.title" />
                    <!--<input-field ref="imageField" type="image" title="Image" :model.sync="model.image" />-->
                    <span class="col-sm-12 w-100">
                        <imageGallery 
                            name="brand"
                            :thumbnails="prodImage.images.thumbnails"
                            :largeImages="prodImage.images.large"
                            :Path="prodImage.Path"
                            :captions="prodImage.captions"
                            @removeImg="removeImg"
                            class="galImage"
                            />
                        <b-row>
                            <input type="file" ref="file" name="file" accept="image/*" @change="addImage" style="display:none;">
                            <b-button type="button" @click="fileClick()" variant="primary" class="m-4">Add Image</b-button>
                    </b-row>
                    </span>
                </b-row>
            </b-form>

            <template slot="modal-footer">
                <b-button
                    variant="outline-secondary"
                    @click="$refs.modalright.hide()"
                >Cancel</b-button>
                <b-button
                    variant="primary"
                    @click="onSave()"
                    class="mr-1"
                >Save</b-button>
            </template>
          </b-modal>
    </div>
</template>

<script>
import ImageGallery from "@/components/Bitzania/ImageGallery.vue";
import axios from 'axios';
export default {
    components: {
        ImageGallery
     },
    props: [],
    methods: {
        show (params = null) {
            if (!params) {
                this.model = {
                    published: false,
                    title: '',
                    image: ''
                }
            } 
            else {
                this.model = params
               console.log('show modal with model ', params)

                if (this.model.image=='') {
                    this.model.image={};
                }

                //IMAGE
                let thumbnails= [];
                let captions= [];
                var path = process.env.VUE_APP_BASE_URL.slice(0, -1) //+ 'storage/uploads/';

                if (this.model.image!=null)
                {
                    if (this.model.image.path!=undefined)
                    {
                        var path =  '/storage/uploads' + this.model.image.path;

                        thumbnails.push(path);

                        var fullImagePath = path;
                        var fullImageName = fullImagePath.replace('/storage/uploads/', "");
                        var imageName = fullImageName.split('/').pop();
                        var caption = imageName.split('.')[0].substring(13, imageName.length)
                            captions.push(caption)

                        var prodImage = {
                        'Path': process.env.VUE_APP_BASE_URL.slice(0, -1),
                        'captions' : captions,
                            images: {
                                'thumbnails': thumbnails,
                                'large': thumbnails                    
                            }
                        };

                        this.prodImage = prodImage;
                        console.log('this.prodImage ', this.prodImage)
                    }
                }
            }
            this.$refs.modalright.show()
        },
        hide () {
            this.$refs.modalright.hide()
        },
        async onSave () {
            try {
                var data = this.$api.save('brand', this.model)
                if (!data) {
                    this.$notify('error', 'Error!', 'Failed saving, try again later', { duration: 2000, permanent: false })
                } else {
                    this.$notify('success', 'Success!', 'Data has been saved', { duration: 2000, permanent: false })
                    this.$refs.modalright.hide()
                    this.$emit('success', data)
                }
            } catch (error) {
                this.$notify('error', 'Error!', 'Failed saving, try again later', { duration: 2000, permanent: false })
                console.error(error)
            }
        },
        fileClick() {
            this.$refs.file.click();
        },
        addImage(e) {
            var files = e.target.files || e.dataTransfer.files;

            if (!files.length)
                return;
            this.createImage(files[0]);
        },
        createImage(file) {
            var image = new Image();
            var reader = new FileReader();
            var vm = this;

            reader.onload = (e) => {
                vm.image = e.target.result;
            };
            reader.readAsDataURL(file);

            this.uploadFile(file);
        },
        async uploadFile(imageFile)
        {
            let formData = new FormData()
            let imageURL = URL.createObjectURL(imageFile)
            formData.append('files[]', imageFile)

            const config = {
              headers: {
                'content-type': 'multipart/form-data',
                'BZ-Token': this.$api.getToken(),
                'Accept': 'application/json',
                'X-Requested-With': 'XMLHttpRequest'
              }
            };

            var url = process.env.VUE_APP_API_URL + 'cockpit/addAssets'
            var result = await axios.post(url, formData, config);

            console.log('result upload ', result)
            var asset = result.data.assets[0];
            var path =  '/storage/uploads' + asset.path;

            var fileGallery = {
                'meta' : {
                    'asset': asset._id,
	                'title': asset.title
                },
                'path': path
            }
            console.log('fileGallery ', fileGallery)
            console.log('this.currentIndex ', this.currentIndex)


            this.model.image = asset;
            console.log('this.model.image', this.model.image)
            this.prodImage = {
                images: {
                thumbnails: [],
                large: []
                },
                captions: [asset.title],
                Path: process.env.VUE_APP_BASE_URL.slice(0, -1)
            }
            this.prodImage.images.thumbnails.push(path)
            this.prodImage.images.large.push(path)
            this.prodImage.captions.push(asset.title)
            console.log('this.prodImage',this.prodImage)

        },
        removeImg(result)
        {
            console.log('masuk remove feature image', result);
            this.model.image = null;
        },
    },
    data () {
        return {
            model: {},
            prodImage: {
                images: {
                thumbnails: [],
                large: []
                },
                captions: [],
                Path: ""
            },
        }
    },
}
</script>

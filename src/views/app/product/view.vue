<template>
    <div class="center-center-button-container">
        <b-form @submit.prevent="onValidateFormSubmit">
        <span class="ml-3 font-weight-bold">Main</span><br>
        <b-card class="mb-4 m-3 w-100">
            <b-row>
                <input-field type="switch" col="6" title="Published" :model.sync="model.published" />
                <input-field type="switch" col="6" title="discontinued" :model.sync="model.discontinued" />
                <input-field type="text" title="Title" :model.sync="model.title" />
                <input-field col="12" type="select" 
                    :selectOptions="types" title="type" 
                    :model.sync="model.type" />
                <span class="ml-3 w-100">Featured Image</span><br>
                <span class="border border-lightgray ml-3 mr-3 p-3 w-100">
                    <imageGallery 
                        name="image"
                        :thumbnails="prodImage.images.thumbnails"
                        :largeImages="prodImage.images.large"
                        :Path="prodImage.Path"
                        :captions="prodImage.captions"
                        @removeImg="removeImg"
                        class="galImage"
                        />
                    <b-row>
                        <b-button type="button" @click="fileClick(-1,3)" variant="primary" class="m-4">Add Featured Image</b-button>
                   </b-row>
                </span>
                <span class="ml-3 mt-3">Gallery</span><br>
                <span class="border border-lightgray m-3 w-100 p-3">
                         <imageGallery
                            name="gallery"
                            :thumbnails="galImage.images.thumbnails"
                            :largeImages="galImage.images.large"
                            :Path="galImage.Path"
                            :captions="galImage.captions"
                            @removeImg="removeImg"
                            class="galImage"
                            />
                    <b-row>
                        <input type="file" ref="file" name="file" accept="image/*" @change="addImage" style="display:none;">
                        <b-button type="button" @click="fileClick(-1,0)" variant="primary" class="m-4">Add Image</b-button>
                   </b-row>
                </span>
                <input-field type="textarea" title="Excerpt" :model.sync="model.excerpt" />
                <input-field type="textarea" title="Content" :model.sync="model.content" />
                <input-field type="permalink" title="permalink" :model.sync="model.permalink" />
           </b-row>
        </b-card>
        <span class="ml-3 font-weight-bold">Category</span><br>
        <b-card class="mb-4 m-3 w-100">
            <b-row>
                <input-field col="4" type="select" selectLabel="title" :selectOptions="categories" title="Category" :model.sync="model.category" />
                <input-field col="4" type="multiple-select" selectLabel="title" :selectOptions="categories" title="Other Category" :model.sync="model.other_category" />
                <input-field col="4" type="tags" title="material" :model.sync="model.material" />
                <input-field col="4" type="tags" title="tags" :model.sync="model.tags" />
                <input-field col="4" type="tags" title="collection" :model.sync="model.collection" />
                <div col="4" id='Gender' class="ml-2">
                    <span>Gender</span>
                    <br>
                    <div class="mt-2">
                        <input type="checkbox" id="male" value="male" v-model="isMale">
                        <label for="male">Male</label><br>
                        <input type="checkbox" id="female" value="female" v-model="isFemale">
                        <label for="female">Female</label><br>
                        <input type="checkbox" id="kids" value="kids" v-model="isKids">
                        <label for="kids">Kids</label>
                    </div>
                </div>
                <input-field col="6" type="select" selectLabel="title" :selectOptions="brands" title="Brand" :model.sync="model.brand" />
            </b-row>
        </b-card>

        <span class="ml-3 font-weight-bold">Pricing</span><br>
        <b-card class="mb-4 m-3 w-100">
            <b-row>
                <input-field type="money" title="Price" :model.sync="model.price" />
                <input-field type="money" col="4" title="Special Price" :model.sync="model.special_price" />
                <input-field type="date" col="4" title="Special From" :model.sync="model.special_from" />
                <input-field type="date" col="4" title="Special To" :model.sync="model.special_to" />
                <input-field type="money" col="6" title="Sale Price" :model.sync="model.sale_price" />
                <input-field type="number" col="6" title="Sale Badge" :model.sync="model.sale_badge" />
                <span class="ml-3 mb-2 w-100">Tier Pricing</span><br>
                <span class="border border-lightgray ml-3 mr-3 p-3">
                    <b-row class="m-2" v-for="(item, i) in model.tier_pricing" :key="item.id">
                        <b-row>
                            <input-field type="number" col="2" title="Qty" :model.sync="model.tier_pricing[i].value.qty" />
                            <input-field type="money"  col="3" title="Price" :model.sync="model.tier_pricing[i].value.price" />
                            <b-button :id="'tier_pricing_clone-'+i" col="2" class="btn btn-light glyph-icon simple-icon-docs m-3" @click="cloneTierPricing(item)"></b-button>
                            <b-tooltip :target="'tier_pricing_clone-'+i"
                                placement="'top'"
                                title="clone">
                            </b-tooltip>
                            <b-button :id="'tier_pricing_remove-'+i" col="2" class="btn btn-light glyph-icon simple-icon-trash m-3" @click="removeTierPricing(i)"></b-button>
                            <b-tooltip :target="'tier_pricing_remove-'+i"
                                placement="'top'"
                                title="remove">
                            </b-tooltip>
                        </b-row>
                    </b-row>
                    <b-row class="m-2">
                        <b-button type="button" @click="addTierPricing()" variant="primary" >Add Tier Pricing</b-button>
                    </b-row>
                </span>
           </b-row>
        </b-card> 

        <span class="ml-3 font-weight-bold">Shipping</span><br>
        <b-card class="mb-4 m-3 w-100">
            <b-row>
               <input-field col="3" type="number" title="Weight (gram)" :model.sync="model.weight" />
               <input-field col="3" type="number" title="Panjang (cm)" :model.sync="model.p" />
                <input-field col="3" type="number" title="Lebar (cm)" :model.sync="model.l" />
                <input-field col="3" type="number" title="Tinggi (cm)" :model.sync="model.t" />
            </b-row>
        </b-card> 

        <span class="ml-3 font-weight-bold">Variant</span><br>
        <b-card class="mb-4 m-3 w-100">
            <b-row>
                <input-field col="12" type="tags" title="sizes" :model.sync="model.sizes" />
            </b-row>
        </b-card>        
        <span class="ml-3 font-weight-bold">Colors</span><br>
        <b-card class="mb-4 m-3 w-100">
            <b-row v-for="(item, i) in model.colors" :key="item.id" class="mb-3">
                <b-row class="w-100">
                    <input-field type="text"  col="3" class="ml-3" title="Label" :model.sync="item.value.label" />
                    <input-field type="color" col="3" title="Color" :model.sync="item.value.color" :value="item.value.color"/>
                    <div col="2">
                        <b-button :id="'color_clone-'+i"  class="btn btn-light glyph-icon simple-icon-docs m-3" @click="cloneColor(item, i)"></b-button>
                        <b-tooltip :target="'color_clone-'+i"
                            placement="'top'"
                            title="clone">
                        </b-tooltip>
                        <b-button :id="'color_remove-'+i"  class="btn btn-light glyph-icon simple-icon-trash m-3" @click="removeColor(i)"></b-button>
                        <b-tooltip :target="'color_remove-'+i"
                            placement="'top'"
                            title="remove">
                        </b-tooltip>
                    </div>
                </b-row>
                <span class="ml-3 mb-2 w-100">Images</span><br>
                <span class="border border-lightgray ml-3 mb-3 p-3">
                    <imageGallery v-if="item.value.images" 
                        :name="'color'+i"
                        :thumbnails="variantColor[i].images.thumbnails"
                        :largeImages="variantColor[i].images.large"
                        :Path="variantColor[i].Path"
                        :captions="variantColor[i].captions"
                        @removeImg="removeImg"
                        class="galImage"
                    />
                    <div col="1">
                        <b-button type="button" @click="fileClick(i,2)" class="btn btn-danger btn-xs mt-4 ml-2">Add Image</b-button>
                    </div>
                </span>
                <hr class="m-3" style="width: 100%; height: 1px; background-color:lightgray;" />
            </b-row>
            <b-row>
                <b-button type="button" @click="addColor()" variant="primary" class="ml-15 mt-4">Add Item</b-button>
            </b-row>
        </b-card> 
        <span class="ml-3 font-weight-bold">Inventories</span><br>
        <b-card class="mb-4 m-3 w-100" >
            <b-row v-for="(item, i) in model.inventories" :key="item.id">
                <input-field type="text" col="2" title="Color" :model.sync="item.value.color" />
                <input-field type="text"  col="2" title="sku" :model.sync="item.value.sku" />
                <input-field type="text" col="2" title="Size" :model.sync="item.value.size" />
                <input-field type="number"  col="2" title="Stock" :model.sync="item.value.stock" />
                <b-button :id="'inventories_clone-'+i" col="2" class="btn btn-light glyph-icon simple-icon-docs m-3" @click="cloneInventory(item)"></b-button>
                <b-tooltip :target="'inventories_clone-'+i"
                    placement="'top'"
                    title="clone">
                </b-tooltip>
                <b-button :id="'inventories_remove-'+i" col="2" class="btn btn-light glyph-icon simple-icon-trash m-3" @click="removeInventory(i)"></b-button>
                <b-tooltip :target="'inventories_remove-'+i"
                    placement="'top'"
                    title="remove">
                </b-tooltip>
            </b-row>
            <b-row>
                <b-button type="button" @click="addInventory()" variant="primary" class="ml-15 mt-4">Add Item</b-button>
            </b-row>
        </b-card> 
        <b-button type="submit" variant="primary" class="m-3">Save</b-button>
        <b-button type="button" @click="close()" variant="secondary" class="m-3">Close</b-button>
        </b-form>
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
        addTierPricing()
        {
            //console.log('list tier_pricing before', this.model.tier_pricing)
            if (this.model.tier_pricing=='') {
                this.model.tier_pricing=[];
            }
            let value = {
                    qty: '', price: '',
            }
            this.model.tier_pricing.push(
                {
                    value: value
                }
            )
            //console.log('list tier_pricing', this.model.tier_pricing)
        },        
        cloneTierPricing(tierPricing)
        {
            console.log('clone tierPricing', tierPricing)
            let value = {
                qty: tierPricing.value.qty, 
                price: tierPricing.value.price,
            }
            this.model.tier_pricing.push(
            {
                value: value
            }) 
            console.log('list tierPricing', this.model.tier_pricing)
        },
        removeTierPricing(i)
        {
            this.model.tier_pricing.splice(i, 1);
            //console.log('tier_pricing after remove', this.model.tier_pricing)
             
        },
        addInventory()
        {
            //console.log('list tier_pricing before', this.model.tier_pricing)
            if (this.model.inventories=='') {
                this.model.inventories=[];
            }
            let value = {
                    color: '', sku: '', size: '', stock: ''
                }
            this.model.inventories.push(
                {
                    value: value
                }
            )
            //console.log('list tier_pricing', this.model.tier_pricing)
        },        
        cloneInventory(Inventory)
        {
            //console.log('clone tierPricing', tierPricing)
            let value = {
                color: Inventory.value.color, 
                sku: Inventory.value.sku,
                size: Inventory.value.size, 
                stock: Inventory.value.stock
            }
            this.model.inventories.push(
            {
                value: value
            }) 
            //console.log('list tierPricing', this.model.tier_pricing)
        },
        removeInventory(i)
        {
            this.model.inventories.splice(i, 1);
            //console.log('tier_pricing after remove', this.model.tier_pricing)
             
        },
        addColor()
        {
            if (this.model.colors=='') {
                this.model.colors=[];
            }

            let value = {
                color: '', label: '0',
                images: []
            }
            this.model.colors.push(
            {
                value: value
            })

            this.variantColor.push(
            {
                'images' : {
                'thumbnails' : [],
                'large' : []
                },
                'captions' : [],
                'Path' : ""
            });
            //console.log('list vriant', this.model.variant)
        },
        cloneColor(color, i)
        {
            let images = [];
 
            if (color.value.images!=undefined)
            {
                for (var k = 0; k<color.value.images.length; k++)
                {
                    images.push({
                        'meta' : {
                            'asset': color.value.images[k].meta.asset,
                            'title': color.value.images[k].meta.title
                        },
                        'path': color.value.images[k].path
                    })
                }
            }
 
            let value = {
                color: color.value.color, 
                label: color.value.label,
                images: images
            }
            this.model.colors.push(                
            {
                value: value
            }) 

            if (this.variantColor[i]!=undefined)
            {
                let thumbnails= [];
                let captions= [];

                for (var m = 0; m<this.variantColor[i].images.thumbnails.length; m++)
                {
                    thumbnails.push(this.variantColor[i].images.thumbnails[m])
                    captions.push(this.variantColor[i].captions[m])
                }

                this.variantColor.push({
                    'Path': this.variantColor[i].Path,
                    'captions' : captions,
                    images: {
                        'thumbnails': thumbnails,
                        'large': thumbnails                    
                    }
                });
            }
        },
        removeColor(i)
        {
            this.model.colors.splice(i, 1);
            this.variantColor.splice(i, 1);
            //console.log('variant after remove', this.model.variant)
        },
        removeImg(result)
        {
            var i = result.index;
            var name = result.name;

            if (name=="image")
            {
                console.log('masuk remove feature image', result);
                this.model.image = null;
            }
            else if (name=="gallery")
            {
                console.log('masuk remove parent gallery', result);
                this.model.gallery.splice(i, 1);
            }
            else if(name.includes("color"))
            {
                console.log('masuk remove parent before color', result);
                var index = parseInt(name.replace('color', ''));
                console.log('this.model.color before', this.model.colors);
                console.log('this.model.colors[index] before', this.model.colors[index]);
                console.log('this.model.colors[index].value.images before', this.model.colors[index].value.images);

                this.model.colors[index].value.images.splice(i, 1);
                console.log('images after remove', this.model.colors[index].value.images);
             }           
        },
        fileClick(i, galleryType) {
            console.log('currentIndex', i, galleryType);
            this.currentIndex = i;
            this.galleryType = galleryType;

            this.$refs.file.click();
        },
        addVariantImage(e) {
           var files = e.target.files || e.dataTransfer.files;

            if (!files.length)
                return;
            console.log('files', files[0]);
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

            if (this.galleryType==0)
            {
                console.log('file for Gallery ')
                this.model.gallery.push(fileGallery);
                this.galImage.images.thumbnails.push(path)
                this.galImage.captions.push(asset.title)
            }
            else if (this.galleryType==1)
            {
                console.log('this.currentIndex', this.currentIndex)
                console.log('file for variant')
                console.log('this.model.variant i ', this.model.variant[this.currentIndex])
                console.log('this.model.variant.value.images ', this.model.variant[this.currentIndex].value.images)
                if (this.model.variant[this.currentIndex].value.images==undefined)
                    this.model.variant[this.currentIndex].value.images = []

                console.log('this.variantGallery ', this.variantGallery)

                this.model.variant[this.currentIndex].value.images.push(fileGallery);
                if (this.variantGallery.length==0) {
                    this.variantGallery.push(
                        {
                            'Path': '',
                            'captions' : [],
                            images: {
                                'thumbnails': [],
                                'large': []                    
                            }
                        }
                    )
                }

                this.variantGallery[this.currentIndex].images.thumbnails.push(path)
                //this.variantGallery[this.currentIndex].images.large.push(path)
                this.variantGallery[this.currentIndex].captions.push(asset.title)
                this.variantGallery[this.currentIndex].Path =process.env.VUE_APP_BASE_URL.slice(0, -1);
                console.log('this.variantGallery', this.variantGallery)

            }
            else if (this.galleryType==2)
            {
                console.log('this.currentIndex', this.currentIndex)
                console.log('file for color')
                console.log('this.model.color i ', this.model.colors[this.currentIndex])
                console.log('this.model.color.images ', this.model.colors[this.currentIndex].value.images)
                if (this.model.colors[this.currentIndex].value.images==undefined)
                    this.model.colors[this.currentIndex].value.images = []

                console.log('this.variantColor ', this.variantColor)

                this.model.colors[this.currentIndex].value.images.push(fileGallery);
                if (this.variantColor.length==0) {
                    this.variantColor.push(
                        {
                            'Path': '',
                            'captions' : [],
                            images: {
                                'thumbnails': [],
                                'large': []                    
                            }
                        }
                    )
                }

                this.variantColor[this.currentIndex].images.thumbnails.push(path)
                this.variantColor[this.currentIndex].captions.push(asset.title)
                this.variantColor[this.currentIndex].Path =process.env.VUE_APP_BASE_URL.slice(0, -1);
            }
            else if (this.galleryType==3)
            {

                console.log('file for image')
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
                //this.prodImage.path = process.env.VUE_APP_BASE_URL.slice(0, -1);
                this.prodImage.images.thumbnails.push(path)
                this.prodImage.images.large.push(path)
                this.prodImage.captions.push(asset.title)
                console.log('this.prodImage',this.prodImage)
             }
        },
        async onValidateFormSubmit () {
            //console.log('masuk on validate')

            this.model.gender = []
            if (this.model.special_from!="")
                this.model.special_from = this.model.special_from.toISOString().split('T')[0];
            if (this.model.special_to!="")
            this.model.special_to = this.model.special_to.toISOString().split('T')[0];

           if (this.isMale)
                this.model.gender.push('Male')
            if (this.isFemale)
                this.model.gender.push('Female')
            if (this.isKids)
                this.model.gender.push('Kids')

            console.log('model ', this.model)



            try {
                var data = this.$api.save('product', this.model)
                if (!data) {
                    this.$notify('error', 'Error!', 'Failed saving, try again later', { duration: 2000, permanent: false })
                } else {
                    this.$notify('success', 'Success!', 'Data has been saved', { duration: 2000, permanent: false })
                     this.$emit('success', data)
                }
            } catch (error) {
                this.$notify('error', 'Error!', 'Failed saving, try again later', { duration: 2000, permanent: false })
                console.error(error)
            }
        },
        close() {
            this.$router.push('/app/product');
        },
    },
    data () {
        return {
            isMale:false,
            isFemale:false,
            isKids:false,
            selectedGender: [],
            currentIndex:-1,
            galleryType:0,
            prodImage: {
                images: {
                thumbnails: [],
                large: []
                },
                captions: [],
                Path: ""
            },
            galImage: {
                images: {
                thumbnails: [],
                large: []
                },
                captions: [],
                Path: ""
            },
            variantGallery: [],
            variantColor: [],
            genderOptions: [
                { text: 'Male', value: 'Male' },
                { text: 'Female', value: 'Female' },
                { text: 'Kids', value: 'Kids' },
            ],
            model: {
                'published' : false,
                'discontinued' : false,
                'title' : '',
                'type' : '',
                'image':{}, 
                'gallery' : [],     
                'excerpt':'' ,   
                'content': '',
                'category': {},
                'other_category': {},
                'tags': [],
                'material': [],
                'collection': [],
                'brand': {},
                'gender': [],
                'price': '0',
                'special_price': '0',
                'special_from': '',
                'special_to': '',
                'sale_price' : '0',     
                'sale_badge':'' ,   
                'tier_pricing': [],
                'weight': '0',
                'p': '0',
                'l': '0',
                't': '0',
                'variant': [],
                'permalink': '',
                'special_price': '0',
                'special_from': '',
                'special_to': '',
           },
           category:{
                 'published':false ,   
                'title': '', 
                'image':{},
                'description':''             
           },
            brand:{
                'published':false ,   
                'title': '', 
                'image':{},
           },
            gallery:{
                'meta':{} ,   
                'path': '', 
           },
            meta:{
                'title': '', 
                'asset':'',
           },
            tier_pricing:{
                'qty':'' ,   
                'price': '', 
           },
            value:{
                'size':[] ,   
                'sku': '', 
                'color':'',
                'stock': '', 
                'images': [],
           },
           variant:{},
            categories: [],
            brands: [],
            types: [ 'simple','group' ],
        }
    },
    async mounted () {
        console.log('mounted')

        try {
            if (this.$route.params.id) {
               this.model = await this.$api.getOne('product', { _id: this.$route.params.id })
                console.log('pure mounted model', this.model)
           }

            if (this.model.tags=='') {
                this.model.tags=[];
            }

            if (this.model.material=='') {
                this.model.material=[];
            }

            if (this.model.collection=='') {
                this.model.collection=[];
            }

            if (this.model.gallery=='') {
                this.model.gallery=[];
            }

            if (this.model.image=='') {
                this.model.image={};
            }

            if (this.model.variant=='') {
                this.model.variant=[];
            }

            if (this.model.special_from!='') {
                this.model.special_from = new Date(this.model.special_from);
            }
            if (this.model.special_to != '') {
                this.model.special_to = new Date(this.model.special_to);
            }

            if (this.model.gender.length>0)
            {
                var isArray = Array.isArray(this.model.gender)

                if (isArray)
                {
                    console.log('this.model.gender', this.model.gender)
                    console.log('this.model.gender.length', this.model.gender.length)
                    let foundmale = this.model.gender.find(x => x == 'Male');
                    if (foundmale!=undefined)
                        this.isMale = true;
                    //console.log('found male', foundmale)

                    let foundfemale = this.model.gender.find(x => x == 'Female');
                    //console.log('found female', foundfemale)
                    if (foundfemale!=undefined)
                        this.isFemale = true;

                    let foundkids = this.model.gender.find(x => x == 'Kids');
                    //console.log('found kids', foundkids)
                    if (foundkids!=undefined)
                        this.isKids = true;
                }
                else
                {
                    if (this.model.gender == 'Male' || this.model.gender == 'male')
                        this.isMale = true;
                    else if (this.model.gender == 'Female' || this.model.gender == 'female')
                        this.isFemale = true;
                    else if (this.model.gender == 'Kids' || this.model.gender == 'kids')
                        this.isKids = true;
                }
            }
            //this.selectedGender = this.model.gender

            console.log('mounted model', this.model)

            let thumbnails= [];
            let captions= [];
            var path = process.env.VUE_APP_BASE_URL.slice(0, -1) //+ 'storage/uploads/';

            //IMAGE
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

            thumbnails= [];
            captions= [];
            //fill image gallery component
            for (var i = 0; i<this.model.gallery.length;i++)
            {
                thumbnails.push(this.model.gallery[i].path);

                var fullImagePath = this.model.gallery[i].path;
                var fullImageName = fullImagePath.replace('/storage/uploads/', "");
                var imageName = fullImageName.split('/').pop();
                var caption = imageName.split('.')[0].substring(13, imageName.length)
                 captions.push(caption)
            }

            var galImage = {
                'Path': process.env.VUE_APP_BASE_URL.slice(0, -1),
                'captions' : captions,
                images: {
                    'thumbnails': thumbnails,
                    'large': thumbnails                    
                }
            };

            this.galImage = galImage;
            console.log('this.galImage ', this.galImage)

            //fill variant gallery
            this.variantGallery = [];

            //fill variant color
            this.variantColor = [];

            if (this.model.inventories != null)
            {
                for (var i = 0; i<this.model.inventories.length;i++)
                {
                    let value = 
                    this.model.inventories[i].value = {
                        color: this.model.inventories[i].color, 
                        sku: this.model.inventories[i].sku,
                        size: this.model.inventories[i].size, 
                        stock: this.model.inventories[i].stock
                    }
                }
            }

            
            if (this.model.tier_pricing != null)
            {
                for (var i = 0; i<this.model.tier_pricing.length;i++)
                {
                    this.model.tier_pricing[i].value = {
                        qty: this.model.tier_pricing[i].qty, 
                        price: this.model.tier_pricing[i].price,
                    };
                }
            }

            if (this.model.variant != null)
            {
                for (var i = 0; i<this.model.variant.length;i++)
                {
                    let variantImages = [];
                    let variant = this.model.variant[i];
                    if (variant.images!=undefined)
                    {
                        for (var k = 0; k<variant.images.length; k++)
                        {
                            variantImages.push({
                                'meta' : {
                                    'asset': variant.images[k].meta.asset,
                                    'title': variant.images[k].meta.title
                                },
                                'path': variant.images[k].path
                            })
                        }
                    }

                    this.model.variant[i].value = {
                        size: variant.size, 
                        sku: variant.sku,
                        color: variant.color, 
                        stock: variant.stock,
                        images: variantImages
                    }

                    console.log('variant ', this.model.variant[i], i)
                // console.log('images ', this.model.variant[i].images)
                // console.log('variant size ', this.model.variant[i].size)
                    if (this.model.variant[i].value.size!=undefined)
                    {
                        //console.log('variant size length ', this.model.variant[i].size.length)
                        if (this.model.variant[i].value.size.length==undefined)
                        {
                            var oldValue = this.model.variant[i].value.size;
                            this.model.variant[i].value.size = [];
                            this.model.variant[i].value.size.push(oldValue);
                            //console.log('new variant size ', this.model.variant[i].size)
                        }
                    }
                    else
                    {
                        this.model.variant[i].value.size = [];
                    }

                    if (this.model.variant[i].value.images!=undefined)
                    {
                        let thumbnails= [];
                        let captions= [];

                        var images = this.model.variant[i].value.images;
                        for (var j = 0; j<images.length;j++)
                        {
                            var gallery = images[j];
                            thumbnails.push(gallery.path);

                            var fullImageName = gallery.path.replace('/storage/uploads/', "");
                            var imageName = fullImageName.split('/').pop();
                            var caption = imageName.split('.')[0].substring(13, imageName.length)
                            captions.push(caption)
                        }

                        var galImage = {
                            'Path': process.env.VUE_APP_BASE_URL.slice(0, -1),
                            'captions' : captions,
                            images: {
                                'thumbnails': thumbnails,
                                'large': thumbnails                    
                            }
                        };

                        this.variantGallery.push(galImage);
                        console.log('this.variantGallery ', this.variantGallery)
                    }
                    else
                    {
                        this.model.variant[i].value.images = [];
                        this.variantGallery.push(
                            {
                                'images' : {
                                'thumbnails' : [],
                                'large' : []
                                },
                                'captions' : [],
                                'Path' : ""
                            });
                    }
                }
            }

            if (this.model.colors != null)
            {
                for (var i = 0; i<this.model.colors.length;i++)
                {
                    let colorImages = [];
                    let color = this.model.colors[i];
                    if (color.images!=undefined)
                    {
                        for (var k = 0; k<color.images.length; k++)
                        {
                            colorImages.push({
                                'meta' : {
                                    'asset': color.images[k].meta.asset,
                                    'title': color.images[k].meta.title
                                },
                                'path': color.images[k].path
                            })
                        }
                    }
    
                    this.model.colors[i].value = {
                        color: color.color, 
                        label: color.label,
                        images: colorImages
                    }

                    console.log('colors ', this.model.colors[i], i)
                    console.log('images ', this.model.colors[i].value.images)
                    if (this.model.colors[i].value.images!=undefined)
                    {
                        let thumbnails= [];
                        let captions= [];

                        var images = this.model.colors[i].value.images;
                        for (var j = 0; j<images.length;j++)
                        {
                            var gallery = images[j];
                            thumbnails.push(gallery.path);

                            var fullImageName = gallery.path.replace('/storage/uploads/', "");
                            var imageName = fullImageName.split('/').pop();
                            var caption = imageName.split('.')[0].substring(13, imageName.length)
                            captions.push(caption)
                        }

                        var galImage = {
                            'Path': process.env.VUE_APP_BASE_URL.slice(0, -1),
                            'captions' : captions,
                            images: {
                                'thumbnails': thumbnails,
                                'large': thumbnails                    
                            }
                        };

                        this.variantColor.push(galImage);
                        console.log('this.variantColor ', this.variantColor)
                    }
                    else
                    {
                        this.model.colors[i].images = [];
                        this.variantColor.push(
                            {
                                'images' : {
                                'thumbnails' : [],
                                'large' : []
                                },
                                'captions' : [],
                                'Path' : ""
                            });
                    }
                }
            }

            this.categories = await this.$api.listOptions('category')
            this.brands = await this.$api.listOptions('brand')
            console.log('finish')
            }
       catch (error) {
            console.error(error)
        }
    }
}
</script>
<style lang ="scss">
.light-box {
  &__thumbnail {
    margin: 20px;
    width: 200px;
  }
}
img {
  max-width: 100%;
}
.ml-15 {
  margin-left: 15px;
}
.m-15 {
  margin: 15px;
}
.border-lightgray {
    border-color: lightgray !important;
}

</style>

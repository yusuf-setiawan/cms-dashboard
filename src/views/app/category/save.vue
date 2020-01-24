<template>
<div>
  <b-row>
    <b-colxx xxs="12" v-if="isLoad">
      <h1>{{title}}</h1>
      <div class="top-right-button-container">
         <b-dropdown id="ddown5" :text="$t('pages.actions')" size="lg" variant="outline-primary" class="top-right-button top-right-button-single" no-fade="true">
            <b-dropdown-item>{{ $t('dashboards.last-week') }}</b-dropdown-item>
            <b-dropdown-item>{{ $t('dashboards.this-month') }}</b-dropdown-item>
          </b-dropdown>
      </div>
      <piaf-breadcrumb/>

        <b-tabs nav-class="separator-tabs ml-0 mb-5" content-class="tab-content" :no-fade="true">
            <b-tab title="General Info" >
                <b-form @submit.prevent="onValitadeFormSubmit">
                <!-- <b-row> -->
                    <!-- <b-colxx xxs="12" lg="12" class="mb-4"> -->
                        <b-card class="mb-4" :title="$t('forms.validation')">
                            <b-row>
                                <input-field hint="this is hint" error="wht" col="4" title="Test" :model.sync="model.title" />
                                <input-field col="4" title="Test" :model.sync="model.title" />
                                <input-field col="4" title="Test" :model.sync="model.title" />
                                <input-field col="4" title="Test" :model.sync="model.title" />
                                <input-field col="12" title="Test" :model.sync="model.title" />
                                <input-field col="12" title="Test" :model.sync="model.title" />
                                <input-field col="12" title="Test" :model.sync="model.title" />
                                <input-field col="12" title="Test" :model.sync="model.title" />
                                <input-field col="12" title="Test" :model.sync="model.title" />
                            </b-row>

                            <b-button type="submit" variant="primary" class="mt-4">Save</b-button>
                        </b-card>
                        <b-card class="mb-4" :title="$t('forms.validation')">
                            <b-row>
                                <input-field col="4" title="Test" :model.sync="model.title" />
                            </b-row>
                        </b-card>
                    <!-- </b-colxx> -->
                <!-- </b-row> -->
                </b-form>
            </b-tab>

        <b-tab :title="$t('pages.orders')">
          <b-row>
            <b-colxx>
            </b-colxx>
          </b-row>
        </b-tab>
      </b-tabs>

    </b-colxx>
    <template v-else>
      <div class="loading"></div>
    </template>
  </b-row>
  </div>
</template>
<script>
import Stars from '@/components/Common/Stars'
import RadialProgressCard from '@/components/Cards/RadialProgressCard'
import SmallLineChartCard from '@/components/Cards/SmallLineChartCard'
import AreaShadowChart from '@/components/Charts/AreaShadow'
import CommentItem from '@/components/Listing/CommentItem'
import OrderItem from '@/components/Listing/OrderItem'

import { smallChartData1, smallChartData2, smallChartData3, smallChartData4, areaChartData } from '@/data/charts'
import comments from '@/data/comments'
import orders from '@/data/orders'

import InputField from '@/components/Form/InputField'

export default {
    components: {
        InputField,
        Stars,
        RadialProgressCard,
        SmallLineChartCard,
        AreaShadowChart,
        CommentItem,
        OrderItem
    },
    data () {
        return {
            isLoad: false,
            model: null,
            title: 'Edit Product'
        }
    },
    methods: {

    },
    async mounted () {
        // setTimeout(() => {
        //     this.isLoad = true
        // }, 50)
        this.model = await this.$api.getOne('product', { _id: this.$route.params.id })
        this.title = this.model.title
        this.isLoad = true
    }
}
</script>

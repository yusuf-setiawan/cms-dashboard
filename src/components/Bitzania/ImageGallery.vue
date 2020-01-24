<template>
  <div class="row m-1" style ="display: inline-flex;">
    <div v-for="(thumbnail, index) in thumbnails" class="border border-lightgray m-2" :key="thumbnail" style="position:relative">
      <b-img v-if="name=='image'"
        @click="showGallery(index)"
        :src="Path + thumbnail" fluid
        class="gallery__thumbnail list-thumbnail responsive col border-0 m-3" style="height: 200px;"
      />
      <b-img v-else-if="name=='brand'"
        @click="showGallery(index)"
        :src="Path + thumbnail" fluid
        class="gallery__thumbnail list-thumbnail responsive col border-0 m-3" style="height: 160px;"
      />
      <b-img v-else
        @click="showGallery(index)"
        :src="Path + thumbnail" fluid
        class="gallery__thumbnail list-thumbnail responsive col border-0 m-3" style="height: 135px;"
      />
      <div :id="'remove'+index" class="btn glyph-icon responsive col mybutton delete-button rounded-circle simple-icon-trash" 
        @click="removeImg(index)"></div>
      <b-tooltip :target="'remove'+index"
        placement="'top'"
        title="remove">
      </b-tooltip>
    </div>


    <transition name="fade" mode="out-in">
      <div @click.stop="bg = !bg" class="gallery__bg" v-if="bg"></div>
    </transition>

    <div v-if="bg">
      <div class="gallery__close" @click.stop="bg = !bg"></div>
      <p class="gallery__count" v-if="count">
        {{currentImage + 1 }}/
        <span>{{ thumbnails.length}}</span>
      </p>
      <div @click="prev" class="gallery__prev gallery__btn"></div>

      <div v-if="bg" class="gallery__container">
        <transition name="fade" mode="out-in">
          <b-img
            :key="currentImage" fluid-grow
            :src="Path + thumbnails[currentImage]"
            class="gallery__container__img"
          />
        </transition>
      </div>

      <div class="gallery__caption" v-if="caption">
        <p v-if="captions[currentImage]">{{ captions[currentImage]}}</p>
      </div>

      <div @click="next" class="gallery__next gallery__btn"></div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      bg: false,
      currentImage: 0,
      count: true,
      caption: true
    };
  },
  props: {
    thumbnails: {
      type: Array,
      required: true
    },
    largeImages: {
      type: Array,
      required: true
    },
    captions: {
      type: Array,
      required: true
    },
    Path: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    },
  },
  methods: {
    removeImg(i) {
      this.thumbnails.splice(i, 1);
      this.captions.splice(i, 1);
      let result = {
        'index' : i,
        'name' : this.name
      }

      this.$emit('removeImg', result)
    },
    showGallery(curr) {
      this.currentImage = curr;
      this.bg = !this.bg;
    },
    next() {
      if (this.currentImage < this.largeImages.length - 1) {
        this.currentImage++;
      } else {
        this.currentImage = 0;
      }
    },
    prev() {
      if (this.currentImage > 0) {
        this.currentImage--;
      } else {
        this.currentImage = this.largeImages.length - 1;
      }
    }
  }
};
</script>

<style lang="scss">
.mybutton{ position: absolute; right: 2px; top: 2px; }
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
.delete-button {
  color: red;
    background: white;
    border: 1px solid red;
    padding: 0px;
    width: 20px;
    height: 20px;
    top: 10px;
    right: 10px;
}
.gallery {
  &__bg {
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.89);
    z-index: 1000;
  }

  .border-lightgray {
    border-color: lightgray !important;
}

  &__thumbnail {
    cursor: pointer;
  }

  &__close {
    padding: 10px;
    position: absolute;
    right: 20px;
    top: 20px;
    background-image: url(/img/close.svg);
    background-size: contain;
    background-position: center;
  }
  &__container {
    position: absolute;
    z-index: 2000;
    display: flex;
    justify-content: center;
    align-items: center;
    max-width: 900px;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    min-height: 800px;
    img {
      align-self: center;
    }
  }
  &__btn {
    background-size: contain;
    background-position: center;
    align-self: center;
    padding: 15px;
  }

  &__close,
  &__btn {
    cursor: pointer;
  }

  &__close,
  &__btn,
  &__caption,
  &__count {
    position: absolute;
    z-index: 3000;
  }

  &__next {
    background-image: url(/img/next.svg);
    right: 20px;
  }
  &__prev {
    background-image: url(/img/prev.svg);
    left: 20px;
  }
  &__next,
  &__prev {
    top: 50%;
    transform: translateY(-50%);
  }

  &__caption {
    bottom: 0;
    width: 100%;
    height: 50px;
    display: flex;
    align-items: center;
    color: #fff;
    font-size: 20px;
    justify-content: center;
  }

  &__count {
    left: 20px;
    font-size: 16px;
    color: #fff;
    top: 14px;
    padding: 0;
    margin: 0;
  }
}
</style>
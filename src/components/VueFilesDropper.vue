<template>
  <div :class="classes"
       @click="onClick"
       @mouseover="hover = true"
       @mouseleave="hover = false"
       @drop.prevent="onDrop"
       @dragover.prevent="hover = true"
       @dragleave.prevent="hover = false">

    <button class="v-files-dropper__clear"
            type="button"
            @click.stop="onClear"
            v-if="canClear">&times;</button>
    <slot />
    <input type="file"
           ref="input"
           :disabled="disabled"
           :multiple="multiple"
           @change="onChange"/>
  </div>
</template>

<script>
  export default {
    name: "VueFilesDropper",
    props: {
      placeholder: String,
      value:{},
      multiple: Boolean,
      disabled: Boolean
    },
    data: ()=>({
      hover: false,
    }),
    computed: {
      classes(){
        let classes = ['v-files-dropper'];

        if(this.hover)
          classes.push('hover');

        if(this.disabled)
          classes.push('disabled');

        if(this.hover && this.disabled)
          classes.push('error');

        return classes;
      },
      canClear(){
        if(this.disabled)
          return false;

        if(this.multiple && this.value.length)
          return true;

        return !!(!this.multiple && this.value);


      }
    },
    methods:{
      onChange(e){
        this.emit(e.target.files)
      },
      onDrop(e){
        this.emit(e.dataTransfer.files);
        this.hover = false;
      },
      onClick(e){
        if(this.disabled)
          return;

        this.$refs.input.click();
        this.$emit('click', e)
      },
      onClear(){
        if(this.canClear)
          this.clear();
      },
      clear(){
        if(this.multiple && this.value.length){
          this.$emit('change');
          this.$emit('input', [] );
        }else if(!this.multiple && this.value){
          this.$emit('change');
          this.$emit('input', null);
        }
      },
      emit(files){

        this.$emit('change');

        if(!this.multiple)
          return this.$emit('input', files[0]);

        if(!this.value)
          return this.$emit('input', Array.from(files) );

        return this.$emit('input', this.value.concat(Array.from(files)) );
      }
    }
  }
</script>

<style lang="scss">
  .v-files-dropper{
    padding: 1em 2em;
    width: 100%;
    box-sizing: border-box;
    cursor: pointer;
    border: 2px dashed lightgray;
    border-radius: 3px;
    color: gray;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    min-height: 6em;
    position: relative;

    &.disabled{
      cursor: default;
      color: lightgray;
      border-color: rgba(lightgray, .5);
    }

    &:not(.disabled){
      &:hover, &.hover{ background: rgba(lightgray, .3); }
    }

    &.error{cursor: not-allowed}

    &__clear{
      position: absolute;
      right: 0;
      top: 0;
      background: none;
      border: none;
      color: inherit;
      font-size: 1em;
      cursor: pointer;
      &:focus{
        outline: none;
      }
    }

    input{ display: none; }
  }
</style>
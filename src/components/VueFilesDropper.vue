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
           :accept="accept"
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
      disabled: Boolean,
      accept: {
        type:String,
        default: '*/*'
      }
    },
    data: ()=>({
      hover: false
    }),
    computed: {
      classes(){
        let classes = ['v-files-dropper'];

        if(this.hover)
          classes.push('hover');

        if(this.disabled)
          classes.push('disabled');

        if( this.hover && this.disabled )
          classes.push('error');

        return classes;
      },
      acceptMimes(){
        return this.accept.split(',').map(item=>item.trim().split('/'));
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
        this.emit(Array.from(e.target.files));
        this.$emit('change');
      },
      onDrop(e){
        this.emit(Array.from(e.dataTransfer.files));
        this.$emit('change');
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
        this.resetInput();
        if(this.multiple && this.value.length){
          this.$emit('input', [] );
          this.$emit('change');
        }else if(!this.multiple && this.value){
          this.$emit('input', null);
          this.$emit('change');
        }
      },
      resetInput(){
        const input = this.$refs.input;
        input.type = 'text';
        input.type = 'file';
      },
      emit(files){
        if(!this.filesAccept(files))
          return false;

        if(!this.multiple)
          return this.$emit('input', files[0]);

        if(!this.value)
          return this.$emit('input', files );

        return this.$emit('input', Array.from(files) );
      },
      filesAccept(files){
        return files.every((file)=>{
          let type = file.type.split('/');
          return this.acceptMimes.some((accepted)=>{
            if(
              accepted[0] === '*' ||
              (accepted[0] === type[0] && accepted[1] === '*') ||
              (accepted[0] === type[0] && accepted[1] === type[1])
            ){
              return true;
            }

            let error = new Error(`File ${file.name} has not accepted type ${file.type}`);
            this.$emit('error',error);
            throw error;
          });
        });
      }
    }
  }
</script>

<style lang="scss" scoped>
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
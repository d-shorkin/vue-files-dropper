# Vue Files Dropper
Simple input for drop files on vue

## Install
### npm
```
npm install vue-files-dropper --save
```

## Usage
Use it with `v-model` :
```vue
<vue-files-dropper v-model="file">Drop yor file</vue-files-dropper>
```

You can use `multiple` property:
```vue
<vue-files-dropper v-model="file" multiple>Drop yor files</vue-files-dropper>
```

## Customize

You can add class and customize input.
```vue
<vue-files-dropper v-model="file" class="aqua">Drop yor file</vue-files-dropper>
```

```scss
.aqua{
    background: aqua;
    border-color: darken(aqua, 5);
    min-height: 10em;
    transition: 1s;

    &:not(.disabled){
      &:hover, &.hover{
        background: chocolate !important;
        color: white;
        border-color: darken(chocolate, 5);
      }
    }
  }
```
<template>
  <div id="app">
    <h1>Vue files dropper</h1>
    <div class="group">
      <vue-files-dropper v-model="files" multiple class="test" @change="changed++">
        <div v-if="!files.length">
          <small>Custom multiple input</small>
          <br/>Drop files here
        </div>
        <div v-else>
          <span>You added {{files.length}} files</span>
          <div v-for="(file, index) in this.files" :key="index">
            <small>{{file.name}}</small>
          </div>
        </div>
      </vue-files-dropper>
    </div>
    <div class="group">
      <vue-files-dropper v-model="file" @change="changed++">
        <div v-if="!file">Drop your file here</div>
        <div v-else>{{file.name}}</div>
      </vue-files-dropper>
    </div>
    <div class="group">
      <vue-files-dropper disabled>
        This is disabled input
      </vue-files-dropper>
    </div>
    <pre>
      Files changed {{changed}} times.
    </pre>
  </div>
</template>

<script>
  import './components/'

  export default {
    name: 'app',
    watch: {
      files(files) {
        console.log(files)
      }
    },
    data: () => ({
      files: [],
      file: null,
      changed: 0
    }),
  }
</script>

<style lang="scss">
  body {
    margin: 0;
    padding: 0;

  }

  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: rgba(30, 30, 30, 0.98);
    width: 100%;
    max-width: 400px;
    margin: 0 auto;

    h1 {
      text-align: center;
    }
  }

  .test {
    background: aqua;
    border-color: darken(aqua, 5);
    min-height: 10em;
    transition: 1s;

    &:not(.disabled) {
      &:hover, &.hover {
        background: chocolate !important;
        color: white;
        border-color: darken(chocolate, 5);

      }
    }
  }

  .group {
    margin-bottom: 1em;
  }
</style>

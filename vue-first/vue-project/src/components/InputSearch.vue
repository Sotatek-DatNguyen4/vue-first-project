<template>
  <a-form>
    <a-form-item @rules="propRules">
      <a-input
        v-model:value="value"
        allowClear
        @placeholder="placeholder"
        @onChange="onChange"
      />
    </a-form-item>
  </a-form>
  <a-input>

  </a-input>
</template>
<script lang="ts">
  import { defineComponent, ref } from 'vue';
  export default defineComponent({
    props: {
      placeholder: String,
      onChangeSearch: Function,
      propRules: Array,
    },
    setup() {
      const value = ref<string>('');
      const onSearch = _.debounce(async (value) => {
        onChangeSearch(value);
      }, 300);

      const onChange = (e: any) => {
        onSearch(e.target.value);
      };

      return {
        value,
        onChange,
      };
    },
  });
</script>

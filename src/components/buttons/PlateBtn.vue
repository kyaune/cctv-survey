<template>
  <div class="button__container">
    <button :class="{'colored': colored}">
      <div class="button__label">
        {{label}}
      </div>
    </button>
  </div>
</template>
<script>
export default {
  props: {
    label: {
      type: String,
      default: ''
    },
    colored: {
      type: Boolean,
      default: false
    }
  }
}
</script>
<style>

button {
  height: 48px;
  border-radius: 12px;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 21px;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  background: white;
  border: 1px solid #C51F1F;
  color: #C51F1F;
  /*display: flex;*/
  /*justify-content: center;*/
  /*align-items: center;*/
}

.colored {
  border: none;
  background: #C51F1F;
  color: white;
}

.button__label {
  padding: 13px;
}
</style>

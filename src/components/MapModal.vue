<template>
  <div v-if="show" class="modal" @click="$emit('close-outside', $event)">
    <div class="modal-content" @click.stop>
      <h2 class="modal-title">
        <a
          v-if="cityName === 'Florianópolis'"
          :href="itineraryUrl"
          target="_blank"
          title="Where is Lauren?"
        >
          ✈️
        </a>
        {{ cityName }}
      </h2>
      <button
        class="close-button"
        @click="$emit('close')"
        aria-label="Close modal"
      >
        ×
      </button>
      <div v-html="content"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MapModal",
  props: {
    show: {
      type: Boolean,
      default: false,
    },
    cityName: {
      type: String,
      default: "",
    },
    content: {
      type: String,
      default: "",
    },
    itineraryUrl: {
      type: String,
      default: "https://trips.larien.dev",
    },
  },
  emits: ["close", "close-outside"],
};
</script>

<style scoped>
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  padding: 20px;
  border-radius: 10px;
  max-width: 400px;
  text-align: center;
  position: relative;
}

.modal-title {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 10px;
  text-align: center;
  color: #333;
}

.close-button {
  position: absolute;
  top: 10px;
  right: 10px;
  background: transparent;
  border: none;
  font-size: 24px;
  cursor: pointer;
  line-height: 1;
  padding: 5px;
}

.close-button:hover {
  opacity: 0.7;
}
</style>

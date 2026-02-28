<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useSearch } from '@/composables/useSearch'

const { store, onSearch, onEnter, highlight } = useSearch()

const isListening = ref(false)
let recognition: any = null

onMounted(() => {
  const SpeechRecognition =
    (window as any).SpeechRecognition ||
    (window as any).webkitSpeechRecognition

  if (SpeechRecognition) {
    recognition = new SpeechRecognition()
    recognition.lang = 'en-IN' // Change if needed
    recognition.continuous = false
    recognition.interimResults = false

    recognition.onstart = () => {
      isListening.value = true
    }

    recognition.onend = () => {
      isListening.value = false
    }

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript
      store.search = transcript
      onSearch(transcript)
    }

    recognition.onerror = () => {
      isListening.value = false
    }
  }
})

const startVoiceSearch = () => {
  if (!recognition) {
    alert('Voice search not supported in this browser')
    return
  }
  recognition.start()
}
</script>
<template>
  <div class="px-3 pb-2 pt-2">
    <v-autocomplete
      v-model="store.selected"
      v-model:search="store.search"
      :items="store.items"
      :loading="store.loading"
      item-title="label"
      item-value="value"
      density="comfortable"
      variant="outlined"
      rounded="xl"
      clearable
      hide-details
      no-filter
      prepend-inner-icon="mdi-magnify"
      placeholder="Search by Keyword or Product ID"
      @update:search="onSearch"
      @keydown.enter.prevent="onEnter"
    >

      <!-- 🎤 Voice Icon -->
      <template #append-inner>
        <v-icon
          :color="isListening ? 'red' : ''"
          @click="startVoiceSearch"
          style="cursor: pointer"
        >
          {{ isListening ? 'mdi-microphone' : 'mdi-microphone-outline' }}
        </v-icon>
      </template>

      <!-- 🔎 Highlight match -->
      <template #item="{ props, item }">
        <v-list-item v-bind="props">
          <v-list-item-title
            v-html="highlight(item.raw.label)"
          />
        </v-list-item>
      </template>

    </v-autocomplete>
  </div>
</template>
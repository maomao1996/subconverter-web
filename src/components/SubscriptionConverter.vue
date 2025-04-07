<script setup lang="ts">
import { ref, watch } from 'vue'
import { generateSubscriptionLink } from '@/utils'

const subscriptionUrl = ref('')
const convertedUrl = ref('')
const isLoading = ref(false)
const showResult = ref(false)
const showCopyToast = ref(false)

// 监听订阅链接变化，当清空时重置结果
watch(subscriptionUrl, (newValue: string) => {
  if (!newValue) {
    showResult.value = false
    convertedUrl.value = ''
  }
})

function convertSubscription() {
  if (!subscriptionUrl.value) return

  isLoading.value = true
  showResult.value = false

  convertedUrl.value = generateSubscriptionLink(subscriptionUrl.value)

  isLoading.value = false
  showResult.value = true
}

function copyToClipboard() {
  navigator.clipboard
    .writeText(convertedUrl.value)
    .then(() => {
      showCopyToast.value = true
      setTimeout(() => {
        showCopyToast.value = false
      }, 2000)
    })
    .catch((err) => {
      console.error('复制失败：', err)
    })
}
</script>

<template>
  <div class="min-h-screen flex flex-col items-center justify-center bg-base-200 p-4">
    <div class="card w-full max-w-lg bg-base-100 shadow-xl">
      <div class="card-body">
        <h1 class="card-title text-3xl font-bold text-center text-primary">Clash 订阅转换工具</h1>

        <div class="flex justify-between gap-2 mb-3">
          <p class="text-base-content/70 mb-3">茂茂自用的 clash 远程配置文件转换工具</p>
          <a href="https://github.com/maomao1996/dotfiles/blob/main/clash/remote/" target="_blank">
            <img
              src="https://img.shields.io/badge/GitHub-181717?logo=Github&logoColor=fff"
              alt="Github"
            />
          </a>
          <a href="https://notes.fe-mm.com" target="_blank">
            <img
              src="https://img.shields.io/badge/茂茂物语-4ABF8A?logo=Bloglovin&logoColor=fff"
              alt="茂茂物语"
            />
          </a>
        </div>

        <div class="divider"></div>

        <div class="flex items-center justify-between">
          <h2 class="text-xl font-semibold mb-2 flex items-center">
            <span class="badge badge-primary mr-2">1</span>
            订阅转换
          </h2>
          <a
            href="https://xn--clouds-o43k.com/#/register?code=07YceqZM"
            target="_blank"
            class="btn btn-sm btn-outline btn-secondary gap-1"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-4 w-4"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3z"
              />
              <path
                d="M16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"
              />
            </svg>
            购买订阅
          </a>
        </div>

        <div class="form-control w-full">
          <label class="label mb-2">
            <span class="label-text font-medium">输入订阅链接</span>
          </label>
          <input
            v-model="subscriptionUrl"
            type="text"
            placeholder="请输入您的订阅URL"
            class="input input-bordered input-primary w-full focus:outline-none"
            @keyup.enter="convertSubscription"
          />
        </div>

        <button
          @click="convertSubscription"
          class="btn btn-primary mt-6 w-full gap-2"
          :class="{ 'btn-disabled': !subscriptionUrl || isLoading, loading: isLoading }"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
            v-if="!isLoading"
          >
            <path
              fill-rule="evenodd"
              d="M10 3a1 1 0 00-1 1v5H4a1 1 0 100 2h5v5a1 1 0 102 0v-5h5a1 1 0 100-2h-5V4a1 1 0 00-1-1z"
              clip-rule="evenodd"
            />
          </svg>
          {{ isLoading ? '转换中...' : '生成转换链接' }}
        </button>

        <div v-if="showResult" class="mt-8 animate-fade-in">
          <div class="divider"></div>

          <h2 class="text-xl font-semibold mb-4 flex items-center">
            <span class="badge badge-success mr-2">2</span>
            转换结果
          </h2>

          <div class="alert alert-success shadow-lg mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="stroke-current flex-shrink-0 h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>转换成功! 可以复制以下链接使用。</span>
          </div>

          <div class="form-control mt-2">
            <label class="label mb-2">
              <span class="label-text font-medium">转换后的链接</span>
            </label>
            <div class="flex w-full">
              <input
                readonly
                :value="convertedUrl"
                class="input input-bordered flex-grow rounded-r-none focus:outline-none"
              />
              <button @click="copyToClipboard" class="btn btn-primary rounded-l-none gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
                  <path
                    d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z"
                  />
                </svg>
                复制
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 复制成功提示 -->
    <div class="toast toast-end" v-if="showCopyToast">
      <div class="alert alert-success">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M5 13l4 4L19 7"
          />
        </svg>
        <span>链接已复制到剪贴板!</span>
      </div>
    </div>
  </div>
</template>

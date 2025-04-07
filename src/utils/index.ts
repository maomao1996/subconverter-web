import { SUBSCRIPTION_CONVERT_URL, CONFIG_URL } from '@/constants'

/* 生成订阅链接 */
export function generateSubscriptionLink(url: string) {
  return `${SUBSCRIPTION_CONVERT_URL}/sub?target=clash&url=${encodeURIComponent(url)}&config=${encodeURIComponent(CONFIG_URL)}&insert=false&emoji=true&list=false&xudp=true&udp=true&tfo=true&expand=true&scv=false&fdn=false&clash.doh=true&new_name=true`
}

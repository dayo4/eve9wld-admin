import { ReadQueue } from './ReadQueue'
import { reactive } from 'vue'

export const $ReadQueue = reactive(new ReadQueue())

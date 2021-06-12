import { reactive } from 'vue'


import { LoadingProcessNotification } from './ProcessMgr'
import { Notify } from './Notify'
import { $Confirm } from './Confirm'
import { InputModal } from './InputModal'

const $Process = reactive(new LoadingProcessNotification())
const $Notify = reactive(new Notify())


const $InputModal = reactive(new InputModal())

export {
    $Process,
    $Notify,
    $Confirm,
    $InputModal
}
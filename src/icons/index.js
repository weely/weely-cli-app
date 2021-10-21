import SvgIcon from '@/components/SvgIcon'
import { Icon } from '@iconify/vue'

const req = require.context('./svg', false, /\.svg$/)
const requireAll = requireContext => requireContext.keys().map(requireContext)
requireAll(req)

function install(app) {
  app.component('svg-icon', SvgIcon)
  app.component('Icon', Icon)
}

export default {
    install
}


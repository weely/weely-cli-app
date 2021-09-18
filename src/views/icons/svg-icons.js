const modulesFiles = require.context('@/icons/svg', false, /\.svg$/)
const requireAll = requireContext => requireContext.keys()

const re = /\.\/(.*)\.svg/

const svgIcons = requireAll(modulesFiles).map(i => {
  return i.match(re)[1]
})

export default svgIcons

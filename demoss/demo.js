const { SHA256, enc } = require('crypto-js')

function encryBas464Sha256(str) {
    return enc.Base64.stringify(SHA256(str)).replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_")
}

const randomStr = '1111111111111213123131231sdaasd12aadfsadf23fasdvasvsafsadfqer23fdfasdcsdc'

console.log(encryBas464Sha256(randomStr))

const data = [
    {path: '/exportInfo', component: 'exportInfo'},
	{path: '/bulkchanges', component: 'bulkchanges'},
	{path: '/deviceInfo', component: 'deviceInfo'},
	{path: '/opentrack', component: 'opentrack'},
	{path: '/modifypwd', component: 'modifypwd'},
	{path: '/card', component: 'card'},
	{path: '/icon', component: 'icon'},
	{path: '/cmd', component: 'cmd'},
	{path: '/alert', component: 'alert'},
	{path: '/alertset', component: 'alertset'},
	{path: '/customerService', component: 'customerService'},
	{path: '/repairHandle', component: 'repairHandle'},
	{path: '/repairStatistics', component: 'repairStatistics'},
	{path: '/gpsSearch', component: 'gpsSearch'},
	{path: '/instantMsg', component: 'instantMsg'},
	{path: '/userInfoSearch', component: 'userInfoSearch'},
	{path: '/customerInfoSearch', component: 'customerInfoSearch'},
	{path: '/onlineStatistics', component: 'onlineStatistics'},
	{path: '/gpsOnMap', component: 'gpsOnMap'},
	{path: '/appPay', component: 'appPay'},
	{path: '/parkingState', component: 'parkingState' },	
	{path: '/dealerService', component: 'dealerService'},
	{path: '/financeService', component: 'dealerService'},
	{path: '/facilityTransferRecord', component: 'facilityTransferRecord'},
	{path: '/factoryManage', component: 'factoryManage'},
	{path: '/accountTransferRecord', component: 'accountTransferRecord'},
	{path: '/changeEquipmentNameRecord', component: 'changeEquipmentNameRecord'},
	{path: '/modifyOwnPwd', component: 'modifyOwnPwd' },
	{path: '/outbound', component: 'outbound' },
	{path: '/addDevice', component: 'addDevice' },
	{path: '/addDistributor', component: 'addDistributor' },
	{path: '/equipmentOrder', component: 'equipmentOrder' },
	{path: '/saleStats', component: 'saleStats' },
	{path: '/sellReturn', component: 'sellReturn' },
	{path: '/paramsSetting', component: 'paramsSetting' },
	{path: '/IMEISearch', component: 'IMEISearch' },
	{path: '/stock', component: 'stock', meta: {title: '库存', authId: '30010006' } },
	{path: '/supplier', component: 'supplier', meta: {title: '供应商管理', authId: '30010002' } },
	{path: '/materials', component: 'materials', meta: {title: '物料管理', authId: '30010003' } },
	{path: '/purchaseOrder', component: 'inOrder', meta: {title: '采购订单', authId: '30010005' } },
	{path: '/orderWarehouse', component: 'orderWarehouse', meta: {title: '收货入库记录', authId: '30010005' } },
	{path: '/materialApply', component: 'materialApply', meta: {title: '申请领料', authId: '30010006' } },
	{path: '/outMaterial', component: 'outMaterial', meta: {title: '领料管理', authId: '30010007' } },
    {path: '/feedbacks', component: 'feedbackList', meta: {title: '用户反馈问题列表', authId: '20060300' } },
	{path: '/openipAuth', component: 'openapiAuth', meta: {title: 'openapi 授权管理', authId: '30010008' } },
    // { path: '/inbound', component: inbound },
	// { path: '/bom', component: bomManage, meta: {title: 'BOM 管理', authId: '30010004' } },
	// { path: '/order-receive', component: inOrder, meta: {title: '订单收货', authId: '30010005' } },
]


const ddd = data.map(item => {
    item.children = [
        {
            path: item.path,
            component: resolve => require(['../views/' + item.component],resolve),
            name: item.component,
            meta: {
                title: '',
            },
        }
    ]
    item.component = 'Layout'
    return item
})
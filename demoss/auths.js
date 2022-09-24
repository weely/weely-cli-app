const router = [
	{
    "path": "/feedback-list",
    "component": 'Layout',
    "meta": { "title": "用户反馈列表", },
    "children": [
      {
        "path": "feedback-list",
        "name": "feedbackList",
        "meta": { "title": "用户反馈列表", authId: '117101' }
      }
    ]
  },
	// 设备信息
  {
    "path": "/devices",
    "component": 'Layout',
		"meta": { title: '设备信息' },
    "children": [
      {
        "path": "exportInfo",
        "name": "exportInfo",
        "meta": {
          "title": "导出设备信息", authId: '100101'
        }
      },
			{
				"path": "gpsSearch",
				"name": "gpsSearch",
				"meta": {
					"title": "GPS数据查询", authId: '100102'
				}
			},
			{
				"path": "instantMsg",
				"name": "instantMsg",
				"meta": {
					"title": "即时查询", authId: '100103'
				}
			},
			{
				"path": "userInfoSearch",
				"name": "userInfoSearch",
				"meta": {
					"title": "设备信息查询", authId: '100104'
				}
			},
			{
				"path": "onlineStatistics",
				"name": "onlineStatistics",
				"meta": {
					"title": "在线统计", authId: '100105'
				}
			},
			{
				"path": "gpsOnMap",
				"name": "gpsOnMap",
				"meta": {
					"title": "地图展示GPS", authId: '100106'
				}
			}
    ]
  },
	{
    "path": "/records",
    "component": 'Layout',
		"meta": { title: '操作记录' },
    "children": [
      {
        "path": "facilityTransferRecord",
        "name": "facilityTransferRecord",
        "meta": {
          "title": "设备转移记录", authId: '101101'
        }
      },
			{
				"path": "accountTransferRecord",
				"name": "accountTransferRecord",
				"meta": {
					"title": "账号转移记录", authId: '101102'
				}
			},
			{
				"path": "changeEquipmentNameRecord",
				"name": "changeEquipmentNameRecord",
				"meta": {
					"title": "修改设备名称记录", authId: '101103'
				}
			},
			{
				"path": "equipmentOrder",
				"name": "equipmentOrder",
				"meta": {
					"title": "设备指令记录", authId: '101104'
				}
			}
    ]
  },
	{
    "path": "/alert",
    "component": 'Layout',
		"meta": { title: '报警信息' },
    "children": [
      {
        "path": "alert",
        "name": "alert",
        "meta": { "title": "查询报警信息", authId: '102101' }
      },
			{
        "path": "alertset",
        "name": "alertset",
        "meta": { "title": "设备指令记录", authId: '102102' }
      }
    ]
  },
	{
    "path": "/auths",
    "component": 'Layout',
		"meta": { title: '权限管理' },
    "children": [
      {
        "path": "customerService",
        "name": "customerService",
        "meta": { "title": "客服管理", authId: '103101' }
      },
			{
				"path": "dealerService",
				"name": "dealerService",
				"meta": { "title": "经销商管理", authId: '103102' }
			},
			{
				"path": "financeService",
				"name": "financeService",
				"meta": { "title": "金融平台管理", authId: '103103' }
			}
    ]
  },
	{
    "path": "/repair",
    "component": 'Layout',
		"meta": { title: '返修管理' },
    "children": [
      {
        "path": "repairHandle",
        "name": "repairHandle",
        "meta": { "title": "返修", authId: '104101' }
      },
			{
        "path": "repairStatistics",
        "name": "repairStatistics",
        "meta": { "title": "返修统计", authId: '104102' }
      },
			{
				"path": "/factoryManage",
				"name": "factoryManage",
				"meta": { "title": "厂商管理", authId: '104103' }
			}
    ]
  },
  {
    "path": "/bulkchanges",
    "component": 'Layout',
		"meta": { title: '用户到期设置' },
    "children": [
      {
        "path": "bulkchanges",
        "name": "bulkchanges",
        "meta": { "title": "用户到期设置", authId: '105101' }
      }
    ]
  },
	{
    "path": "/opentrack",
    "component": 'Layout',
		"meta": { title: '开通轨迹' },
    "children": [
      {
        "path": "opentrack",
        "name": "opentrack",
        "meta": { title: '开通轨迹', authId: '106101' },
      }
    ]
  },

  {
    "path": "/modifypwd",
    "component": 'Layout',
		"meta": { title: '批量修改密码' },
    "children": [
      {
        "path": "modifypwd",
        "name": "modifypwd",
        "meta": { "title": "批量修改密码", authId: '108101' }
      }
    ]
  },
  {
    "path": "/card",
    "component": 'Layout',
		"meta": { title: '充值卡' },
    "children": [
      {
        "path": "card",
        "name": "card",
        "meta": { "title": "充值卡", authId: '109101' }
      }
    ]
  },
  {
    "path": "/icon",
    "component": 'Layout',
		"meta": { title: '上传图标' },
    "children": [
      {
        "path": "icon",
        "name": "icon",
        "meta": { "title": "上传图标", authId: '110101' }
      }
    ]
  },
  {
    "path": "/cmd",
    "component": 'Layout',
		"meta": { title: '下发指令' },
    "children": [
      {
        "path": "cmd",
        "name": "cmd",
        "meta": { "title": "下发指令", authId: '111101' }
      }
    ]
  },
  {
    "path": "/appPay",
    "component": 'Layout',
		"meta": { title: '平台费代收管理' },
    "children": [
      {
        "path": "appPay",
        "name": "appPay",
        "meta": { "title": "平台费代收管理", authId: '112101' }
      }
    ]
  },
  {
    "path": "/parkingState",
    "component": 'Layout',
		"meta": { title: '未熄火停留状态' },
    "children": [
      {
        "path": "parkingState",
        "name": "parkingState",
        "meta": { "title": "未熄火停留状态", authId: '113101' }
      }
    ]
  },
  {
    "path": "/paramsSetting",
    "component": 'Layout',
		"meta": { title: '参数设置' },
    "children": [
      {
        "path": "paramsSetting",
        "name": "paramsSetting",
				"meta": { title: '参数设置', authId: '114101' },
      }
    ]
  },
	{
    "path": "/outInGoods",
    "component": 'Layout',
		"meta": { title: '入库发货' },
    "children": [
      {
        "path": "addDistributor",
        "name": "addDistributor",
        "meta": { "title": "增加销售经销商", authId: '115101'  }
      },
			{
				"path": "addDevice",
				"name": "addDevice",
				"meta": { "title": "增加销售设备型号", authId: '115102'  }
			},
			{
				"path": "sellReturn",
				"name": "sellReturn",
				"meta": { "title": "退货查询系统", authId: '115103'  }
			},
			{
				"path": "outbound",
				"name": "outbound",
				"meta": { "title": "发货", authId: '115104'  }
			},
			{
				"path": "saleStats",
				"name": "saleStats",
				"meta": { "title": "发货统计", authId: '115105'  }
			},
			{
				"path": "IMEISearch",
				"name": "IMEISearch",
				"meta": { "title": "发货查询", authId: '115105' }
			},
    ]
  },
	{
    "path": "/materialManage",
    "component": 'Layout',
		"meta": { title: '物料管理' },
    "children": [
      {
        "path": "supplier",
        "name": "supplier",
				"meta": { "title": "供应商管理", authId: '116101' }
      },
			{
				"path": "materials",
				"name": 'materials',
				"meta": { "title": "物料管理", "authId": "116102" },
			},
			{
				"path": "purchase-order",
				"name": 'purchaseOrder',
				"meta": { "title": "采购订单", "authId": "116103" },
			},
			{
				"path": "order-warehouse",
				"name": "orderWarehouse",
				"meta": { "title": "收货入库记录", "authId": "116104" },
			},
			{
				"path": "/stock",
				"name": "stock",
				"meta": { "title": "库存", "authId": "116105"	},
			},
			{
				"path": "/material-apply",
				"name": "materialApply",
				"meta": { "title": "申请领料", 	"authId": "116106" },
			},
			{
				"path": "/out-material",
				"name": "outMaterial",
				"meta": { "title": "领料管理", 	"authId": "116107" },
			},
    ]
  },
  
  {
    "path": "/customerInfoSearch",
    "component": 'Layout',
		"hidden": 'true',
    "children": [
      {
        "path": "/customerInfoSearch",
        "name": "customerInfoSearch",
				"meta": { "title": "客户信息查询", 	"authId": "119101" },
      }
    ]
  },
  {
    "path": "/openip-auth",
    "component": 'Layout',
    "meta": { "title": "openapi 授权管理" },
    "children": [
      {
        "path": "/openip-auth",
        "name": "openapiAuth",
				"meta": { "title": "领料管理", 	"authId": "118101" },
      }
    ]
  },
	// {
  //   "path": "/modifyOwnPwd",
  //   "component": 'modifyOwnPwd',
	// 	"name": "modifyOwnPwd",
  //   "meta": { "title": "修改密码",  },
  // },
	{
		"path": "/deviceInfo",
		"name": "deviceInfo",
		"component": 'deviceInfo',
		"meta": { "title": "设备查询", authId: '107101' },
		hidden: 'true'
	},
];

// var res = router.reduce((pre,cur)=>{
// 	cur.children.forEach((item)=>{
// 		pre[item.meta.authId] = item.meta.title
// 	})

// 	return pre
// }, {})

for (let route of router) {
  if (typeof route.children !== 'undefined') {
    route.children.map((item)=> {
      item.component = `resolve => require(['../views/${item.path}'],resolve)`
      return item
    })
  } else {
    route.component = `resolve => require(['../views/${route.component}'],resolve)`
  }
}
<template>
 <!-- 面包屑组件 -->
 <breadCrumb ref="breadcrumb" :item="item" ></breadCrumb>
 <!-- 外壳 -->
 <div class="overview-wrapped">
    <!-- 顶部内容外壳 -->
    <div class="top-content-wrapped">
        <!-- 头像基本信息外壳 -->
        <div class="person-infor">
            <!--头像外壳  -->
            <div class="person-avatar-wrapped">
                <el-avatar :size="100" :src="userStore.imageUrl"></el-avatar>
                <span class="department">所属部门：{{ accountData.department }}</span>
                <div class="company">所属公司：上海鹰角网络科技有限公司</div>
            </div>
            <!-- 中间的竖线 -->
             <div class="line-wrapped">
                <div class="line"></div>
             </div>
             <!-- 左边详细信息 -->
              <div class="detail-infor-wrapped">
                <p>姓名：{{accountData.name}}</p>
                <p>性别：{{accountData.sex}}</p>
                <p>身份：{{accountData.identity}}</p>
                <p>分管领域：超级管理</p>
                <p>权限：最高权限</p>
              </div>
        </div>
        <!-- 个人详细信息 -->
        <div class="manage-user pie" id="manage-user"></div>
    </div>
    <!-- 中间内容外壳 -->
    <div class="mid-content-wrapped">
        <div class="product-category-bar mid-content-left" id="product-category-bar"></div>
        <div class="mid-content-right">
            <div class="title">常用管理</div>
            <el-row :gutter="20">
                <el-col :span="6"><div class="button-area">
                    <el-icon><Coin /></el-icon>
                    <span class="button-name">用户管理</span>
                </div></el-col>
                <el-col :span="6"><div class="button-area">
                    <el-icon><Files /></el-icon>
                    <span class="button-name">产品管理</span>
                </div></el-col>
                <el-col :span="6"><div class="button-area">
                    <el-icon><ChatRound /></el-icon>
                    <span class="button-name">系统消息</span>
                </div></el-col>
                <el-col :span="6"><div class="button-area">
                    <el-icon><User /></el-icon>
                    <span class="button-name">个人信息</span>
                </div></el-col>
                <el-col :span="6"><div class="button-area">
                    <el-icon><Message /></el-icon>
                    <span class="button-name">部门信息</span>
                </div></el-col>
                <el-col :span="6"><div class="button-area">
                    <el-icon><Burger /></el-icon>
                    <span class="button-name">系统设置</span>
                </div></el-col>
               
            </el-row>
        </div>
    </div>
    <!-- 底部内容外壳 -->
    <div class="footer-content-wrapped">
        <div class="massage-level footer-content-left" id="massage-level"></div>
        <div class="userlogin-week footer-content-right" id="userlogin-week"></div>
    </div>
 </div>
</template>

<script lang="ts" setup>
 /* 引入面包屑 */
import breadCrumb from '@/components/breadCrumb.vue'
import {  reactive,ref,onMounted} from 'vue'
 const breadcrumb=ref()
 const item=ref({
    frist:'系统概览',
 })
 //头像
 //const imageUrl=ref()
 import {useUserInFor} from '@/store/userInfor'
/* import {bind} from '@/api/userInfor' */
const userStore=useUserInFor()
//获取用户信息
import {getUserInfor} from '@/api/userInfor.js'
const getUserinfor=async()=>{
    const res=await getUserInfor(localStorage.getItem('id'))
    accountData.name=res.name
    accountData.sex=res.sex
    accountData.identity=res.identity
    accountData.department=res.department
}
getUserinfor()
interface userData{
    identity:string,
    department:string,
    name:string,
    sex:string,
    
}
const accountData:userData=reactive({
  identity:'',
  department:'',
  name:'',
  sex:'',
  
})
import {getCategoryAndNumber,
	getLevelAndNumber,
	getAdminAndNumber,
	getDayAndNumber
} from '@/api/overview.js'
 // 调用echarts图
 onMounted(() => {
		manageUser()
		productCategoryBar()
		massageLevel()
		massageAllDay()
	})
//饼图
import * as echarts from 'echarts';
// 管理员与用户比值图 饼图
//const data =ref()
const manageUser =async () => {
	// 通过类名 初始化
		const mu = echarts.init(document.getElementById('manage-user'))
		//显示加载中
		mu.showLoading()
	//数据
	let data=await getAdminAndNumber()
		mu.hideLoading()

		//document.getElementById('manage-user').setAttribute('_echarts_instance_', '')
		// 设置基本的参数
			mu.setOption({
				title: {
					text: '管理与用户对比图',
					// subtext: 'Fake Data'
					//left: 'center',
				},
				tooltip: {
					trigger: 'item'
				},
				legend: {
					orient: 'vertical',
					left: 'right',
					padding: [20, 20, 20, 20]
				},
				series: [
					{
						// name: 'Access From',
						type: 'pie',
						radius: '65%',
                        data:data.data,
						emphasis: {
							itemStyle: {
								shadowBlur: 10,
								shadowOffsetX: 0,
								shadowColor: 'rgba(0, 0, 0, 0.5)'
							}
						}
					}
				]
			})
		// 用于echarts响应式
		window.addEventListener('resize', function () {
			mu.resize()
		})
	}
// 产品类别图 柱状图
const productCategoryBar = async () => {
		const pcb = echarts.init(document.getElementById('product-category-bar'))
		pcb.showLoading()
	//数据
	let data=await getCategoryAndNumber()
	pcb.hideLoading()
		//document.querySelector('.product-category-bar').setAttribute('_echarts_instance_', '')
			pcb.setOption({
				title: {
					text: "产品类别库存总价图",
					top: "3%",
					textStyle: {
						fontSize: 16
					},
				},
				tooltip: {
					trigger: 'axis',
				},
				xAxis: {
					type: 'category',
					// 食品类，服装类，鞋帽类，日用品类，家具类，家用电器类，纺织品类，五金类
                    data: data.category
				},
				yAxis: {
					type: 'value'

				},
				series: [
					{
						data:data.price ,
						type: 'bar',
						barWidth: 40,
						colorBy: "data"
					},
				]
			})
		window.addEventListener('resize', function () {
			pcb.resize()
		})
	}
// 公告等级分布图 饼图
const massageLevel = async() => {
		const ml = echarts.init(document.getElementById('massage-level'))
		ml.showLoading()
	//数据
	let data=await getLevelAndNumber()
	ml.hideLoading()
		//document.querySelector('.massage-level').setAttribute('_echarts_instance_', '')
			ml.setOption({
				title: {
					text: "公告等级分布图",
					top: "3%",
					textStyle: {
						fontSize: 16
					},
				},
                tooltip: {
                        trigger: 'item'
                    },
                    legend: {
                        bottom: '5%',
                        left:'1%',
                        orient: 'vertical',
                    },
                    series: [
                        {
                        name: 'Access From',
                        type: 'pie',
                        //饼图内外半径
                        radius: ['40%', '70%'],
                        //饼图中心点位置，靠右
                        center: ['65%', '50%'],
                        avoidLabelOverlap: false,
                        label: {
                            show: false,
                            position: 'center'
                        },
                        emphasis: {
                            label: {
                            show: true,
                            fontSize: 40,
                            fontWeight: 'bold'
                            }
                        },
                        labelLine: {
                            show: false
                        },
                        data: data.data
					}
				]
			})
		window.addEventListener('resize', function () {
			ml.resize()
		})
	}
// 消息每日总量图 折线图
const massageAllDay = async() => {
	/* // 底部日期的实现
		let dd = new Date()
		let week = []
		for (let i = 1; i < 8; i++) {
			dd.setDate(dd.getDate() - 1)
			// 得到日期并且把斜杠替换成横杠
			week.push(dd.toLocaleDateString().replace(/\//g, "-"))
		}

		let number = []
		week.forEach(async (e) => {
			// 如果在Moment中不加'YYYY-MM-DD'会提示警告
			let day = moment(e, 'YYYY-MM-DD').format('YYYY-MM-DD')
			// 调用每天登录人数的接口
			const res = await everydaynumberofpeople(day)
			number.push(res.number)
		}) */
		const mad = echarts.init(document.getElementById('userlogin-week'))
		mad.showLoading()
	//数据
	let data=await getDayAndNumber()
	mad.hideLoading()
		//document.querySelector('.massage-all-day').setAttribute('_echarts_instance_', '')
			mad.setOption({
				title: {
					text: "每日登录人数图",
					top: "3%",
					textStyle: {
						fontSize: 16
					},
				},
				tooltip: {
					trigger: 'item'
				},
				xAxis: {
					type: 'category',
                    data: data.week
				},
				yAxis: {
					type: 'value'
				},
				series: [
					{
                        data: data.number,
						type: 'line'
					}
				]
			})
		window.addEventListener('resize', function () {
			mad.resize()
		})
	}
</script>


<style lang="scss" scoped>

	// 总览内容
	.overview-wrapped {
		padding: 8px;
		height: calc(100vh - 101px);
		background: #f8f8f8;

		// 上部分内容 个人资料 + 饼状图
		.top-content-wrapped {
			height: 30%;
			display: flex;

			// 个人信息
			.person-infor {
                /* 感觉不能用这个，高度不太固定，放大缩小之后变形 */
				height: 100%;
				margin-right: 8px;
				width: calc(50% - 8px);
				display: flex;
				background: #fff;

				// 头像区域
				.person-avatar-wrapped {
					display: flex;
					width: 50%;
					height: 100%;
					justify-content: center;
					align-items: center;
					flex-direction: column;

					// 公司
					.company {
						margin: 10px 0px;
						font-size: 12px;
					}

					// 职务 部门
					.department {
						margin-top: 8px;
						font-size: 12px;
					}

				}

				// 分割线
				.line-wrapped {
					height: 100%;
					display: flex;
					align-items: center;

					.line {
						height: 170px;
						border: 1px solid #D3D3D3;
					}
				}

				// 详细信息区域
				.detail-infor-wrapped {
					height: 100%;
					width: calc(50% - 1px);
					margin-left: 50px;
					font-size: 12px;
					display: flex;
					flex-direction: column;
					align-items: flex-start;
					justify-content: center;
                    p{
                        margin: 8px;
                    }
				}
			}

			// 饼状图
			.pie {
				width: calc(50%);
				height: 100%;
				background: #fff;
			}
		}

		// 中间部分内容 消息阅读量图 产品类别图
		.mid-content-wrapped {
			margin-top: 8px;
			height: calc(32% - 8px);
			display: flex;

			// 中间左部分
			.mid-content-left {
				margin-right: 8px;
				width: calc(60% - 8px);
				background: #fff;
			}

			// 中间右部分
			.mid-content-right {
				width: calc(40%);
				background: #fff;
				padding: 8px;

				// 标题
				.title {
					font-size: 14px;
					margin-bottom: 8px;
				}

				// 按钮区域
				.button-area {
					margin-bottom: 8px;
					height: 60px;
					display: flex;
					flex-direction: column;
					justify-content: center;
					align-items: center;
					cursor: pointer;
					background: #F5F5F5;

					// 按钮名字
					.button-name {
						margin-top: 10px;
					}
				}

				// 按钮变色
				.button-area:hover {
					background: #e4efff;
				}
			}
		}

		// 底部内容
		.footer-content-wrapped {
			margin-top: 8px;
			height: calc(38% - 8px);
			display: flex;

			// 底部左部分
			.footer-content-left {
				margin-right: 8px;
				height:100%;
				width: calc(30% - 8px);
				background: #fff;
			}

			// 底部右部分
			.footer-content-right {
				height:100%;
				width: calc(70%);
				background: #fff;
			}
		}
	}


</style>
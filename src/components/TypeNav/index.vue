<template>
    <!-- 商品分类导航 -->
    <div class="type-nav">
        <div class="container">
            <!-- 事件委派 -->
            <div @mouseleave="leaveShow" @mouseenter="enterShow">
                <h2 class="all">全部商品分类</h2>
                <!-- 过渡动画 -->
                <transition name="sort">
                    <!-- 三级联动 -->
                    <div class="sort" v-show="show">
                        <div class="all-sort-list2" @click="goSearch">
                            <div class="item" v-for="(c1, index) in categoryList" :key="c1.categoryId"
                                :class="{ cur: currentIndex == index }">
                                <h3 @mouseenter="changeIndex(index)">
                                    <a :data-categoryName="c1.categoryName" :data-category1Id="c1.categoryId">{{
                                        c1.categoryName }}</a>
                                </h3>
                                <!-- 二级、三级分类 -->
                                <div class="item-list clearfix"
                                    :style="{display:currentIndex == index ? 'block' : 'none'}">
                                    <div class="subitem" v-for="(c2, index) in c1.categoryChild" :key="c2.categoryId">
                                        <dl class="fore">
                                            <dt>
                                                <a :data-categoryName="c2.categoryName"
                                                    :data-category2Id="c2.categoryId">{{
                                                    c2.categoryName }}</a>
                                            </dt>
                                            <dd>
                                                <em v-for="(c3, index) in c2.categoryChild" :key="c3.categoryId">
                                                    <a :data-categoryName="c3.categoryName"
                                                        :data-category3Id="c3.categoryId">{{ c3.categoryName }}</a>
                                                </em>
                                            </dd>
                                        </dl>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </transition>
            </div>
            <nav class="nav">
                <a href="###">服装城</a>
                <a href="###">美妆馆</a>
                <a href="###">尚品汇超市</a>
                <a href="###">全球购</a>
                <a href="###">闪购</a>
                <a href="###">团购</a>
                <a href="###">有趣</a>
                <a href="###">秒杀</a>
            </nav>
        </div>
    </div>
</template>

<script>
import {mapState} from 'vuex'
//这种引入方式是把lodash全部功能函数引入
//最好的引入是按需引入
import throttle from 'lodash/throttle'
export default {
    name: 'TypeNav',
    data(){
        return{
            //存储用户鼠标一上哪一个一级分类
            currentIndex: -1,
            show: true
        }
    },
    //组件挂载完毕，向服务器法请求
    mounted() {
        
        //当组件挂载完毕，show的属性变成false
        //如果不是Home路由组件，将TypeNav隐藏
        if(this.$route.path != '/home') {
            this.show = false
        }
    },
    computed: {
        ...mapState({
            //对象的写法右侧是函数，当使用这个计算函数时候，右侧函数会立即执行一次
            //注入一个参数state，其实为大仓库数据
            categoryList: state => state.home.categoryList
        })
    },
    methods: {
        //鼠标进入修改响应式数据currentIndex属性
        // changeIndex(index){
        //     //index:鼠标移上某一个以及分类的元素的索引值
        //     //正常：用户慢慢操作：鼠标进入，每个一级分类h3,都会触发鼠标进入事件
        //     //非正常：用户操作快，应该进入鼠标事件，但经过测试，只有部分h3触发
        //     //出现卡顿----防抖
        //     this.currentIndex = index
        //     console.log('鼠标进入', index);
        // },
        changeIndex:throttle(function(index){
            this.currentIndex = index
        }, 50),
        //一级分类鼠标移除的事件回调
        leaveIndex(){
            //鼠标移除currentIdex，变为-1
            this.currentIndex = -1
            // console.log('666');
        },
        goSearch(event) {
            //进行路由跳转的方法,最好用编程式导航+事件委派
            //利用事件委派存在一些问题：1：点击的一定是a标签？ 2：如何获取参数？【1/2/3】
            //是把全部子节点【h3/dt、dl】的事件委派给父亲节点
            //点击a标签的时候，才会进行路由跳转【怎么确定点击的一定是a标签】
            //存在的另外一个问题：及时能确定的是a标签，如何区分是一级、二级、三级标签

            //第一个问题：把子节点中a标签，我加上自定义属性data-categoryName，其余节点没有
            let element = event.target
            //获取到当前出发这个时间的节点，需要带有data-categoryName这样节点【一定是a标签】
            //节点有一个dataset属性，可以获取节点的自定义属性与属性值
            let { categoryname, category1id, category2id, category3id } = element.dataset
            //如果标签身上拥有categoryname一定是a标签
            if (categoryname) {
                //整理路由跳转的参数
                let location = {name: 'search'}
                let query = {categoryName: categoryname}
                //一级、二级、三级分类的a标签
                if (category1id) {
                    query.category1Id = category1id
                } else if(category2id) {
                    query.category2Id = category2id
                } else{
                    query.category3Id = category3id
                }
                //如果在路由跳转的时候带有params参数，捎带传递过去
                if(this.$route.params) {
                    location.params = this.$route.params
                    //整理完参数、
                    location.query = query
                    //路由跳转
                    this.$router.push(location)
                }
            }
        },
        //当鼠标移入的时候，让商品列表进行展示
        enterShow() {
            if (this.$route.path != '/home') {
                this.show = true
            }
        },
        //当鼠标离开的时候，让商品列表进行隐藏
        leaveShow() {
            this.currentIndex = -1
            //判断是Search路由组件才会执行
            if (this.$route.path != '/home') {
                this.show = false
            }
        }
    },
}
</script>

<style scoped lang="less">


.type-nav {
    border-bottom: 2px solid #e1251b;

    .container {
        width: 1200px;
        margin: 0 auto;
        display: flex;
        position: relative;

        .all {
            width: 210px;
            height: 45px;
            background-color: #e1251b;
            line-height: 45px;
            text-align: center;
            color: #fff;
            font-size: 14px;
            font-weight: bold;
        }

        .nav {
            a {
                height: 45px;
                margin: 0 22px;
                line-height: 45px;
                font-size: 16px;
                color: #333;
            }
        }

        .sort {
            position: absolute;
            left: 0;
            top: 45px;
            width: 210px;
            height: 461px;
            position: absolute;
            background: #fafafa;
            z-index: 999;

            .all-sort-list2 {
                .item {
                    h3 {
                        line-height: 27px;
                        font-size: 14px;
                        font-weight: 400;
                        overflow: hidden;
                        padding: 0 20px;
                        margin: 0;

                        a {
                            color: #333;
                        }
                    }

                    .item-list {
                        display: none;
                        position: absolute;
                        width: 734px;
                        min-height: 460px;
                        background: #f7f7f7;
                        left: 210px;
                        border: 1px solid #ddd;
                        top: 0;
                        z-index: 9999 !important;

                        .subitem {
                            float: left;
                            width: 650px;
                            padding: 0 4px 0 8px;

                            dl {
                                border-top: 1px solid #eee;
                                padding: 6px 0;
                                overflow: hidden;
                                zoom: 1;

                                &.fore {
                                    border-top: 0;
                                }

                                dt {
                                    float: left;
                                    width: 54px;
                                    line-height: 22px;
                                    text-align: right;
                                    padding: 3px 6px 0 0;
                                    font-weight: 700;
                                }

                                dd {
                                    float: left;
                                    width: 415px;
                                    padding: 3px 0 0;
                                    overflow: hidden;

                                    em {
                                        float: left;
                                        height: 14px;
                                        line-height: 14px;
                                        padding: 0 8px;
                                        margin-top: 5px;
                                        border-left: 1px solid #ccc;
                                    }
                                }
                            }
                        }
                    }
                }

                .cur{
                    background-color: skyblue;
                }
            }
        }
        //过渡动画样式
        //过渡动画开始状态
        .sort-enter {
            height: 0;
        }
        //过渡动画结束状态
        .sort-enter-to {
            height: 461px;
        }
        //定义动画时间、速率
        .sort-enter-active{
            transition: all 0.5s linear;
        }
    }
}
</style>
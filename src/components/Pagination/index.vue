<template>
    <div class="pagination">
        <button v-if="pageNo > 1" @click="prePage">上一页</button>
        <button v-if="page.start > 1" @click="changePage(1)" :class="{active:pageNo==1}">1</button>
        <button v-if="page.start > 2">···</button>

        <button v-for="(pageNumber,index) in page.pageNumberList" :key="index" @click="changePage(pageNumber)" :class="{active:pageNo==pageNumber}">
            {{pageNumber}}
        </button>

        <button v-if="page.end < page.totalPage - 1">···</button>
        <button v-if="page.end < page.totalPage" @click="changePage(page.totalPage)" :class="{active:pageNo==page.totalPage}">{{page.totalPage}}</button>
        <button v-if="pageNo < page.totalPage" @click="nextPage">下一页</button>

        <button style="margin-left: 30px">共 {{total}} 条</button>
    </div>
</template>

<script>
export default {
    name: "Pagination",
    props:['pageNo','pageSize','total','continuous'],
    computed: {
        page() {
            let start = 0, end = 0
            let totalPage = Math.ceil(this.total/this.pageSize)
            if (this.continuous > totalPage) {
                start = 1
                end = totalPage
            } else {
                let step = parseInt(this.continuous/2)
                start = this.pageNo - step
                end = this.pageNo + step
                if (end > totalPage) {
                    end = totalPage
                    start = end - this.continuous + 1
                } else if (end < this.continuous) {
                    end = this.continuous
                } 
                if (start < 1) {
                    start = 1
                }
            }
            let pageNumberList = []
            for (let index = start; index <= end; index++) {
                pageNumberList.push(index)         
            }

            return {
                start:start,
                end:end,
                totalPage:totalPage,
                pageNumberList:pageNumberList,
            }
        }
    },
    methods: {
        prePage() {
            if (this.pageNo > 1) {
                this.$emit('getPageNo',this.pageNo - 1);
            }
        },
        nextPage() {
            if (this.pageNo < this.page.totalPage) {
                this.$emit('getPageNo',this.pageNo + 1);
            }
        },
        changePage(pageNumber) {
            if (pageNumber <= this.page.totalPage) {
                this.$emit('getPageNo', pageNumber);
            }
            
        }
    }, 
}
</script>

<style lang="less" scoped>
.pagination {
    text-align: center;
    button {
        margin: 0 5px;
        background-color: #f4f4f5;
        color: #606266;
        outline: none;
        border-radius: 2px;
        padding: 0 4px;
        vertical-align: top;
        display: inline-block;
        font-size: 13px;
        min-width: 35.5px;
        height: 28px;
        line-height: 28px;
        cursor: pointer;
        box-sizing: border-box;
        text-align: center;
        border: 0;

        &[disabled] {
            color: #c0c4cc;
            cursor: not-allowed;
        }

        &.active {
            cursor: not-allowed;
            background-color: #409eff;
            color: #fff;
        }
    }
}
</style>
Vue.component("toodlist",{
    template:`
<div>
   <header>
    <input type="text" v-model="msg"  @keyup.13="add">
</header>
    <div class="container">
    <div class="btns">
        <input type="button" @click="change('all')" class="btn btn-info" value="全部" :class="{check:status=='all'}">
        <input type="button" @click="change('1')"  value="已完成"  class="btn btn-info":class="{check:status=='1'}">
        <input type="button" @click="change('0')"  class="btn btn-info" value="未完成" :class="{check:status=='0'}">
    </div>
    </div>
<ul>

    <li v-for="item in datas">

        <div v-if="item.flag" @dblclick="edit(item)" class="first">
        <div @click="changestatus(item)" :class="{red:item.state==1}"></div>
        <p>{{item.text}}</p>
        <button @click="del(item)"></button>
        </div>
        <div v-else class="two">
            <input type="text" v-model="item.text" @blur="edit(item)">
        </div>

    </li>
</ul>
</div>
   `,
    data(){
       return {
        msg:"",
        all:localStorage.todo?JSON.parse(localStorage.todo):[],
        status:"all"
        }
    },
    methods:{
        add() {
            let obj={};
            obj.state=0;
            obj.text=this.msg;
            obj.flag=true,
                obj.id=Math.random();
            this.all.push(obj);
            localStorage.todo=JSON.stringify(this.all);
            this.msg="";
        },
        changestatus(item){
            if(item.state==0){
                return item.state='1';
            }else{
                return item.state='0';
            }
            localStorage.todo=JSON.stringify(this.all);

        },
        change(sta){
            this.status=sta;
            localStorage.todo=JSON.stringify(this.all);
        },
        del(item){
            this.all=this.all.filter(ele=>{
                return ele.id!=item.id;
            })
            localStorage.todo=JSON.stringify(this.all);
        },
        edit(item){
            item.flag=!item.flag;
            localStorage.todo=JSON.stringify(this.all);
        },
    },
    computed:{
        datas(){
            return this.all.filter((a)=>{        //a是all里的每条数据
                // this是当前点击的数据
                if(this.status=="all"){
                    return a;
                }else{
                    if(a.state==this.status){
                        return a;
                    }

                }
            })
        }
    }
})
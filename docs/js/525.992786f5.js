"use strict";(self["webpackChunkquasar_todo"]=self["webpackChunkquasar_todo"]||[]).push([[525],{1525:(e,t,a)=>{a.r(t),a.d(t,{default:()=>C});var l=a(3673),s=a(2323),o=a(8880);const n={class:"list scroll"},d={key:0,class:"absolute-center column notask"},i=(0,l._)("p",{color:"primary"},"No Tasks!",-1);function c(e,t,a,c,u,p){const k=(0,l.up)("q-checkbox"),r=(0,l.up)("q-item-section"),m=(0,l.up)("q-item-label"),w=(0,l.up)("q-btn"),h=(0,l.up)("q-item"),g=(0,l.up)("q-list"),f=(0,l.up)("q-icon"),L=(0,l.up)("q-input"),q=(0,l.up)("q-footer"),_=(0,l.up)("q-page"),Z=(0,l.Q2)("ripple");return(0,l.wg)(),(0,l.j4)(_,{class:"column"},{default:(0,l.w5)((()=>[(0,l._)("div",n,[(0,l.Wm)(g,{bordered:"",separator:""},{default:(0,l.w5)((()=>[((0,l.wg)(!0),(0,l.iD)(l.HY,null,(0,l.Ko)(e.taskList,((t,a)=>(0,l.wy)(((0,l.wg)(),(0,l.j4)(h,{key:t.title,onClick:e=>t.completed=!t.completed,clickable:""},{default:(0,l.w5)((()=>[(0,l.Wm)(r,{avatar:""},{default:(0,l.w5)((()=>[(0,l.Wm)(k,{modelValue:t.completed,"onUpdate:modelValue":e=>t.completed=e,class:"no-pointer-event",color:"primary"},null,8,["modelValue","onUpdate:modelValue"])])),_:2},1024),(0,l.Wm)(r,{class:(0,s.C_)({completed:t.completed})},{default:(0,l.w5)((()=>[(0,l.Wm)(m,null,{default:(0,l.w5)((()=>[(0,l.Uk)((0,s.zw)(t.title),1)])),_:2},1024)])),_:2},1032,["class"]),t.completed?((0,l.wg)(),(0,l.j4)(r,{key:0,side:""},{default:(0,l.w5)((()=>[(0,l.Wm)(w,{flat:"",onClick:t=>e.deleteTask(a),icon:"delete"},null,8,["onClick"])])),_:2},1024)):(0,l.kq)("",!0)])),_:2},1032,["onClick"])),[[Z]]))),128))])),_:1})]),e.taskList.length?(0,l.kq)("",!0):((0,l.wg)(),(0,l.iD)("div",d,[(0,l.Wm)(f,{name:"check",color:"positive",size:"5em"}),i])),(0,l.Wm)(q,{elevated:"",class:"bg-dark text-white"},{default:(0,l.w5)((()=>[(0,l.Wm)(L,{onKeyup:(0,o.D2)(e.addTask,["enter"]),outlined:"",clearable:"","clear-icon":"close",modelValue:e.newTask,"onUpdate:modelValue":t[0]||(t[0]=t=>e.newTask=t),placeholder:"Add a task"},{append:(0,l.w5)((()=>[(0,l.Wm)(w,{onClick:e.addTask,round:"",dense:"",flat:"",icon:"add"},null,8,["onClick"])])),_:1},8,["onKeyup","modelValue"])])),_:1})])),_:1})}a(2100);const u=(0,l.aZ)({name:"PageIndex",mounted(){if(null!==localStorage.getItem("taskList")){let e=localStorage.getItem("taskList");this.taskList=JSON.parse(e)}},unmounted(){this.updateLocalStorage()},data(){return{newTask:"",taskList:[]}},methods:{addTask(){0!=this.newTask.length&&(this.taskList.push({title:this.newTask,completed:!1}),this.newTask="")},deleteTask(e){this.taskList.splice(e,1)},updateLocalStorage(){localStorage.setItem("taskList",JSON.stringify(this.taskList))}},watch:{taskList:{handler(){this.updateLocalStorage()},deep:!0}}});var p=a(4260),k=a(4379),r=a(7011),m=a(3414),w=a(2035),h=a(1420),g=a(2350),f=a(4607),L=a(4554),q=a(1762),_=a(8786),Z=a(6489),b=a(7518),T=a.n(b);const Q=(0,p.Z)(u,[["render",c]]),C=Q;T()(u,"components",{QPage:k.Z,QList:r.Z,QItem:m.Z,QItemSection:w.Z,QCheckbox:h.Z,QItemLabel:g.Z,QBtn:f.Z,QIcon:L.Z,QFooter:q.Z,QInput:_.Z}),T()(u,"directives",{Ripple:Z.Z})}}]);
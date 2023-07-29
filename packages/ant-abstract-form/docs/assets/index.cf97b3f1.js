import{r as g,n,m as E,R as s,a as d,b as y,B as u,F as h,C as v,c as w,d as x,s as b,e as _}from"./vendor.fc904270.js";const F=function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))a(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const o of r.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&a(o)}).observe(document,{childList:!0,subtree:!0});function i(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerpolicy&&(r.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?r.credentials="include":e.crossorigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function a(e){if(e.ep)return;e.ep=!0;const r=i(e);fetch(e.href,r)}};F();const l="ant-abstract-form";class c extends g.exports.Component{constructor(t){super(t);this.resources="curds",this.size="small",this.options={},this.actions={reset:!0,redirect:!0},this.handleFinish=i=>{const a=this.isEdit?"update":"create",e=n.mix(null,this.params,i,this.options),{redirect:r}=this.actions;return new Promise((o,p)=>{this.apiService[`${this.resources}_${a}`](e).then(f=>{E.info("\u64CD\u4F5C\u6210\u529F"),r&&this.routeService.back(),o(f)}).catch(p)})},this.state={meta:{}}}get titleView(){return s.createElement("span",{className:"mr-5_ mr_"},s.createElement(d,{value:"form"}),s.createElement("span",null,"\u64CD\u4F5C\u9762\u677F"))}get params(){return n.get(this.props,"match.params")}get isEdit(){return!y(this.params)}get extraView(){return s.createElement("div",{className:"is-extra"},s.createElement(u,{size:"small",onClick:()=>this.routeService.back()},s.createElement(d,{size:12,value:"return"}),"\u8FD4\u56DE"))}get submitView(){const{reset:t}=this.actions,{formItemLayout:i}=this.state.meta;return s.createElement(h.Item,{wrapperCol:{span:i[1],offset:i[0]}},s.createElement("div",{className:"mr-10_ mr_"},s.createElement(u,{htmlType:"submit",type:"primary"},"\u4FDD\u5B58"),t&&s.createElement(u,{htmlType:"reset",type:"default"},"\u53D6\u6D88")))}componentDidMount(){this.handleInit(),setTimeout(()=>{n.set(this.routeService,"current",this.props)},0)}setResponse(t){return t}handleInit(){if(this.isEdit){const t=n.mix(null,this.params,this.options),{meta:i}=this.state;this.apiService[`${this.resources}_show`](t).then(a=>{const e=this.setResponse(a);n.mix(i.initialValues,e),this.setState({meta:i}),this.formRef.setFieldsValue(e)})}return Promise.resolve()}view(){const{className:t}=this.props,{meta:i}=this.state;return s.createElement(v,{size:this.size,title:this.titleView,extra:this.extraView,"data-component":l,className:w(l,t)},s.createElement(h,{ref:a=>this.formRef=a,onFinish:this.handleFinish,onValuesChange:()=>this.forceUpdate()},s.createElement(x,{meta:i,form:this.formRef}),this.submitView))}render(){return null}}c.displayName=l;c.version="__VERSION__";c.defaultProps={};const N=b.div`
  width: 80%;
  margin: 30px auto 0;
  .is-body {
    padding: 20px;
    background: #fff;
    width: 50%;
    min-width: 320px;
    margin: 0 auto;
  }

  .mr-5_ {
    > * {
      margin-right: 5px;
    }
  }

  .mr-10_ {
    > * {
      margin-right: 10px;
    }
  }
`;n.$api={curds_index:function(){return Promise.resolve("index")},curds_show:function(){return Promise.resolve("show")},curds_update:function(){return Promise.resolve("update")}};n.$route={back:function(){console.log("back")}};class S extends c{constructor(t){super(t);this.apiService=n.$api,this.routeService=n.$route,this.state={meta:{formItemLayout:[6,18],initialValues:{},fields:[{key:"username",label:"User Name",tooltip:"\u7528\u6237\u540D",rules:[{max:10,min:5}]},{key:"password",label:"Password",widget:"password"}]}}}componentDidMount(){const{meta:t}=this.state;t.initialValues={username:"afeiship"},this.setState({meta:t})}render(){return this.view()}}var C=()=>s.createElement(N,null,s.createElement(S,null));_.render(s.createElement(C,null),document.getElementById("root"));

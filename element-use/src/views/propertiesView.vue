<template>
<div>
    <div style="margin: 20px;">
      <h1 data-i18n-text="message.title" />
      <input style="width: 300px;" class="form-control" data-i18n-placeholder="placeholder.enter">
      <ul>
        <li v-for="brand in brands" :key="brand" >{{brand}}</li>
      </ul>
      <el-date-picker
      v-model="dt"
      type="date"
      :placeholder="jq.i18n.prop('date')">
    </el-date-picker>
    </div>
</div>
</template>

<script>
// const { JSDOM } = require( "jsdom" );
// const { window } = new JSDOM( "" );
// const $ = require( "jquery" )( window );
import { jqueryInstallI18n } from '../plugins/jquery.i18n.properties'

export default {
  name: 'propertiesView',
  components: {
  },
  data() {
    return {
      brands: [],
      dt: null,
      jq: window.$
    }
  },
  created() {
    this.name = this.$options.name
    console.log(`[${this.name}] Created`)
    jqueryInstallI18n(this.jq)
    // console.log(this.jq.i18n.prop('message.title'))
  },
  mounted() {
    this.loadProperties()
    console.log(`[${this.name}] Mounted`)
    this.brands = [this.jq.i18n.prop('brands.nike'), this.jq.i18n.prop('brands.adi'), this.jq.i18n.prop('brands.nb'), this.jq.i18n.prop('brands.ln')]
  },
  methods: {
    loadProperties(){
      var $ = window.$
       $.i18n.properties({
       name:'conf',//文件名称
       path:'static/',//具体路径位置
       mode:'map',//读取模式，这里用map
       encoding: 'UTF-8',
       callback: function() {//回调方法，你读取后要干什么都在这里
            console.log("i18n赋值中...");
            try {
                //初始化页面元素
                $('[data-i18n-placeholder]').each(function () {
                    $(this).attr('placeholder', $.i18n.prop($(this).data('i18n-placeholder')));
                });
                $('[data-i18n-text]').each(function () {
                    //如果text里面还有html需要过滤掉
                    var html = $(this).html();
                    var reg = /<(.*)>/;
                    if (reg.test(html)) {
                        var htmlValue = reg.exec(html)[0];
                        $(this).html(htmlValue + $.i18n.prop($(this).data('i18n-text')));
                    }
                    else {
                        $(this).text($.i18n.prop($(this).data('i18n-text')));
                    }
                });
                $('[data-i18n-value]').each(function () {
                    $(this).val($.i18n.prop($(this).data('i18n-value')));
                });
            }
            catch(ex) {
              console.log(ex);
            }
            console.log("i18n写入完毕");
        }
       });
    }
  }
}
</script>

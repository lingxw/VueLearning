<template>
<div>
    <div style="margin: 20px;">
      <h1>{{$t("message.title")}}</h1>
      <!-- <button type="button" class="btn btn-success" @click="changeLocale">中文/EN</button> -->
      <div class="lang">
        <el-dropdown>
          <span class="el-dropdown-link">
            {{$t("selectLang")}}<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item @click.native="toggleLang('zh')" :disabled="$i18n.locale === 'zh'">中文</el-dropdown-item>
            <el-dropdown-item @click.native="toggleLang('en')" :disabled="$i18n.locale === 'en'">English</el-dropdown-item>
            <el-dropdown-item @click.native="toggleLang('ja')" :disabled="$i18n.locale === 'ja'">日本語</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
      <input style="width: 300px;" class="form-control" :placeholder="$t('placeholder.enter')">
      <ul>
        <li v-for="brand in [$t('brands.nike'), $t('brands.adi'), $t('brands.nb'), $t('brands.ln')]" :key="brand" >{{brand}}</li>
      </ul>
      <el-date-picker
      v-model="dt"
      type="date"
      :placeholder="$t('date')">
    </el-date-picker>
    </div>
</div>
</template>

<script>
import { setup } from '../locales/index'

export default {
  name: 'i18nView',
  components: {
  },
  data() {
    return {
      // brands: [this.$t('brands.nike'), this.$t('brands.adi'), this.$t('brands.nb'), this.$t('brands.ln')]
      dt: null
    }
  },
  methods: {
      changeLocale () {
        this.$confirm(this.$t('layer.toggle'), this.$t('layer.tips'), {
            confirmButtonText: this.$t('button.ok'),
            cancelButtonText: this.$t('button.cancel'),
            type: 'warning'
            }).then(() => {
            let locale = this.$i18n.locale
            locale === 'zh' ? setup('en') : setup('zh')
            }).catch(() => {
                this.$message({
                    type: 'info',
                    })      
            })
    },
    toggleLang(lang) {
      if(lang == 'zh'){
        setup(lang)
        this.$message({
          message: '切换为中文！',
          type: 'success'
        })
      } else if (lang == 'en') {
        setup(lang)
        this.$message({
          message: 'Switch to English!',
          type: 'success'
        })
      } else if (lang == 'ja') {
        setup(lang)
        this.$message({
          message: 'Switch to 日本語!',
          type: 'success'
        })
      }
    }
  }
}
</script>

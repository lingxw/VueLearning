var LANGUAGE_Index = "zh_CN"; //标识语言  

jQuery(document).ready(function () {
    // alert("页面加载时调用的方法");  

    LANGUAGE_Index = jQuery.i18n.browserLang({}); //获取浏览器的语言  zh-CN
    console.log('浏览器默认语言是：'+ LANGUAGE_Index)
    if (LANGUAGE_Index == "zh-CN") {
        LANGUAGE_Index = "zh_CN"
    }
    if (LANGUAGE_Index == "en") {
        LANGUAGE_Index = "en_GB"
    }
    loadProperties(LANGUAGE_Index);
});


$(".lan_select").change(function () {

    if ($(".lan_select").val() === "en_GB") {
        LANGUAGE_Index = "en_GB";
    } else {
        LANGUAGE_Index = "zh_CN";
    }

    loadProperties(LANGUAGE_Index);

});

i18nCss = {
    en_GB : {
        string_prop : {
        
        },
        string_login_productName: {
            "font-size": "20px",
            'color': 'green'
        },
        string_login_keepPassword: {
            "font-wight": '900',
            'color': 'green'
        } 
    },
    zh_CN : {
        string_prop : {
        
        },
        string_login_productName: {
            "font-size": "20px",
            "color": "#f40"
        },
        string_login_keepPassword: {
            "font-wight": '900',
            "color": "#f40"
        }
    } 
    
}

function loadProperties(type) {
    var $ = jQuery
    jQuery.i18n.properties({
        name: 'strings', // 资源文件名称  
        path: 'i18n/', // 资源文件所在目录路径  
        mode: 'both', // 模式：变量或 Map  
        // language: type, // 对应的语言  
        cache: false,
        encoding: 'UTF-8',
        callback: function () { // 回调方法
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
            catch(ex){ }
            console.log("i18n写入完毕");
        }
    });
}


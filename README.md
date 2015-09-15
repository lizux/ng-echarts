# echarts for angular
---
封装百度echarts库为angular 指令，方便调用

## Usage
``` html
<div e-charts style="width:300px;height:200px;" type="line" data="ajaxDateBar" title="平均收入表" show-legend="top" show-maxmin="true" show-average="true"></div>
```
0. data: 数据来源对象，必须。值：对象类
    ``` javascript
    // 折线、柱状图数据
    $scope.ajaxDateBar = [{
        name: '蒸发量',
        date: ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月'],
        data: [2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 165.6, 162.2, 32.6, 20.0, 6.4, 3.3]
    }, {
        name: '降水量',
        date: ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月'],
        data: [2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3]
    }]
    // 饼图数据
    $scope.dataPie = [{value: 335,name: '直接访问'}, {value: 310,name: '邮件营销'}, {value: 234,name: '联盟广告'}, {value: 135,name: '视频广告'}, {value: 1548,name: '搜索引擎'}]
    // 地图数据
    $scope.ajaxDataMap = [{ name: 'people', data: [{ name: '北京', value: Math.round(Math.random() * 1000) }, { name: '天津', value: Math.round(Math.random() * 1000) }, { name: '上海', value: Math.round(Math.random() * 1000) }, { name: '重庆', value: Math.round(Math.random() * 1000) }]}]
    ```
0. type: 图表类型，必须。值：line | bar | pie | map 
0. title: 图表标题，可选。值：字符串类型
0. show-legend: 是否显示图例，可选。type为 line | bar 时，值：top | bottom；type为 pie 时，值：left | right
0. show-maxmin: 是否显示最大最小值，可选。该属性存在即显示（即使为false），不存在即不显示
0. show-average: 是否显示平均值，可选。该属性存在即显示，不存在即不显示
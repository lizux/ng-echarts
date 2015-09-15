'use strict';

commonModule.directive('eCharts', [function(){
    return {
        restrict: 'EA',
        scope: {
            'data': '='
        },
        link: function(scope, element, attrs){
            var bdChart = echarts.init(element[0]);
            var type = attrs.type;
            var title = attrs.title || '';
            var showLegend = attrs.showLegend || false;
            var showMaxmin = attrs.showMaxmin || false;
            var showAverage = attrs.showAverage || false;
            scope.ecOption = {
                title: {
                    text: title,
                    textStyle: {
                        fontSize: 14
                    }
                },
                tooltip: {
                    trigger: 'item'
                },
                toolbox: {
                    show: false,
                    feature: {
                        saveAsImage: {show: true}
                    }
                }
            }
            scope.update = function() {
                if (!scope.data){
                    return;
                }
                if (type == 'line'){
                    scope.data.forEach(function(item) {
                        $.extend(item, {
                            type: 'line',
                        })
                        if (showMaxmin) {
                            $.extend(item, {
                                markPoint: {
                                    data: [
                                        {type: 'max', name: '最大值'},
                                        {type: 'min', name: '最小值'}
                                    ]
                                }
                            })
                        }
                        if (showAverage) {
                            $.extend(item, {
                                markLine: {
                                    data: [
                                        {type: 'average', name: '平均值'}
                                    ]
                                }
                            })
                        }
                    });
                    if (showLegend) {
                        bdChart.setOption({
                            legend: {
                                y: showLegend,
                                data: scope.data.map(function(item) {
                                    return item.name;
                                })
                            }
                        });
                    }
                    bdChart.setOption({
                        toolbox: {
                            feature: {
                                magicType: {show: true, type: ['line', 'bar']}
                            }
                        },
                        grid: {
                            x: 40,
                            x2: 40,
                        },
                        xAxis: [{data: scope.data[0].date}],
                        yAxis: [
                            {
                                splitArea: {show: true}
                            }
                        ],
                        series: scope.data
                    });
                } else if (type == 'pie'){
                    if (showLegend) {
                        bdChart.setOption({
                            legend: {
                                orient: 'vertical',
                                x: showLegend,
                                y: 'center',
                                data: scope.data.map(function(item) {
                                    return item.name;
                                })
                            }
                        });
                    }
                    bdChart.setOption({
                        tooltip: {
                            formatter: '{b} : {c} ({d}%)'
                        },
                        series: [{
                            type: 'pie',
                            radius: ['50%', '95%'],
                            itemStyle: {
                                normal: {
                                    label: {
                                        show: true,
                                        position: 'inner',
                                        formatter: '{d}%'
                                    },
                                    labelLine: {
                                        show: false
                                    }
                                },
                                emphasis: {
                                    label: {
                                        show: true,
                                        position: 'center',
                                        formatter: '{b}\n{d}%'
                                    },
                                    labelLine: {
                                        show: false
                                    }
                                }
                            },
                            data: scope.data
                        }]
                    });
                } else if (type == 'map'){
                    scope.data.forEach(function(item) {
                        $.extend(item, {
                            type: 'map',
                            mapType: 'china',
                            mapLocation: {
                                y: 'bottom',
                                height: '90%'
                            },
                            itemStyle: {
                                emphasis: {
                                    label: {
                                        show: true
                                    }
                                }
                            }
                        })
                    });
                    bdChart.setOption({
                        dataRange: {
                            show: true,
                            orient: 'horizontal',
                            min: 0,
                            max: 1000,
                            x: 'center',
                            y: 'top',
                            text: ['高', '低'],
                            itemGap: 3,
                            itemWidth: 15,
                            itemHeight: 16,
                            splitNumber: 7,
                            calculable: false
                        },
                        series: scope.data
                    });
                }
            }
            bdChart.setOption(scope.ecOption);
            scope.$watch('data', scope.update);
        }
    }
}]);
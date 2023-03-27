function buildTxAmount(input, category) {
  const result = [];
  const p = ['periods'];
  _.each(input.periods, v => p.push(v.toString()));
  result.push(p);
  const data = {};
  _.each(category, (v) => data[v] = []);
  _.each(fakeData, (v) => {
    const index = input.periods.indexOf(v.period);
    if (index === -1) return;
    if (input[1].indexOf(v.bank) === -1) return;
    if (input[2].indexOf(v.province) === -1) return;
    let n = 0;
    let key = input.aggregate.join('');
    key = key.replace('3', '');
    key = key.replace('1', v.bank);
    key = key.replace('2', v.province);
    if (data[key + '线上']) {
      let tempKey = key + '线上';
      n = v.txAmountOnline;
      if (data[tempKey][index]) {
        data[tempKey][index] += n;
      } else {
        data[tempKey][index] = n;
      }
    }
    if (data[key + '线下']) {
      let tempKey = key + '线下';
      n = v.txAmountOffline;
      if (data[tempKey][index]) {
        data[tempKey][index] += n;
      } else {
        data[tempKey][index] = n;
      }
    }
    if (data[key + '总量']) {
      let tempKey = key + '总量';
      n = v.txAmountOffline + v.txAmountOnline;
      if (data[tempKey][index]) {
        data[tempKey][index] += n;
      } else {
        data[tempKey][index] = n;
      }
    }
  })
  _.each(data, (v, k) => {
    v.unshift(k);
    result.push(v);
  });
  return { source: result };
}

function buildTxAmountDetail(input) {
  function getDataset(period) {
    const data = {};
    _.each(input.aggregate, (v, i) => {
      if (i === 0) {
        _.each(input[v], (k) => data[k] = {});
      } else if (i === 1) {
        _.each(input[v], (k) => {
          _.each(data, (val) => val[k] = {});
        });
      } else {
        _.each(input[v], (k) => {
          _.each(data, (val) => {
            _.each(val, (value) => {
              value[k] = {};
            });
          });
        });
      }
    });
    const rawData = _.filter(fakeData, (v) => {
      if (v.period !== period) return false;
      if (input[1].indexOf(v.bank) > -1 && input[2].indexOf(v.province) > -1) {
        return true;
      } else {
        return false;
      }
    });
    _.each(rawData, (v) => {
      switch (input.aggregate) {
        case '123':
          data[v.bank][v.province]['线上'] = v.txAmountOnline;
          data[v.bank][v.province]['线下'] = v.txAmountOffline;
          break;
        case '132':
          data[v.bank]['线上'][v.province] = v.txAmountOnline;
          data[v.bank]['线下'][v.province] = v.txAmountOffline;
          break;
        case '213':
          data[v.province][v.bank]['线上'] = v.txAmountOnline;
          data[v.province][v.bank]['线下'] = v.txAmountOffline;
          break;
        case '231':
          data[v.province]['线上'][v.bank] = v.txAmountOnline;
          data[v.province]['线下'][v.bank] = v.txAmountOffline;
          break;
        case '312':
          data['线上'][v.bank][v.province] = v.txAmountOnline;
          data['线下'][v.bank][v.province] = v.txAmountOffline;
          break;
        case '321':
          data['线上'][v.province][v.bank] = v.txAmountOnline;
          data['线下'][v.province][v.bank] = v.txAmountOffline;
          break;
      }
    });
    const dataset = [];
    _.each(data, (v, k) => dataset.push({ name: k, children: v }));
    _.each(dataset, (v) => v.children = _.map(_.keys(v.children), (k) => {
      const val = v.children[k];
      v.children[k] = _.map(_.keys(val), (v) => { return { name: v, value: val[v] } });
      return { name: k, children: v.children[k] };
    }));
    return dataset;
  }
  return _.map(periods, (v) => getDataset(v));
}

function buildTxCount(input, category) {
  const result = [];
  const p = ['periods'];
  _.each(input.periods, v => p.push(v.toString()));
  result.push(p);
  const data = {};
  _.each(category, (v) => data[v] = []);
  _.each(fakeData, (v) => {
    const index = input.periods.indexOf(v.period);
    if (index === -1) return;
    if (input[1].indexOf(v.bank) === -1) return;
    if (input[2].indexOf(v.province) === -1) return;
    let n = 0;
    let key = input.aggregate.join('');
    key = key.replace('3', '');
    key = key.replace('1', v.bank);
    key = key.replace('2', v.province);
    if (data[key + '线上']) {
      let tempKey = key + '线上';
      n = v.txCountOnline;
      if (data[tempKey][index]) {
        data[tempKey][index] += n;
      } else {
        data[tempKey][index] = n;
      }
    }
    if (data[key + '线下']) {
      let tempKey = key + '线下';
      n = v.txCountOffline;
      if (data[tempKey][index]) {
        data[tempKey][index] += n;
      } else {
        data[tempKey][index] = n;
      }
    }
    if (data[key + '总量']) {
      let tempKey = key + '总量';
      n = v.txCountOffline + v.txCountOnline;
      if (data[tempKey][index]) {
        data[tempKey][index] += n;
      } else {
        data[tempKey][index] = n;
      }
    }
  })
  _.each(data, (v, k) => {
    v.unshift(k);
    result.push(v);
  });
  return { source: result };
}

function buildTxCountDetail(input) {
  function getDataset(period) {
    const data = {};
    _.each(input.aggregate, (v, i) => {
      if (i === 0) {
        _.each(input[v], (k) => data[k] = {});
      } else if (i === 1) {
        _.each(input[v], (k) => {
          _.each(data, (val) => val[k] = {});
        });
      } else {
        _.each(input[v], (k) => {
          _.each(data, (val) => {
            _.each(val, (value) => {
              value[k] = {};
            });
          });
        });
      }
    });
    const rawData = _.filter(fakeData, (v) => {
      if (v.period !== period) return false;
      if (input[1].indexOf(v.bank) > -1 && input[2].indexOf(v.province) > -1) {
        return true;
      } else {
        return false;
      }
    });
    _.each(rawData, (v) => {
      switch (input.aggregate) {
        case '123':
          data[v.bank][v.province]['线上'] = v.txCountOnline;
          data[v.bank][v.province]['线下'] = v.txCountOffline;
          break;
        case '132':
          data[v.bank]['线上'][v.province] = v.txCountOnline;
          data[v.bank]['线下'][v.province] = v.txCountOffline;
          break;
        case '213':
          data[v.province][v.bank]['线上'] = v.txCountOnline;
          data[v.province][v.bank]['线下'] = v.txCountOffline;
          break;
        case '231':
          data[v.province]['线上'][v.bank] = v.txCountOnline;
          data[v.province]['线下'][v.bank] = v.txCountOffline;
          break;
        case '312':
          data['线上'][v.bank][v.province] = v.txCountOnline;
          data['线下'][v.bank][v.province] = v.txCountOffline;
          break;
        case '321':
          data['线上'][v.province][v.bank] = v.txCountOnline;
          data['线下'][v.province][v.bank] = v.txCountOffline;
          break;
      }
    });
    const dataset = [];
    _.each(data, (v, k) => dataset.push({ name: k, children: v }));
    _.each(dataset, (v) => v.children = _.map(_.keys(v.children), (k) => {
      const val = v.children[k];
      v.children[k] = _.map(_.keys(val), (v) => { return { name: v, value: val[v] } });
      return { name: k, children: v.children[k] };
    }));
    return dataset;
  }
  return _.map(periods, (v) => getDataset(v));
}

function buildWalletMAU(input, category) {
  const result = [];
  const p = ['periods'];
  _.each(input.periods, v => p.push(v.toString()));
  result.push(p);
  const data = {};
  _.each(category, (v) => data[v] = []);
  _.each(fakeData, (v) => {
    const index = input.periods.indexOf(v.period);
    if (index === -1) return;
    if (input[1].indexOf(v.bank) === -1) return;
    if (input[2].indexOf(v.province) === -1) return;
    let n = 0;
    let key = input.aggregate.join('');
    key = key.replace('3', '');
    key = key.replace('1', v.bank);
    key = key.replace('2', v.province);
    if (data[key + '个人']) {
      let tempKey = key + '个人';
      n = v.walletPrivateMAU;
      if (data[tempKey][index]) {
        data[tempKey][index] += n;
      } else {
        data[tempKey][index] = n;
      }
    }
    if (data[key + '对公']) {
      let tempKey = key + '对公';
      n = v.walletPublicMAU;
      if (data[tempKey][index]) {
        data[tempKey][index] += n;
      } else {
        data[tempKey][index] = n;
      }
    }
    if (data[key + '总量']) {
      let tempKey = key + '总量';
      n = v.walletPrivateMAU + v.walletPublicMAU;
      if (data[tempKey][index]) {
        data[tempKey][index] += n;
      } else {
        data[tempKey][index] = n;
      }
    }
  })
  _.each(data, (v, k) => {
    v.unshift(k);
    result.push(v);
  });
  return { source: result };
}

function buildWalletDetail(input) {
  function getDataset(period) {
    const data = {};
    _.each(input.aggregate, (v, i) => {
      if (i === 0) {
        _.each(input[v], (k) => data[k] = {});
      } else if (i === 1) {
        _.each(input[v], (k) => {
          _.each(data, (val) => val[k] = {});
        });
      } else {
        _.each(input[v], (k) => {
          _.each(data, (val) => {
            _.each(val, (value) => {
              value[k] = {};
            });
          });
        });
      }
    });
    const rawData = _.filter(fakeData, (v) => {
      if (v.period !== period) return false;
      if (input[1].indexOf(v.bank) > -1 && input[2].indexOf(v.province) > -1) {
        return true;
      } else {
        return false;
      }
    });
    _.each(rawData, (v) => {
      switch (input.aggregate) {
        case '123':
          data[v.bank][v.province]['个人'] = v.walletPrivateMAU;
          data[v.bank][v.province]['对公'] = v.walletPublicMAU;
          break;
        case '132':
          data[v.bank]['个人'][v.province] = v.walletPrivateMAU;
          data[v.bank]['对公'][v.province] = v.walletPublicMAU;
          break;
        case '213':
          data[v.province][v.bank]['个人'] = v.walletPrivateMAU;
          data[v.province][v.bank]['对公'] = v.walletPublicMAU;
          break;
        case '231':
          data[v.province]['个人'][v.bank] = v.walletPrivateMAU;
          data[v.province]['对公'][v.bank] = v.walletPublicMAU;
          break;
        case '312':
          data['个人'][v.bank][v.province] = v.walletPrivateMAU;
          data['对公'][v.bank][v.province] = v.walletPublicMAU;
          break;
        case '321':
          data['个人'][v.province][v.bank] = v.walletPrivateMAU;
          data['对公'][v.province][v.bank] = v.walletPublicMAU;
          break;
      }
    });
    const dataset = [];
    _.each(data, (v, k) => dataset.push({ name: k, children: v }));
    _.each(dataset, (v) => v.children = _.map(_.keys(v.children), (k) => {
      const val = v.children[k];
      v.children[k] = _.map(_.keys(val), (v) => { return { name: v, value: val[v] } });
      return { name: k, children: v.children[k] };
    }));
    return dataset;
  }
  return _.map(periods, (v) => getDataset(v));
}

function buildShopCount(input, category) {
  const result = [];
  const p = ['periods'];
  _.each(input.periods, v => p.push(v.toString()));
  result.push(p);
  const data = {};
  _.each(category, (v) => data[v] = []);
  _.each(fakeData, (v) => {
    const index = input.periods.indexOf(v.period);
    if (index === -1) return;
    if (input[1].indexOf(v.bank) === -1) return;
    if (input[2].indexOf(v.province) === -1) return;
    let n = 0;
    let key = input.aggregate.join('');
    key = key.replace('1', v.bank);
    key = key.replace('2', v.province);
    n = v.shopCount;
    if (data[key][index]) {
      data[key][index] += n;
    } else {
      data[key][index] = n;
    }
  })
  _.each(data, (v, k) => {
    v.unshift(k);
    result.push(v);
  });
  return { source: result };
}

function buildShopDetail(input) {
  function getDataset(period) {
    const data = {};
    _.each(input.aggregate, (v, i) => {
      if (i === 0) {
        _.each(input[v], (k) => data[k] = {});
      } else if (i === 1) {
        _.each(input[v], (k) => {
          _.each(data, (val) => val[k] = {});
        });
      } else {
        _.each(input[v], (k) => {
          _.each(data, (val) => {
            _.each(val, (value) => {
              value[k] = {};
            });
          });
        });
      }
    });
    const rawData = _.filter(fakeData, (v) => {
      if (v.period !== period) return false;
      if (input[1].indexOf(v.bank) > -1 && input[2].indexOf(v.province) > -1) {
        return true;
      } else {
        return false;
      }
    });
    _.each(rawData, (v) => {
      switch (input.aggregate) {
        case '12':
          data[v.bank][v.province] = v.shopCount;
          break;
        case '21':
          data[v.province][v.bank] = v.shopCount;
          break;
      }
    });
    const dataset = [];
    _.each(data, (v, k) => dataset.push({ name: k, children: v }));
    _.each(dataset, (v) => v.children = _.map(_.keys(v.children), (k) => {
      // const val = v.children[k];
      // v.children[k] = _.map(_.keys(val), (v) => { return { name: v, value: val[v] } });
      return { name: k, value: v.children[k] };
    }));
    return dataset;
  }
  return _.map(periods, (v) => getDataset(v));
}

function generateCategory(input, aggregate) {
  var category = [];
  for (const i of aggregate) {
    if (!input[i]) return [];
    if (category.length === 0) {
      for (const c of input[i]) {
        category.push(c);
      }
    } else {
      category = _.map(category, (c) => {
        return _.map(input[i], (v) => `${c}${v}`);
      });
      category = _.flatten(category);
    }
  }
  return category;
}

function processInput(input, keys, values) {
  _.each(keys, (v, i) => input[v] = input[v] ? input[v].split(',') : values[i]);
  if (input.aggregate) input.aggregate = _.uniq(input.aggregate.trim().split('').sort().join(''));
  return input;
}

function processDetailInput(input, keys, values, max = 3) {
  input.aggregate = input.aggregate.trim()
  if (!_.every(input.aggregate, (v) => keys.indexOf(+v) > -1)) {
    return null;
  }
  let i = _.range(1, max + 1).join('');
  let text = _.uniq(input.aggregate).join('');
  if (text.length <= max) {
    _.each(text, (v) => i = i.replace(v, ''));
  }
  input.aggregate = text + i;
  _.each(keys, (v, i) => input[v] = input[v] ? input[v].split(',') : values[i]);
  return input;
}

function transformBarLineData(xAxis, data, names, suffix = '趋势') {
  const dataset = { xAxis: xAxis, source: [] };
  _.each(data, (v, i) => {
    dataset.source.push({ name: names[i], data: v, type: 'bar' })
    dataset.source.push({ name: names[i] + suffix, data: v, type: 'line' })
  });
  return dataset;
}

function drawBarLineChart(chart, dataset, title = '') {
  var option = {
    title: { text: title },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    legend: {},
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: [
      {
        type: 'category',
        data: dataset.xAxis
      }
    ],
    yAxis: [
      {
        type: 'value'
      }
    ],
    series: []
  };
  _.each(dataset.source, (v) => {
    option.series.push({
      name: v.name,
      type: v.type,
      emphasis: {
        focus: 'series'
      },
      data: v.data
    })
  });
  chart.setOption(option);
  return chart;
}

function drawOverviewChart(chart, dataset, type) {
  if (!type) type = 'line';
  const series = _.chain(
    _.range(dataset.source.length - 1)
  ).map(() => {
    return {
      type: type,
      smooth: true,
      seriesLayoutBy: 'row',
      emphasis: { focus: 'series' }
    }
  }).value();
  series.push({
    type: 'pie',
    id: 'pie',
    radius: '30%',
    center: ['50%', '30%'],
    roseType: 'radius',
    emphasis: {
      focus: 'self'
    },
    label: {
      formatter: `{b}: {@[1]} ({d}%)`
    },
    encode: {
      itemName: dataset.source[0][0],
      value: dataset.source[0][1],
      tooltip: dataset.source[0][0]
    }
  });
  var option = {
    legend: {},
    dataZoom: [
      { type: 'slider' },
      { type: 'inside' }
    ],
    tooltip: {
      trigger: 'axis',
      showContent: false
    },
    dataset: dataset,
    xAxis: { type: 'category' },
    yAxis: { gridIndex: 0 },
    grid: { top: '55%' },
    series: series,
  };
  chart.on('updateAxisPointer', function (event) {
    const xAxisInfo = event.axesInfo[0];
    if (xAxisInfo) {
      const dimension = xAxisInfo.value + 1;
      chart.setOption({
        series: {
          id: 'pie',
          label: {
            formatter: '{b}: {@[' + dimension + ']} ({d}%)'
          },
          encode: {
            value: dimension,
            tooltip: dimension
          }
        }
      });
    }
  });
  chart.setOption(option);
  return chart;
}

function drawDetailChart(chart, dataset, type) {
  if (!type) type = 'treemap';
  let option;
  function formatter(params) {
    if (params.treePathInfo) {
      const len = params.treePathInfo.length;
      if (len >= 1) {
        const current = params.treePathInfo[len - 1];
        if (len >= 2) {
          const previous = params.treePathInfo[len - 2];
          const percent = Math.round((current.value / previous.value) * 1000) / 10;
          return `${current.name}:${current.value}(${percent}%)`;
        } else {
          return `${current.name}:${current.value}`;
        }
      }
    }
  }
  function getLevelOption() {
    return [
      {
        itemStyle: {
          borderColor: '#777',
          borderWidth: 3,
          gapWidth: 1
        },
        upperLabel: {
          // show: false
        }
      },
      {
        colorSaturation: [0.5, 0.8],
        itemStyle: {
          borderColor: '#555',
          borderWidth: 5,
          gapWidth: 5
        },
        emphasis: {
          itemStyle: {
            borderColor: '#ddd',
            borderWidth: 5,
            gapWidth: 5
          }
        },
      },
      {
        colorSaturation: [0.4, 0.7],
        label: {
          color: '#000'
        },
        itemStyle: {
          borderWidth: 5,
          gapWidth: 1,
          borderColorSaturation: 0.6
        }
      },
      {
        colorSaturation: [0.4, 0.7],
        label: {
          color: '#000'
        },
        itemStyle: {
          borderWidth: 5,
          gapWidth: 1,
          borderColorSaturation: 0.6
        }
      }
    ];
  }
  if (type === 'treemap') {
    option = {
      baseOption: {
        timeline: {
          axisType: 'category',
          playInterval: 1000,
          data: periods,
        },
        tooltip: {
          formatter: formatter
        },
      },
      options: _.map(periods, (p, index) => {
        return {
          series: [{
            type: 'treemap',
            data: dataset[index],
            name: "总量",
            label: {
              formatter: formatter,
              fontSize: 15,
            },
            leafDepth: 1,
            breadcrumb: { top: '20', itemStyle: { borderColor: '#73c0de' } },
            upperLabel: {
              show: true,
            },
            itemStyle: {
              borderColor: '#fff'
            },
            levels: getLevelOption(),
          }]
        }
      })
    };
  } else {
    option = {
      baseOption: {
        timeline: {
          axisType: 'category',
          playInterval: 1000,
          data: periods,
        },
        tooltip: {
          formatter: formatter
        },
      },
      options: _.map(periods, (p, index) => {
        return {
          series: [{
            type: 'sunburst',
            data: dataset[index],
            label: {
              formatter: '{b}:{c}',
            },
          }]
        }
      })
    };
  }
  chart.setOption(option);
}

function createChart(ele, theme = 'dark') {
  if (window.chart) window.chart.dispose();
  const chart = window.echarts.init(document.querySelector(`div[view_id='${ele}']`), theme);
  window.onresize = () => { chart.resize(); };
  window.chart = chart;
  return chart;
}

function createWidget(type, name, extra) {
  const width = 200;
  if (!name) name = type;
  switch (type) {
    case 0:
      return {
        view: 'multiselect', placeholder: '选择期数', name: 'periods', width: width,
        options: _.map(periods, (v) => { return { id: v, value: v }; })
      }
    case 1:
      return {
        view: 'multiselect', placeholder: '选择机构', name: name, width: width,
        options: _.map(banks, (v) => { return { id: v, value: v }; })
      }
    case 2:
      return {
        view: 'multiselect', placeholder: '选择地域', name: name, width: width,
        options: _.map(provinces, (v) => { return { id: v, value: v }; })
      }
    case 3:
      return {
        view: 'multiselect', placeholder: '选择个人｜对公', name: name, width: width,
        options: [{ 'id': '对公', 'value': '对公' }, { 'id': '个人', 'value': '个人' }]
      };
    case 4:
      return {
        view: 'multiselect', placeholder: '选择线上｜线下', name: name, width: width,
        options: [{ 'id': '线上', 'value': '线上' }, { 'id': '线下', 'value': '线下' }]
      };
    case 5:
      return {
        view: 'multiselect', placeholder: '选择总量｜增量', name: name, width: width,
        options: [{ 'id': '总量', 'value': '总量' }, { 'id': '增量', 'value': '增量' }]
      };
    case 6:
      return {
        view: 'text', placeholder: '输入聚合方法', name: 'aggregate', width: width,
      }
    case 7:
      return {
        view: 'radio', name: 'type', width: width, options: [
          { id: 'bar', value: '柱状图' },
          { id: 'line', value: '折线图' }
        ]
      }
    case 8:
      return {
        view: 'radio', name: 'type', width: width, options: [
          { id: 'treemap', value: '矩树图' },
          { id: 'sunburst', value: '旭日图' }
        ]
      }
    case 'accordion':
      return {
        view: 'accordion', id: 'accordion', multi: true,
        on: {
          onAfterCollapse: function () { if (window.chart) window.chart.resize() },
          onAfterExpand: function () { if (window.chart) window.chart.resize() },
        },
        rows: [
          {
            id: 'item', header: '筛选数据', body: {
              view: 'form', id: 'form', elements: [
                { view: 'flexlayout', cols: extra.widgets, },
                {
                  cols: [
                    {
                      view: 'button', value: '清除', css: 'webix_danger',
                      click: function () { $$('form').clear(); }
                    },
                    {
                      view: 'button', value: '确定', css: 'webix_transparent',
                      click: extra.handler
                    }
                  ]
                }
              ]
            },
          },
        ]
      };
    default:
      return {};
  }
}

function createDataset(id, input) {
  var dataset, category;
  switch (id) {
    case 'a1':
      dataset = { source: walletCount };
      break;
    case 'a2':
      dataset = { source: transAmount };
      break;
    case 'a3':
      dataset = { source: transCount };
      break;
    case 'b1':
      input.aggregate = input.aggregate + '3';
      input = processInput(input, ['periods', 1, 2, 3], [periods, banks, provinces, ['总量']])
      category = generateCategory(input, input.aggregate);
      if (category.length === 0) return null;
      dataset = buildWalletMAU(input, category);
      break;
    case 'b2':
      input = processDetailInput(input, [1, 2, 3], [banks, provinces, ['个人', '对公']], 3)
      if (!input) return null;
      dataset = buildWalletDetail(input);
      break;
    case 'c1':
      if (!input.aggregate) input.aggregate = '1';
      input = processInput(input, ['periods', 1, 2], [periods, banks, provinces])
      category = generateCategory(input, input.aggregate);
      if (category.length === 0) return null;
      dataset = buildShopCount(input, category);
      break;
    case 'c2':
      input = processDetailInput(input, [1, 2], [banks, provinces], 2)
      if (!input) return null;
      dataset = buildShopDetail(input);
      break;
    case 'd1':
    case 'd2':
      input.aggregate = input.aggregate + '3';
      input = processInput(input, ['periods', 1, 2, 3], [periods, banks, provinces, ['总量']])
      category = generateCategory(input, input.aggregate);
      if (category.length === 0) return null;
      if (id === 'd1') {
        dataset = buildTxAmount(input, category);
      } else {
        dataset = buildTxCount(input, category);
      }
      break;
    case 'd3':
    case 'd4':
      input = processDetailInput(input, [1, 2, 3], [banks, provinces, ['线上', '线下']], 3)
      if (!input) return null;
      if (id === 'd3') {
        dataset = buildTxAmountDetail(input);
      } else {
        dataset = buildTxCountDetail(input);
      }
      break;
  }
  return dataset;
}

function createView(id) {
  // do some cleanup works
  if (window.chart) window.chart.dispose();
  window.chart = null;

  // assemble view
  const view = { id: 'main' };
  const w = createWidget;
  var dataset, widgets;
  switch (id) {
    case 'a1':
    case 'a2':
    case 'a3':
      view.rows = [{ id: 'chart' }];
      setTimeout(function () {
        drawOverviewChart(createChart('chart'), createDataset(id));
      });
      break;
    case 'b1':
      widgets = [w(0), w(1), w(2), w(3), w(6), w(7)];
      view.rows = [
        w('accordion', null, {
          widgets: widgets, handler: function () {
            dataset = createDataset(id, $$('form').getValues());
            if (!dataset) return webix.message('聚合方式错误');
            drawOverviewChart(createChart('chart'), dataset, $$('form').getValues().type);
            $$('item').collapse();
          }
        }),
        { id: 'chart' },
      ];
      break;
    case 'b2':
      widgets = [w(1), w(2), w(3), w(6), w(8)];
      view.rows = [
        w('accordion', null, {
          widgets: widgets, handler: function () {
            dataset = createDataset(id, $$('form').getValues());
            if (!dataset) return webix.message('聚合方式错误');
            drawDetailChart(createChart('chart'), dataset, $$('form').getValues().type);
            $$('item').collapse();
          }
        }),
        { id: 'chart' },
      ];
      break;
    case 'c1':
      widgets = [w(0), w(1), w(2), w(6), w(7)];
      view.rows = [
        w('accordion', null, {
          widgets: widgets, handler: function () {
            dataset = createDataset(id, $$('form').getValues());
            if (!dataset) return webix.message('聚合方式错误');
            drawOverviewChart(createChart('chart'), dataset, $$('form').getValues().type);
            $$('item').collapse();
          }
        }),
        { id: 'chart' },
      ];
      break;
    case 'c2':
      widgets = [w(1), w(2), w(6), w(8)];
      view.rows = [
        w('accordion', null, {
          widgets: widgets, handler: function () {
            dataset = createDataset(id, $$('form').getValues());
            if (!dataset) return webix.message('聚合方式错误');
            drawDetailChart(createChart('chart'), dataset, $$('form').getValues().type);
            $$('item').collapse();
          }
        }),
        { id: 'chart' },
      ];
      break;
    case 'd1':
    case 'd2':
      widgets = [w(0), w(1), w(2), w(4, 3), w(6), w(7)];
      view.rows = [
        w('accordion', null, {
          widgets: widgets, handler: function () {
            dataset = createDataset(id, $$('form').getValues());
            if (!dataset) return webix.message('聚合方式错误');
            drawOverviewChart(createChart('chart'), dataset, $$('form').getValues().type);
            $$('item').collapse();
          }
        }),
        { id: 'chart' },
      ];
      break;
    case 'd3':
    case 'd4':
      widgets = [w(1), w(2), w(4, 3), w(6), w(8)];
      view.rows = [
        w('accordion', null, {
          widgets: widgets, handler: function () {
            dataset = createDataset(id, $$('form').getValues());
            if (!dataset) return webix.message('聚合方式错误');
            drawDetailChart(createChart('chart'), dataset, $$('form').getValues().type);
            $$('item').collapse();
          }
        }),
        { id: 'chart' },
      ];
      break;
    case 'work':
      view.view = 'carousel';
      view.cols = [];
      _.each(works, (v, i) => {
        v = periods[i] + '<hr>' + v;
        view.cols.push({ rows: [{}, { cols: [{}, { template: v, height: 500 }, {}] }, {}] });
      });
      break;
    case 'exit':
      location = '../index.html';
      break;
    default:
      webix.alert('出错了').then(() => location = '/pages/board.html');
  }
  return view;
}

function setup() {
  // inject data for global
  const data = webix.storage.local.get('data');
  if (!data) return window.location = '../index.html';
  _.extend(window, data);

  const menuData = [
    {
      id: 'a', icon: 'mdi mdi-view-dashboard', value: '趋势概览', data: [
        { id: 'a1', value: '开立数量' },
        { id: 'a2', value: '转账金额' },
        { id: 'a3', value: '转账笔数' },
      ]
    },
    {
      id: 'b', icon: 'mdi mdi-wallet-outline', value: '钱包数据', data: [
        { id: 'b1', value: '月活趋势' },
        { id: 'b2', value: '月活明细' },
      ]
    },
    {
      id: 'c', icon: 'mdi mdi-store', value: '商户数据', data: [
        { id: 'c1', value: '门店趋势' },
        { id: 'c2', value: '门店明细' },
      ]
    },
    {
      id: 'd', icon: 'mdi mdi-cash-100', value: '消费数据', data: [
        { id: 'd1', value: '金额趋势' },
        { id: 'd2', value: '笔数趋势' },
        { id: 'd3', value: '金额明细' },
        { id: 'd4', value: '笔数明细' },
      ]
    },
    { id: 'work', icon: 'mdi mdi-calendar-clock', value: '工作计划' },
    { id: 'exit', icon: 'mdi mdi-exit-to-app', value: '返回' }
  ];
  const banner = { view: 'label', id: 'banner', label: '欢迎使用', align: 'center' };
  const menuButton = {
    view: 'icon', icon: 'mdi mdi-menu', click: function () {
      $$('sidebar').toggle();
    }
  };
  const toolbar = { view: 'toolbar', padding: 3, elements: [menuButton, banner] };
  const sidebar = {
    view: 'sidebar', id: 'sidebar', collapsed: true,
    data: menuData, on: {
      onAfterSelect: function (id) {
        $$('banner').setValue(this.getItem(id).value);
        webix.ui(createView(id), $$('scrollview'), $$('main'));
        this.collapse();
      }
    }
  };
  const scrollview = {
    view: 'scrollview', id: 'scrollview', scroll: 'auto', body: {
      rows: [{ view: 'iframe', id: 'main', src: '../pages/screen.html' }]
    }
  };
  webix.ready(function () {
    webix.ui({
      rows: [toolbar, { cols: [sidebar, scrollview] }]
    });
  });
}
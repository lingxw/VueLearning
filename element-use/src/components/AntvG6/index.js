import G6 from '@antv/g6';

export function createG6() {
    G6.registerCombo(
        'cRect',
        {
          drawShape: function drawShape(cfg, group) {
            const self = this;
            // 获取配置中的 Combo 内边距
            cfg.padding = cfg.padding || [30, 20, 20, 20];
            // 获取样式配置，style.width 与 style.height 对应 rect Combo 位置说明图中的 width 与 height
            const style = self.getShapeStyle(cfg);
            // 绘制一个矩形作为 keyShape，与 'rect' Combo 的 keyShape 一致
            const rect = group.addShape('rect', {
              attrs: {
                ...style,
                x: -style.width / 2 - (cfg.padding[3] - cfg.padding[1]) / 2,
                y: -style.height / 2 - (cfg.padding[0] - cfg.padding[2]) / 2,
                width: style.width,
                height: style.height,
              },
              draggable: true,
              name: 'combo-keyShape',
            });
            // header
            // group.addShape('rect', {
            //     attrs: {
            //       ...style,
            //       x: -cfg.style.width / 2 - (cfg.padding[3] - cfg.padding[1]),
            //       y: -cfg.style.height / 2 - (cfg.padding[0] - cfg.padding[2]),
            //       width: cfg.style.width,
            //       height: 26,
            //     },
            //     draggable: true,
            //     name: 'combo-headerShape',
            //   });
              // 增加右侧圆
              group.addShape('circle', {
                attrs: {
                  ...style,
                  fill: '#fff',
                  opacity: 1,
                  // cfg.style.width 与 cfg.style.heigth 对应 rect Combo 位置说明图中的 innerWdth 与 innerHeight
                  x: cfg.style.width / 2 + cfg.padding[1],
                  y: (cfg.padding[2] - cfg.padding[0]) / 2,
                  r: 5,
                },
                draggable: true,
                name: 'combo-circle-shape1',
              });
            // 增加左侧圆
            group.addShape('circle', {
                attrs: {
                  ...style,
                  fill: '#fff',
                  opacity: 1,
                  // cfg.style.width 与 cfg.style.heigth 对应 rect Combo 位置说明图中的 innerWdth 与 innerHeight
                  x: -cfg.style.width / 2 - cfg.padding[1],
                  y: (cfg.padding[2] - cfg.padding[0]) / 2,
                  r: 5,
                },
                draggable: true,
                name: 'combo-circle-shape2',
              });
            return rect;
          },
          
          // 定义新增的右侧圆的位置更新逻辑
          afterUpdate: function afterUpdate(cfg, combo) {
            const group = combo.get('group');

            // 在该 Combo 的图形分组根据 name 找到header圆图形
            //const header = group.find((ele) => ele.get('name') === 'combo-headerShape');
            // // 更新header位置
            // header.attr({
            //   // cfg.style.width 与 cfg.style.heigth 对应 rect Combo 位置说明图中的 innerWdth 与 innerHeight
            //   x: -cfg.style.width / 2 - (cfg.padding[3] - cfg.padding[1]),
            //   y: -cfg.style.height / 2 - (cfg.padding[0] - cfg.padding[2]),
            // });

            // 在该 Combo 的图形分组根据 name 找到右侧圆图形
            const circle1 = group.find((ele) => ele.get('name') === 'combo-circle-shape1');
            // 更新右侧圆位置
            circle1.attr({
              // cfg.style.width 与 cfg.style.heigth 对应 rect Combo 位置说明图中的 innerWdth 与 innerHeight
              x: cfg.style.width / 2 + cfg.padding[1],
              y: (cfg.padding[2] - cfg.padding[0]) / 2,
            });
            // 在该 Combo 的图形分组根据 name 找到左侧圆图形
            const circle2 = group.find((ele) => ele.get('name') === 'combo-circle-shape2');
            // 更新左侧圆位置
            circle2.attr({
              // cfg.style.width 与 cfg.style.heigth 对应 rect Combo 位置说明图中的 innerWdth 与 innerHeight
              x: -cfg.style.width / 2 - cfg.padding[1],
              y: (cfg.padding[2] - cfg.padding[0]) / 2,
            });
          },
        },
        'rect',
      );
  const data = {
    nodes: [
      {
        id: '0',
        label: '0',
      },
      {
        id: '1',
        label: '1',
      },
      {
        id: '2',
        label: '2',
      },
      {
        id: '3',
        label: '3',
      },
      {
        id: '4',
        label: '4',
        comboId: 'A',
      },
      {
        id: '5',
        label: '5',
        comboId: 'B',
      },
      {
        id: '6',
        label: '6',
        comboId: 'A',
      },
      {
        id: '7',
        label: '7',
        comboId: 'C',
      },
      {
        id: '8',
        label: '8',
        comboId: 'C',
      },
      {
        id: '9',
        label: '9',
        comboId: 'A',
      },
      {
        id: '10',
        label: '10',
        comboId: 'B',
      },
      {
        id: '11',
        label: '11',
        comboId: 'B',
      },
    ],
    edges: [
      {
        source: '0',
        target: '1',
      },
      {
        source: '0',
        target: '2',
      },
      {
        source: '1',
        target: '4',
      },
      {
        source: '0',
        target: '3',
      },
      {
        source: '3',
        target: '4',
      },
      {
        source: '2',
        target: '5',
      },
      {
        source: '1',
        target: '6',
      },
      {
        source: '1',
        target: '7',
      },
      {
        source: '3',
        target: '8',
      },
      {
        source: '3',
        target: '9',
      },
      {
        source: '5',
        target: '10',
      },
      {
        source: '5',
        target: '11',
      },
      {
        source: '6',
        target: 'B',
      },
      {
        source: 'A',
        target: 'C',
      }
    ],
    combos: [
      {
        id: 'A',
        type: 'cRect',
        label: 'combo A',
        style: {
          fill: '#C4E3B2',
          stroke: '#C4E3B2',
        },
      },
      {
        id: 'B',
        type: 'cRect',
        label: 'combo B',
        style: {
          stroke: '#99C0ED',
          fill: '#99C0ED',
        },
      },
      {
        id: 'C',
        type: 'cRect',
        label: 'combo C',
        style: {
          stroke: '#eee',
          fill: '#eee',
        },
      },
    ],
  };
  
  data.nodes.forEach((node) => {
    switch (node.ComboId) {
      case 'A':
        node.style = {
          fill: '#C4E3B2',
          stroke: '#aaa',
        };
        break;
      case 'B':
        node.style = {
          fill: '#99C0ED',
          stroke: '#aaa',
        };
        break;
      case 'C':
        node.style = {
          fill: '#eee',
          stroke: '#aaa',
        };
        break;
      default:
        node.style = {
          fill: '#FDE1CE',
          stroke: '#aaa',
        };
        break;
    }
  });
  
  let sortByCombo = false;
  const descriptionDiv = document.createElement('button');
  descriptionDiv.innerHTML = 'Enable sortByCombo';
  const container = document.getElementById('container');
  container.appendChild(descriptionDiv);
  
  descriptionDiv.addEventListener('click', () => {
    sortByCombo = !sortByCombo;
    descriptionDiv.innerHTML = sortByCombo ? 'Disable sortByCombo' : 'Enable sortByCombo';
    graph.updateLayout({
      sortByCombo,
    });
  });
  const width = 900 // container.scrollWidth;
  const height = 500 // (container.scrollHeight || 500) - 30;
  const graph = new G6.Graph({
    container: 'container',
    width,
    height: height - 50,
    fitView: true,
    fitViewPadding: 30,
    animate: true,
    groupByTypes: false,
    modes: {
      default: [
        'drag-combo',
        'drag-node',
        'drag-canvas',
        {
          type: 'collapse-expand-combo',
          relayout: false,
        },
      ],
    },
    layout: {
      type: 'dagre',
      sortByCombo: false,
      ranksep: 20,
      nodesep: 20,
    },
    defaultNode: {
      size: [60, 30],
      type: 'rect',
      anchorPoints: [[0.5, 0], [0.5, 1]]
    },
    defaultEdge: {
      type: 'line',
    },
    defaultCombo: {
      type: 'rect',
      style: {
        fillOpacity: 0.1,
      },
    },
  });
  graph.data(data);
  graph.render();
  
  console.log('comboTrees', graph.get('comboTrees'))
  
//   if (typeof window !== 'undefined')
//     window.onresize = () => {
//       if (!graph || graph.get('destroyed')) return;
//       if (!container || !container.scrollWidth || !container.scrollHeight) return;
//       graph.changeSize(container.scrollWidth, container.scrollHeight - 30);
//     };
}

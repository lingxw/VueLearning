function createGraph(joint) {

    var childHeight = 26
    var childWidth = 120
    var headerHeight = 30;
    var padding = 10
    var headerWidth = childWidth + padding * 2
    var buttonSize = 14;

    joint.shapes.standard.Link.define('container.Link', {
        dep: null,
        attrs: {
            line: {
                stroke: '#222222',
                strokeWidth: 1,
                targetMarker: {
                    'd': 'M 4 -4 0 0 4 4 M 7 -4 3 0 7 4 M 10 -4 6 0 10 4',
                    'fill': 'none'
                }
            }
        }
      }, {
        setDep: function(dep, shows) {
          if (dep) {
            this.dep = dep
            if (shows) {
              shows.forEach(el => {
                if (el.kind === this.dep.kind) {
                  this.appendLabel({
                    attrs: { text: { text: el.name }},
                    position: {
                      offset: 15,
                      distance: 0.5
                    }
                  })
                }
              })
            }
          }
        }
      })

    joint.dia.Element.define('container.Child', {
        comp: null,
        size: { width: childWidth, height: childHeight },
        attrs: {
            root: {
                magnetSelector: 'body'
            },
            shadow: {
                refWidth: '100%',
                refHeight: '100%',
                x: 3,
                y: 3,
                fill: '#000000',
                opacity: 0.2
            },
            body: {
                refWidth: '100%',
                refHeight: '100%',
                strokeWidth: 1,
                stroke: '#FF4365',
                fill: '#F9DBDF'
            },
            label: {
                textVerticalAnchor: 'middle',
                textAnchor: 'middle',
                refX: '50%',
                refY: '50%',
                fontSize: 14,
                fontFamily: 'sans-serif',
                fill: '#222222'
            }
        }
    }, {
        markup: [{
            tagName: 'rect',
            selector: 'shadow',
        }, {
            tagName: 'rect',
            selector: 'body',
        }, {
            tagName: 'text',
            selector: 'label'
        }],
    // comp: {id, kind, name, attrs: {disp, mark}}
    // shows: [{kind:'child', icon: 'M 2 7 12 7 M 7 2 7 12', stroke：'#2F8AF1', fill:'#B5D6FC'}]
    setComp: function(comp, shows) {
        if (comp) {
          this.comp = comp
          this.attr('body/title', this.comp.kind)
          this.attr('label/text', this.comp.name)
        }
        if (shows) {
          shows.forEach(el => {
            if (el.kind === this.comp.kind) {
              this.attr('body/stroke', el.stroke)
              this.attr('body/fill', el.fill)
            }
          })
        }
      }
    })

    joint.dia.Element.define('container.Parent', {
        comp: null,
        collapsed: false,
        // size: { width: childWidth, height: childHeight },
        attrs: {
            root: {
                // magnet: false,
                magnetSelector: 'body'
            },
            shadow: {
                refWidth: '100%',
                refHeight: '100%',
                x: 3,
                y: 3,
                fill: '#000000',
                opacity: 0.05
            },
            body: {
                refWidth: '100%',
                refHeight: '100%',
                strokeWidth: 1,
                stroke: '#DDDDDD',
                fill: '#FCFCFC'
            },
            header: {
                refWidth: '100%',
                height: headerHeight,
                strokeWidth: 0.5,
                stroke: '#4666E5',
                fill: '#4666E5'
            },
            headerText: {
                textVerticalAnchor: 'middle',
                textAnchor: 'start',
                refX: 8,
                refY: headerHeight / 2,
                fontSize: 16,
                fontFamily: 'sans-serif',
                letterSpacing: 1,
                fill: '#FFFFFF',
                textWrap: {
                    width: -40,
                    maxLineCount: 1,
                    ellipsis: '*'
                },
                style: {
                    textShadow: '1px 1px #222222',
                }
            },
            button: {
                refDx: - buttonSize - (headerHeight - buttonSize) / 2,
                refY: (headerHeight - buttonSize) / 2,
                cursor: 'pointer',
                event: 'element:button:pointerdown',
                title: 'Collapse / Expand'
            },
            buttonBorder: {
                width: buttonSize,
                height: buttonSize,
                fill: '#000000',
                fillOpacity: 0.2,
                stroke: '#FFFFFF',
                strokeWidth: 0.5,
            },
            buttonIcon: {
                fill: 'none',
                stroke: '#FFFFFF',
                strokeWidth: 1
            }
        }
    }, {

        markup: [{
            tagName: 'rect',
            selector: 'shadow'
        }, {
            tagName: 'rect',
            selector: 'body'
        }, {
            tagName: 'rect',
            selector: 'header'
        }, {
            tagName: 'text',
            selector: 'headerText'
        }, {
            tagName: 'g',
            selector: 'button',
            children: [{
                tagName: 'rect',
                selector: 'buttonBorder'
            }, {
                tagName: 'path',
                selector: 'buttonIcon'
            }]
        }],
        toggle: function(shouldCollapse) {
            var buttonD;
            var collapsed = (shouldCollapse === undefined) ? !this.get('collapsed') : shouldCollapse;
            if (collapsed) {
                buttonD = 'M 2 7 12 7 M 7 2 7 12';
                this.resize(headerWidth, headerHeight);
            } else {
                buttonD = 'M 2 7 12 7';
                this.fitChildren();
            }
            this.attr(['buttonIcon','d'], buttonD);
            this.set('collapsed', collapsed);
        },

        isCollapsed: function() {
            return Boolean(this.get('collapsed'));
        },

        fitChildren: function() {
            var padding = 10;
            this.fitEmbeds({
                padding: {
                    top: headerHeight + padding,
                    left: padding,
                    right: padding,
                    bottom: padding
                }
            });
        },
      // comp: {id, kind, name, attrs: {disp, mark}}
      // shows: [{kind:'child', icon: 'M 2 7 12 7 M 7 2 7 12', stroke：'#2F8AF1', fill:'#B5D6FC'}]
      setComp: function(comp, shows) {
        if (comp) {
          this.comp = comp
          this.set('comp', comp)
          this.attr('header/title', this.comp.kind)
          this.attr('headerText/title', this.comp.kind)
          this.attr('headerIcon/title', this.comp.kind)
          this.attr('headerText/text', this.comp.name)
        }
        if (shows) {
          shows.forEach(el => {
            if (el.kind === this.comp.kind) {
              this.attr('body/stroke', el.stroke)
              this.attr('header/stroke', el.stroke)
              this.attr('header/fill', el.fill)
              this.attr('headerIcon/d', el.icon)
            }
          })
        }
        this.resize(headerWidth, headerHeight)
      }
    });

}

export default {
    createGraph
  }

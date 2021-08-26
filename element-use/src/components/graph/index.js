function initPaper(joint, paperId, embedFlag, routerName) {

    var graph = new joint.dia.Graph();
    var paper = new joint.dia.Paper({
        el: document.getElementById(paperId),
        width: 850,
        height: 600,
        model: graph,
        async: true,
        background: {
            color: '#F3F7F6'
        },
        interactive: { linkMove: false },
        defaultConnectionPoint: {
            name: 'boundary'
        },
        sorting: joint.dia.Paper.sorting.APPROX,
        viewport: function(view) {
            var element = view.model;
            // Hide any element or link which is embedded inside a collapsed parent (or parent of the parent).
            var hidden = element.getAncestors().some(function(ancestor) {
                return ancestor.isCollapsed();
            });
            return !hidden;
        }
    });

    paper.el.style.border = '1px solid #E2E2E2';
    const addZoomListeners = paper => {
      let zoomLevel = 1
      const zoom = zoomLevel => {
        paper.scale(zoomLevel)
        var size = paper.getComputedSize();
        paper.translate(0,0);
        paper.scale(zoomLevel, zoomLevel, size.width / 2, size.height / 2)
        // paper.fitToContent({ useModelGeometry: true, padding: 100 * zoomLevel, allowNewOrigin: 'any' })
      }
      document.getElementById('zoom-in').addEventListener('click', () => {
        zoomLevel = Math.min(3, zoomLevel + 0.2)
        zoom(zoomLevel)
      })
      document.getElementById('zoom-out').addEventListener('click', () => {
        zoomLevel = Math.max(0.2, zoomLevel - 0.2)
        zoom(zoomLevel)
      })
      document.getElementById('reset').addEventListener('click', function() {
        zoomLevel = 1
        zoom(zoomLevel)
      })
    }
    addZoomListeners(paper)

    var Container = joint.shapes.container.Parent;
    var Child = joint.shapes.container.Child;
    var Link = joint.shapes.container.Link;

    
    var shows = [
        { kind: 'child', icon: 'M6 0 L0 10 L12 10 Z',
          stroke: '#FFA743', fill: '#F8EFC1' },
        { kind: 'parent', icon: 'M6 0 L0 10 L12 10 Z',
          stroke: '#2F8AF1', fill: '#B5D6FC' },
         { kind: 'card', icon: 'M6 0 L0 10 L12 10 Z',
          stroke: '#BB2452', fill: '#F8A3CD' }
    ]
    var depShows = [
        { kind: 1, name: 'ref' }
      ]

    var container_a = new Container({
        z: 1,
        attrs: { headerText: { text: 'Container A' }}
    });
    container_a.setComp({id: 1, kind: 'parent', name: 'Container A', attrs: {disp: 'abc', mark: 'M' }}, shows)

    var container_b = new Container({
        z: 3,
        size: { width: 50, height: 50 },
        attrs: { header: {stroke: '#E546A8', fill: '#E546A8'}, headerText: { text: 'Container B' }}
    });
    container_b.setComp({id: 2, kind: 'card', name: 'Container B', attrs: {disp: 'abc', mark: 'M' }}, shows)

    var child_1 = new Child({
        z: 2,
        position: { x: 250, y: 150 },
        attrs: { label: { text: 1 }}
    });
    child_1.setComp({id: 3, kind: 'child', name: 'A1'}, shows)

    var child_2 = new Child({
        z: 2,
        position: { x: 200, y: 250 },
        attrs: { label: { text: 2 }}
    });
    child_2.setComp({id: 4, kind: 'child', name: 'A3'}, shows)

    var child_3 = new Child({
        z: 2,
        position: { x: 300, y: 250 },
        attrs: { label: { text: 3 }}
    });
    child_3.setComp({id: 4, kind: 'child', name: 'A3'}, shows)


    var child_4 = new Child({
        z: 4,
        position: { x: 400, y: 290 },
        attrs: { label: { text: '4' }}
    });
    child_4.setComp({id: 5, kind: 'child', name: 'B1'}, shows)

    var child_5 = new Child({
        z: 4,
        position: { x: 500, y: 360 },
        attrs: { label: { text: '5' }}
    });
    child_5.setComp({id: 6, kind: 'child', name: 'B2'}, shows)

    var link_1_2 = new Link({
        z: 2,
        source: { id: child_1.id },
        target: { id: child_2.id }
    });
    link_1_2.setDep({kind: 1}, depShows)

    var link_1_3 = new Link({
        z: 2,
        source: { id: child_1.id },
        target: { id: child_3.id }
    });
    link_1_3.setDep({kind: 1}, depShows)

    var link_4_5 = new Link({
        z: 4,
        source: { id: child_4.id },
        target: { id: child_5.id }
    });
    link_4_5.setDep({kind: 1}, depShows)

    var link_1_b = new Link({
        z: 4,
        source: { id: child_1.id },
        target: { id: child_4.id }
    });
    link_1_b.setDep({kind: 1}, depShows)

    if (routerName) {
        link_1_2.router({ name: routerName }) // manhattan, orthogonal
        link_1_3.router({ name: routerName }) // manhattan, orthogonal
        link_4_5.router({ name: routerName }) // manhattan, orthogonal
        link_1_b.router({ name: routerName }) // manhattan, orthogonal
    }
    graph.addCells([
        container_a, container_b,
        child_1, child_2, child_3, child_4, child_5,
        link_1_2, link_1_3, link_4_5, link_1_b
    ]);

    container_a.embed(child_1);
    container_a.embed(child_2);
    container_a.embed(child_3);
    if (embedFlag) {
        container_a.embed(container_b);
    }
    container_b.embed(child_4);
    container_b.embed(child_5);

    link_1_2.reparent();
    link_1_3.reparent();
    link_4_5.reparent();
    link_1_b.reparent();

    joint.layout.DirectedGraph.layout(graph, {
        // nodeSep: 10,
        // edgeSep: 30,
        marginX: 10,
        marginY: 10,
        rankDir: 'LR'
      })

    container_b.toggle(false);
    container_a.toggle(false);

    paper.on('element:button:pointerdown', function(elementView) {
        var element = elementView.model;
        element.toggle();
        fitAncestors(element);
    });

    paper.on('element:pointermove', function(elementView) {
        var element = elementView.model;
        fitAncestors(element);
    });

    function fitAncestors(element) {
        element.getAncestors().forEach(function(container) {
            container.fitChildren();
        });
    }

}

export default {
    initPaper
}
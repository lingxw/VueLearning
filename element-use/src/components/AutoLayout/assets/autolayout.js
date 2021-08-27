// Helpers.
// --------
function buildGraphFromAdjacencyList(joint, _, adjacencyList) {

    var elements = [];
    var links = [];
    
    _.each(adjacencyList, function(edges, parentElementLabel) {
        elements.push(makeElement(joint, _, parentElementLabel));

        _.each(edges, function(childElementLabel) {
            links.push(makeLink(joint, parentElementLabel, childElementLabel));
        });
    });

    // Links must be added after all the elements. This is because when the links
    // are added to the graph, link source/target
    // elements must be in the graph already.
    return elements.concat(links);
}

function makeLink(joint, parentElementLabel, childElementLabel) {

    return new joint.dia.Link({
        source: { id: parentElementLabel },
        target: { id: childElementLabel },
        attrs: { '.marker-target': { d: 'M 4 0 L 0 2 L 4 4 z' } },
        smooth: true
    });
}

function makeElement(joint, _, label) {

    var maxLineLength = _.max(label.split('\n'), function(l) { return l.length; }).length;

    // Compute width/height of the rectangle based on the number
    // of lines in the label and the letter size. 0.6 * letterSize is
    // an approximation of the monospace font letter width.
    var letterSize = 8;
    var width = 2 * (letterSize * (0.6 * maxLineLength + 1));
    var height = 2 * ((label.split('\n').length + 1) * letterSize);

    return new joint.shapes.basic.Rect({
        id: label,
        size: { width: width, height: height },
        attrs: {
            text: { text: label, 'font-size': letterSize, 'font-family': 'monospace' },
            rect: {
                width: width, height: height,
                rx: 5, ry: 5,
                stroke: '#555'
            }
        }
    });
}

function init(joint, _, $, V, paperId) {
    // Main.
    // -----

    var graph = new joint.dia.Graph;

    var paper = new joint.dia.Paper({

        el: $('#' + paperId),
        width: 2000,
        height: 2000,
        gridSize: 1,
        model: graph
    });

    // Just give the viewport a little padding.
    V(paper.viewport).translate(20, 20);
    window.graph = graph
    $('#btn-layout').on('click', layout)
    // layout(joint, graph, _, $);
    layout()
}

function layout() {
    var joint = window.joint
    var graph = window.graph
    var _ = window._
    var $ = window.$

    var adjacencyList = null
    try {
        adjacencyList = eval('adjacencyList = ' + $('#adjacency-list').val());
    } catch (e) { alert(e); }
    
    var cells = buildGraphFromAdjacencyList(joint, _, adjacencyList);
    graph.resetCells(cells);
    joint.layout.DirectedGraph.layout(graph, { setLinkVertices: false });
}

export default {
    init
}
import {booleanAttributes} from "../virtual/fromDOM.js";

function createNode(insideSvg, options, nodeName) {
    if (insideSvg)
        return options.document.createElementNS('http://www.w3.org/2000/svg', nodeName);
    else if (nodeName === 'svg')
        return options.document.createElementNS('http://www.w3.org/2000/svg', 'svg');

    return options.document.createElement(nodeName);
}

export function objToNode(objNode, insideSvg, options) {
    const nodeName = objNode.nodeName.toLowerCase();

    if (nodeName === '#text') {
        return options.document.createTextNode(objNode.data);
    } else if (nodeName === '#comment') {
        return options.document.createComment(objNode.data);
    }
    let node = createNode(insideSvg, options, nodeName);
    if (objNode.attributes) {
        Object.entries(objNode.attributes).forEach(([key, value]) => node.setAttribute(key, value));
    }
    if (objNode.childNodes) {
        objNode.childNodes.forEach(childNode => node.appendChild(objToNode(childNode, insideSvg || nodeName === "svg", options)));
    }
    if (objNode.value) {
        node.value = objNode.value;
    }

    let attrs = booleanAttributes[nodeName];

    if (attrs) {
        attrs.filter(a => objNode[a]).forEach(a => node[a] = true);
    }
    booleanAttributes["html"].filter(a => objNode[a]).forEach(a => node[a] = true);

    return node;
}

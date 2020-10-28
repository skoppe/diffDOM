export const booleanAttributes = {
    media: ["muted", "autoplay", "loop", "controls", "defaultMuted"],
    html: ["translate", "hidden", "draggable", "spellcheck"],
    ol: ["reversed"],
    img: ["isMap"],
    iframe: [ "allowFullscreen", "allowPaymentRequest" ],
    object: ["typeMustMatch"],
    video: ["playsInline"],
    track: ["default"],
    form: ["noValidate" ],
    input: ["autofocus","checked","disabled","formNoValidate","indeterminate","multiple","readOnly", "required"],
    button: ["autofocus", "disabled", "formNoValidate"],
    select: ["autofocus", "disabled", "multiple", "required"],
    optgroup: ["disabled"],
    option: ["disabled", "selected"],
    textarea: ["autofocus", "disabled", "readOnly", "required"],
    fieldset: ["disabled"],
    details: ["open"],
    dialog: ["open"],
    script: ["noModule", "async", "defer"],
    frame: ["noResize"]
};

export function nodeToObj(aNode, options = {}) {
    const nodeName = aNode.nodeName.toLowerCase();
    if (nodeName === '#text' || nodeName === '#comment')
        return {nodeName, data: aNode.data};

    const objNode = {
        nodeName: nodeName,
        attributes: {}
    };

    if (aNode.attributes && aNode.attributes.length > 0) {
        const nodeArray = Array.prototype.slice.call(aNode.attributes);
        nodeArray.filter(a => aNode[a.name] !== false).forEach(attribute => {
            objNode.attributes[attribute.name] = attribute.value;
        });
    }
    if (aNode.value !== undefined)
        objNode.value = aNode.value;
    if (aNode.childNodes && aNode.childNodes.length > 0) {
        const nodeArray = Array.prototype.slice.call(aNode.childNodes);
        objNode.childNodes = nodeArray.map(childNode => nodeToObj(childNode, options));
    }
    let attrs = booleanAttributes[nodeName];
    if (attrs) {
        attrs.filter(a => aNode[a]).forEach(a => objNode.attributes[a] = true);
    }
    booleanAttributes["html"].filter(a => aNode[a]).forEach(a => objNode.attributes[a] = true);
    return objNode;
}

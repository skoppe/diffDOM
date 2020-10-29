import {objToNode} from "./fromVirtual"

// ===== Apply a diff =====

function getFromRoute(node, route) {
    route = route.slice()
    while (route.length > 0) {
        if (!node.childNodes) {
            return false
        }
        const c = route.splice(0, 1)[0]
        node = node.childNodes[c]
    }
    return node
}

export function applyDiff(
        tree,
        diff,
        options // {preDiffApply, postDiffApply, textDiff, valueDiffing, _const}
    ) {
    let _const = options._const;
    let node = getFromRoute(tree, diff[_const.route])
    let newNode
    let reference
    let route
    let nodeArray
    let c

    // pre-diff hook
    const info = {
        diff,
        node
    }

    if (options.preDiffApply(info)) {
        return true
    }

    switch (diff[_const.action]) {
        case _const.addAttribute:
            if (!node || !node.setAttribute) {
                return false
            }
        if (diff[_const.value] === true) {
            node[diff[_const.name]] = true;
            node.setAttribute(diff[_const.name], "")
        } else
            node.setAttribute(diff[_const.name], diff[_const.value])
            break
        case _const.modifyAttribute:
            if (!node || !node.setAttribute) {
                return false
            }
            node.setAttribute(diff[_const.name], diff[_const.newValue])
            if (node.nodeName === 'INPUT' && diff[_const.name] === 'value') {
                node.value = diff[_const.newValue]
            }
            break
        case _const.removeAttribute:
            if (!node || !node.removeAttribute) {
                return false
            }
        if (diff[_const.value] === true)
            node[diff[_const.name]] = false;
            node.removeAttribute(diff[_const.name])
            break
        case _const.modifyTextElement:
            if (!node || node.nodeType !== 3) {
                return false
            }
            options.textDiff(node, node.data, diff[_const.oldValue], diff[_const.newValue])
            break
        case _const.modifyValue:
            if (!node || typeof node.value === 'undefined') {
                return false
            }
            node.value = diff[_const.newValue]
            break
        case _const.modifyComment:
            if (!node || typeof node.data === 'undefined') {
                return false
            }
            options.textDiff(node, node.data, diff[_const.oldValue], diff[_const.newValue])
            break
        case _const.modifyChecked:
            if (!node || typeof node.checked === 'undefined') {
                return false
            }
            node.checked = diff[_const.newValue]
            break
        case _const.modifySelected:
            if (!node || typeof node.selected === 'undefined') {
                return false
            }
            node.selected = diff[_const.newValue]
            break
        case _const.replaceElement:
            node.parentNode.replaceChild(
                objToNode(
                    diff[_const.newValue],
                    node.namespaceURI === 'http://www.w3.org/2000/svg',
                    options
                ),
                node
            )
            break
        case _const.relocateGroup:
            nodeArray = Array(...new Array(diff.groupLength)).map(() => node.removeChild(node.childNodes[diff[_const.from]]))
            nodeArray.forEach((childNode, index) => {
                if (index === 0) {
                    reference = node.childNodes[diff[_const.to]]
                }
                node.insertBefore(childNode, reference || null)
            })
            break
        case _const.removeElement:
            node.parentNode.removeChild(node)
            break
        case _const.addElement:
            route = diff[_const.route].slice()
            c = route.splice(route.length - 1, 1)[0]
            node = getFromRoute(tree, route)
            node.insertBefore(
                objToNode(
                    diff[_const.element],
                    node.namespaceURI === 'http://www.w3.org/2000/svg',
                    options
                ),
                node.childNodes[c] || null
            )
            break
        case _const.removeTextElement:
            if (!node || node.nodeType !== 3) {
                return false
            }
            node.parentNode.removeChild(node)
            break
        case _const.addTextElement:
            route = diff[_const.route].slice()
            c = route.splice(route.length - 1, 1)[0]
            newNode = options.document.createTextNode(diff[_const.value])
            node = getFromRoute(tree, route)
            if (!node || !node.childNodes) {
                return false
            }
            node.insertBefore(newNode, node.childNodes[c] || null)
            break
        default:
            console.log('unknown action')
    }

    // if a new node was created, we might be interested in its
    // post diff hook
    info.newNode = newNode
    options.postDiffApply(info)

    return true
}

export function applyDOM(tree, diffs, options) {
    return diffs.every(diff => applyDiff(tree, diff, options))
}

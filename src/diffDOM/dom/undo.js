import {applyDiff} from "./apply"

// ===== Undo a diff =====

function swap(obj, p1, p2) {
    const tmp = obj[p1]
    obj[p1] = obj[p2]
    obj[p2] = tmp
}

function undoDiff(
    tree,
    diff,
    options // {preDiffApply, postDiffApply, textDiff, valueDiffing, _const}
) {
    let _const = options._const;

    switch (diff[_const.action]) {
        case _const.addAttribute:
            diff[_const.action] = _const.removeAttribute
            applyDiff(tree, diff, options)
            break
        case _const.modifyAttribute:
            swap(diff, _const.oldValue, _const.newValue)
            applyDiff(tree, diff, options)
            break
        case _const.removeAttribute:
            diff[_const.action] = _const.addAttribute
            applyDiff(tree, diff, options)
            break
        case _const.modifyTextElement:
            swap(diff, _const.oldValue, _const.newValue)
            applyDiff(tree, diff, options)
            break
        case _const.modifyValue:
            swap(diff, _const.oldValue, _const.newValue)
            applyDiff(tree, diff, options)
            break
        case _const.modifyComment:
            swap(diff, _const.oldValue, _const.newValue)
            applyDiff(tree, diff, options)
            break
        case _const.modifyChecked:
            swap(diff, _const.oldValue, _const.newValue)
            applyDiff(tree, diff, options)
            break
        case _const.modifySelected:
            swap(diff, _const.oldValue, _const.newValue)
            applyDiff(tree, diff, options)
            break
        case _const.replaceElement:
            swap(diff, _const.oldValue, _const.newValue)
            applyDiff(tree, diff, options)
            break
        case _const.relocateGroup:
            swap(diff, _const.from, _const.to)
            applyDiff(tree, diff, options)
            break
        case _const.removeElement:
            diff[_const.action] = _const.addElement
            applyDiff(tree, diff, options)
            break
        case _const.addElement:
            diff[_const.action] = _const.removeElement
            applyDiff(tree, diff, options)
            break
        case _const.removeTextElement:
            diff[_const.action] = _const.addTextElement
            applyDiff(tree, diff, options)
            break
        case _const.addTextElement:
            diff[_const.action] = _const.removeTextElement
            applyDiff(tree, diff, options)
            break
        default:
            console.log('unknown action')
    }

}

export function undoDOM(tree, diffs, options) {
    if (!diffs.length) {
        diffs = [diffs]
    }
    diffs = diffs.slice()
    diffs.reverse()
    diffs.forEach(diff => {
        undoDiff(tree, diff, options)
    })
}

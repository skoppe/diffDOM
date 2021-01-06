import {
    DiffDOM, stringToObj, nodeToObj
} from "../src/index";
import { objToNode } from "../src/diffDOM/dom/fromVirtual.js"

import { Diff } from "../src/diffDOM/virtual/helpers.js"


const dd = new DiffDOM({
    debug: true,
    diffcap: 500
});

describe('diff obj', () => {

    it('add checked', () => {
        expect(dd.diff(stringToObj("<input>"),stringToObj("<input checked>"))).toStrictEqual([({action: "addAttribute", name: "checked", route: [], value: true})]);
    });

    it('remove checked', () => {
        expect(dd.diff(stringToObj("<input checked>"),stringToObj("<input>"))).toStrictEqual([({action: "removeAttribute", name: "checked", route: [], value: true})]);
    });

    it('select option', () => {
        expect(dd.diff(stringToObj("<select><option><option></select>"),stringToObj("<select><option>A<option></select>"))).toStrictEqual([({action: "addTextElement", route: [0,0], value: "A"})]);
    });

    it('add unknown boolean attr', () => {
        expect(dd.diff(stringToObj("<node>"),stringToObj("<node stuff>"))).toStrictEqual([({action: "addAttribute", route: [], value: true, name: "stuff"})]);
    });

    it('remove unknown boolean attr', () => {
        expect(dd.diff(stringToObj("<node stuff>"),stringToObj("<node>"))).toStrictEqual([({action: "removeAttribute", route: [], value: true, name: "stuff"})]);
    });

});

describe('diff obj stringToNode', () => {

    function stringToNode(s) {
        return objToNode(stringToObj(s), false, {document: document});
    }
    it('add checked', () => {
        expect(dd.diff(stringToNode("<input>"),stringToNode("<input checked>"))).toStrictEqual([({action: "addAttribute", name: "checked", route: [], value: true})]);
    });

    it('remove checked', () => {
        expect(dd.diff(stringToNode("<input checked>"),stringToNode("<input>"))).toStrictEqual([({action: "removeAttribute", name: "checked", route: [], value: true})]);
    });

    it('select option add text', () => {
        expect(dd.diff(stringToNode("<select><option><option></select>"),stringToNode("<select><option>A<option></select>"))).toStrictEqual([({action: "addTextElement", route: [0,0], value: "A"}),({action: "modifyValue", newValue: "A", oldValue: "", route: []}), ({action: "modifyValue", newValue: "A", oldValue: "", "route": [0]})]);
    });

    it('diff unknown boolean attribute', () => {
        const base = stringToNode("<node stuff=\"\">");
        const diff = dd.diff(base, stringToObj("<node stuff>"));
        expect(diff).toStrictEqual([]);
    });

    it('divergent attribute', () => {
        let input = stringToNode("<input>");
        input.checked = true;
        expect(dd.diff(input, "<input>")).toStrictEqual([({action: "removeAttribute",name:"checked",route:[],value:true})]);
    });

    it('divergent attribute 2', () => {
        let input = stringToNode("<input checked=\"\">");
        input.checked = false;
        expect(dd.diff(input, "<input>")).toStrictEqual([]);
    });

    it('radios checked', () => {
        let input = stringToNode("<form><input type=\"radio\" value=\"A\"><input type=\"radio\" value=\"B\"></form>");
        expect(dd.diff(input, "<form><input type=\"radio\" value=\"A\"><input type=\"radio\" value=\"B\" checked></form>")).toStrictEqual([{action: "addAttribute", name: "checked", route: [1], value: true}]);
    });

    it('radios checked 2', () => {
        let input = stringToNode("<form><input type=\"radio\" value=\"A\"><input type=\"radio\" value=\"B\"></form>");
        expect(dd.diff(input, "<form><input type=\"radio\" value=\"A\" checked><input type=\"radio\" value=\"B\"></form>")).toStrictEqual([{action: "addAttribute", name: "checked", route: [0], value: true}]);
    });

    it('diff values with qoutes correctly', () => {
        let input = stringToObj("<input value=''>");
        expect(dd.diff(input, `<input value="don\\\"t">`)).toStrictEqual([{action: "modifyAttribute", name: "value", route: [], oldValue: true, newValue: `don"t`}]);
        expect(dd.diff(input, `<input value='don\\\'t'>`)).toStrictEqual([{action: "modifyAttribute", name: "value", route: [], oldValue: true, newValue: `don't`}]);
    });
});

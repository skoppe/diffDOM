import {
    DiffDOM, stringToObj, nodeToObj
} from "../src/index";
import { objToNode } from "../src/diffDOM/dom/fromVirtual.js"

import { Diff } from "../src/diffDOM/virtual/helpers.js"


const dd = new DiffDOM({
    debug: true,
    diffcap: 500
});

function stringToNode(s) {
    return objToNode(stringToObj(s), false, {document: document});
}

describe('apply stringToObj', () => {

    it('add checked', () => {
        const base = stringToNode("<input>");
        const diff = dd.diff(base, stringToObj("<input checked>"));
        dd.apply(base, diff);
        expect(nodeToObj(base)).toStrictEqual({attributes:{"checked":true},"nodeName":"input",value:""});
    });


    it('add option child', () => {
        const base = stringToNode("<select><option></option></select>");
        const diff = dd.diff(base, stringToObj("<select><option>A</option></select>"));
        dd.apply(base, diff);
        expect(nodeToObj(base)).toStrictEqual({attributes:{},nodeName:"select",value:"A",childNodes:[{attributes:{selected:true},childNodes:[{data:"A",nodeName: "#text"}],nodeName:"option",value:"A"}]});
    });

    it('switch default select option child', () => {
        const base = stringToNode("<select><option></option><option>A</option></select>");
        const diff = dd.diff(base, stringToObj("<select><option>A</option><option></option></select>"));
        dd.apply(base, diff);
        expect(nodeToObj(base)).toStrictEqual({attributes:{},nodeName:"select",value:"A",childNodes:[{attributes:{selected:true},childNodes:[{data:"A",nodeName: "#text"}],nodeName:"option",value:"A"},{attributes:{value:""},nodeName:"option",value:""}]});
    });

    it('add unknown boolean attribute', () => {
        const base = stringToNode("<node>");
        const diff = dd.diff(base, stringToObj("<node stuff>"));
        dd.apply(base, diff);
        expect(nodeToObj(base)).toStrictEqual({attributes:{stuff:""},nodeName:"node"});
    });

});

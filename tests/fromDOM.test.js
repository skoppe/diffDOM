import {
    nodeToObj
} from "../src/index"


const html = `<div></div>
<div attr='123'></div>
<div><inner></inner></div>
<hr/>
<input checked>
<div>bla</div>
<div>bla bar</div>
<div>bla<span></span>bar</div>
<svg></svg>
`.replace(/\n/g,"");

document.body.innerHTML = html;

describe('nodeToObj', () => {

    it('parse node', () => {
        expect(nodeToObj(document.body.childNodes[0])).toStrictEqual({attributes:{},nodeName:"div"});
    });

    it('parse attribute', () => {
        expect(nodeToObj(document.body.childNodes[1])).toStrictEqual({attributes:{attr:"123"},nodeName:"div"});
    });

    it('parse children', () => {
        expect(nodeToObj(document.body.childNodes[2])).toStrictEqual({attributes:{},nodeName:"div",childNodes:[{attributes:{},nodeName:"inner"}]});
    });

    it('parse selfclosing', () => {
        expect(nodeToObj(document.body.childNodes[3])).toStrictEqual({attributes:{},nodeName:"hr"});
    });

    it('parse properties', () => {
        expect(nodeToObj(document.body.childNodes[4])).toStrictEqual({attributes:{checked:true},nodeName:"input",value:""});
    });

    it('parse text node', () => {
        expect(nodeToObj(document.body.childNodes[5])).toStrictEqual({attributes:{},nodeName:"div",childNodes:[{data:"bla",nodeName:"#text"}]});
    });

    it('parse multiple text node', () => {
        expect(nodeToObj(document.body.childNodes[6])).toStrictEqual({attributes:{},nodeName:"div",childNodes:[{data:"bla bar",nodeName:"#text"}]});
    });

    it('parse mixed children', () => {
        expect(nodeToObj(document.body.childNodes[7])).toStrictEqual({attributes:{},nodeName:"div",childNodes:[{data:"bla",nodeName:"#text"},{attributes:{},nodeName:"span"},{data:"bar",nodeName:"#text"}]});
    });

    it('parse svg', () => {
        expect(nodeToObj(document.body.childNodes[8])).toStrictEqual({attributes:{},nodeName:"svg"});
    });
});

import {
    stringToObj
} from "../src/index"


describe('stringToObj', () => {

    it('parse node', () => {
        expect(stringToObj("<div>")).toStrictEqual({attributes:{},nodeName:"div"});
    });

    it('parse attribute', () => {
        expect(stringToObj("<div attr='123'>")).toStrictEqual({attributes:{attr:"123"},nodeName:"div"});
    });

    it('parse children', () => {
        expect(stringToObj("<div><inner></inner></div>")).toStrictEqual({attributes:{},nodeName:"div",childNodes:[{attributes:{},nodeName:"inner"}]});
    });

    it('parse selfclosing', () => {
        expect(stringToObj("<hr/>")).toStrictEqual({attributes:{},nodeName:"hr"});
    });

    it('parse boolean attributes', () => {
        expect(stringToObj("<input checked>")).toStrictEqual({attributes:{checked:true},nodeName:"input"});
    });

    it('parse text node', () => {
        expect(stringToObj("<div>bla</div>")).toStrictEqual({attributes:{},nodeName:"div",childNodes:[{data:"bla",nodeName:"#text"}]});
    });

    it('parse multiple text node', () => {
        expect(stringToObj("<div>bla bar</div>")).toStrictEqual({attributes:{},nodeName:"div",childNodes:[{data:"bla bar",nodeName:"#text"}]});
    });

    it('parse mixed children', () => {
        expect(stringToObj("<div>bla<span></span>bar</div>")).toStrictEqual({attributes:{},nodeName:"div",childNodes:[{data:"bla",nodeName:"#text"},{attributes:{},nodeName:"span"},{data:"bar",nodeName:"#text"}]});
    });

});

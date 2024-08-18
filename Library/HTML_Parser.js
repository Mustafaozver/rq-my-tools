module.exports=((ATA)=>{
	
	
	const DomElement = (()=>{
		const private_key = Symbol();
		
		const hidden_stack = {};
		
		const register = (ins, tagname)=>{
			const ID = Symbol();
			ins[private_key] = ID;
			
			hidden_stack[ID] = {
				contents:[],
				attributes:{},
				tagname,
			};
		};
		
		const Class = class{
			[private_key] = null;
			type = 0;
			
			constructor(tagname="DIV"){
				register(this, tagname);
			};
			
			AddElement(tagname){
				return AddElement(this, tagname);
			};
			
			SetAttribute(key, value){
				SetAttribute(this, key, value);
			};
			
			Compile(){
				return Compile(this);
			};
		};
		
		const AddElement = (ins, tagname)=>{
			const ID = ins[private_key];
			const hstack = hidden_stack[ID];
			
			const dom = new Class(tagname);
			hstack.contents.push(dom);
			return dom;
		};
		
		const SetAttribute = (ins, key, value)=>{
			const ID = ins[private_key];
			const hstack = hidden_stack[ID];
			
			hstack.attributes[key] = value;
		};
		
		const Compile = (ins)=>{
			const ID = ins[private_key];
			const hstack = hidden_stack[ID];
			
			const { tagname, contents, attributes } = hstack;
			
			const _s = "\n";
			
			if(ins.type === 0){
				return "<" + tagname.toUpperCase() + Compile_Attributes(attributes) + ">" + _s + contents.map((Element)=>{
					return Element.Compile();
				}).join("") + "</" + tagname.toUpperCase() + ">" + _s;
			} else return "<" + tagname.toUpperCase() + Compile_Attributes(attributes) + " />" + _s;
			
		};
		
		const Compile_Attributes = (attributes)=>{
			const keys = Object.keys(attributes);
			let text = "";
			for(let i=0;i<keys.length;i++){
				const key = keys[i];
				text += " " + key + "=\"" + attributes[key] + "\"";
			}
			return text;
		};
		
		return Class;
	})();
	
	const HTML_Parse111 = (code)=>{
		const regex = /^(?<all>(((<(?<tagname>(\w+)))(\s*)((?<attributes>((\s+\w+((=(.?(\w+).?))?))*)*))(\s*)(((>(?<contents>(.*))(<\/(\5)>)))|(\/>))))+)$/g;
		code = code.split("\n").join("");
		if(regex.test(code)){
			const arr = [];
			let match;
			while(match = regex.exec(code)){
				arr.push(match.groups);
			}
			return arr;
		}
		return code;
	};
	
	const HTML_Parse = (code)=>{
		const regex = /(?<all>(((<(?<tagname>(\w+)))(\s*)((?<attributes>((\s+\w+((=(.?(\w+).?))?))*)*))(\s*)(((>(?<contents>(.*))(<\/(\5)>)))|(\/>)))))/g;
		code = (code+"").split("\n").join("");
		if((new RegExp(regex)).test(code)){
			const arr = [];
			let match;
			while(match = regex.exec(code)){
				arr.push(match.groups);
			}
			return arr;
		}
		return [];
	};
	
	const Search_HTML_ = (code)=>{
		const objs = HTML_Parse(code);
		objs.map((obj)=>{
			obj.contents = Search_HTML_(obj.contents);
		});
		return objs;
	};
	
	const Search_HTML = (code)=>{
		const obj = Search_HTML_((code + "").split("\n").join("").split("\t").join("").split("\r").join(""));
		
		const Expand = (obj)=>{
			if({...obj}.tagname)return{
				t: obj.tagname,
				c: obj.contents.map(Expand),
			};
			return obj;
		};
		
		return Expand(obj[0]);
	};
	
	return{
		DomElement,
		HTML_Parse,
		Search_HTML
	};
})(ATA());
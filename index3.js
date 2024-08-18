((ATA)=>{
	const Typescript = require("typescript");
	const inspector = require("inspector");
	const express = require("express");
	const Terser = require("terser");
	const http = require("http");
	const sass = require("sass");
	const Ejs = require("ejs");
	
	const ReadFile = (path)=>{
		return ATA.FS.readFileSync(path, "UTF8");
	};
	
	const MC = ATA.Require("./Library/mc.js");
	const HTML_Parser = ATA.Require("./Library/HTML_Parser.js");
	
	const port = 8580;
	
	
	ATA.Setups.push(()=>{
		return;
		const app = express();
		app.use(express.static(ATA.Path.join(ATA.CWD, "./View/")));
		
		const server = http.createServer(app);
		
		server.on("error", (error)=>{
			switch(error.code){
				case"EACCES":
					console.error("Hata : Sunucu ek izinlere ihtiyaç duyuyor.");
					break;
				case"EADDRINUSE":
					console.error("Hata : Bu port zaten kullanılıyor.");
					break;
				default:
					console.error("Server Error => ");
					console.error(error);
					break;
			}
		});
		
		server.on("listening", () => {
			const ddr = server.address();
			console.info("HTTP server on " + ddr.address + ":" + ddr.port);
		});
		
		app.get("/" ,(req, res, next)=>{
			res.redirect("/home");
		});
		
		inspector.open(port- -6);
		server.listen(port);
		
		const url = inspector.url();
		const path1 = ATA.Path.parse(url);
		
		const path2 = MC.URL_Parse(url);
		
		console.log({ path1, path2, MC });
	});
	
	
	
	ATA.Setups.push(()=>{
		
		const HTML = new HTML_Parser.DomElement("HTML");
		
		HTML.SetAttribute("lang", "tr");
		
		const HEAD = HTML.AddElement("HEAD");
		const BODY = HTML.AddElement("BODY");
		
		const code = ReadFile(ATA.Path.join(ATA.CWD, "./tmp/dosya.html"));//HTML.Compile();
		
		const obj = HTML_Parser.Search_HTML(code);
		
		console.log(" => (" + code + ")\n");
		console.log(" => (", obj, ")");
		console.log(" => (", JSON.stringify(obj, null, "\t"), ")");
		//console.log(" => (", HTML_Parser.HTML_Parse(obj[0].contents), ")");
		
		
		
		
		
		
		
		
		
		
	});
	
})(require("ata.js")());
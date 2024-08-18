((ATA)=>{
	
	const inspector = require("inspector");
	inspector.open(9555);

	const Setup = async()=>{
		console.log("Başlıyoruz...");
		
		
		
		console.log("Bitti");
	};
	
	ATA.Setups.push(()=>{
		const url = inspector.url();
		console.log("INS => ", url);
		Setup();
	});
})(require("ata.js")());
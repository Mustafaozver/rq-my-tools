((ATA)=>{
	
	const Setup = async()=>{
		console.log("Başlıyoruz...");
		
		
		
		console.log("Bitti");
	};
	
	ATA.Setups.push(()=>{
		Setup();
	});
})(require("ata.js")());
module.exports=((ATA)=>{
	
	const URL_Parse = (url)=>{
		url = url + "";
		const split0 = url.split("#");
		const hash = split0[1] || "";
		const split1 = split0[0].split("?");
		const query = split1[1] || "";
		
		
		
		
		
		return parsed;
	};
	
	return{
		URL_Parse,
		
	};
})(ATA());



(() => {
	const url = "https://www.google.com.tr:8080/torun/dede.php?gg=4&tt=8#install2";
	const regex = /^(?<url>(((((?<protocol>(([a-zA-Z0-9]+)?)):)?\/\/))?(?<domain>(([a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)*)?))?(:(?<port>(\d+)))?)(?<path>((?<directory>(\/([a-zA-Z0-9_-]+\/)+))?(?<filename>(([a-zA-Z0-9_-]+)(\.(?<extension>([a-zA-Z0-9_-]+)))?))?(\?(?<query>([^#]+)))?(#(?<hash>(.+)))?)))$/; // $/ olacak sonu
	const match = regex.exec(url);

	const group = { ...{ ...match }.groups };

	console.log(Object.keys(group).map((key) => {
		return " " + key + " => " + group[key];
	}).join("\n"));
	//return;
	console.log("FULL => ", regex.exec("https://www.google.com.tr:8080/torun/dede.php?gg=4&tt=8#install2").groups);

	console.log(regex.exec("https://www.google.com.tr/"));
	console.log(regex.exec("https://www.google.com.tr:8080/"));

	console.log(regex.exec("https://www.google.com.tr:8080/torun/"));

	console.log(regex.exec("https://www.google.com.tr:8080/torun/dede.php"));

	console.log(regex.exec("https://www.google.com.tr:8080/torun/dede.php?gg=4&tt=8"));

	console.log(regex.exec("https://www.google.com.tr:8080/torun/dede.php?gg=4&tt=8#install2"));

})();
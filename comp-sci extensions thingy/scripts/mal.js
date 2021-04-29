// https://github.com/zuritor/jikanjs for docs

var CLIENT_ID = 'fda9107ca5aa66a627be5116c978b6c6'
var code_verifier = "wcqoBIBL-h64367UBDr5kr3Vz5wCPeb_3g5tZ_Zx2ucoYD0Ybz1Zemw4kTwcFUWGwx3hSv1feeHqHJTm7QfLnEkTuKAnFsZ6roPQ2BSpFjfm_9O1jUlZXgz2LnRrLovQ"
var authorisation_code = "def50200f9060822e6309c2f79fe461049f2421e0a37047d79d9e89a4a9ce3b41d29151a4840159b25d0006afdc4ec38177dc779b732e989b01cffcd8fe2d5d204ee7c971df9624ff26acb24a7433811f4b1b56126c1a31f4af474328a1e14cc3367decc2ae6b4094b63f2c8364065f26d1c31a23f3458fd18fd94d67b5334bf3270e873085819966feb98c2febb0d1addc0a45a1373d0660ba416f9a42586141743a87a51c700dd3b7bafed7cc0e9d31da937860f9ed8646510f5163284e263f45358c8933c2df36064d8b606a23f118d6fde5d26967e803e31242612039b0f5103d2d5632c6cd42b32d68d36dcfe4fd413aa221ce18ea87259c97df2f38a975cf111c35844825a5b17515475ea26a51985ffdb68df0a6b01cb8eaabdd815e51ef9f8fabdb93023946f2d680543cb21be633c0dc50d0dc96d8fd1cb1f6667586fc823303b77d1b5bcefb8cff7bc28d2062ccb2d1ce97ad5529fc446820c7e402b7e69ef7d812dd86052648907984ab402434e12a332a84da967dcb61be5321d6b9d58d26c2dc42e5f8082965f96c170044fbe7f4a563ad795366aec50feacc5ca87a46530eb7d6afd4eec524e40c7839de29dfeae57c03abb2b380187b783bf9c3b498fb40dd22f626b07f7e33b807787b553be6626fdc8eaa98fa3eda5e0c7236c1c1e89c1400a6ec2"
// fetch("https://www.funimation.com/shows/vivy-fluorite-eyes-songs-", {
// 	"method": "GET",
//     "mode" : "cors",
//     credentials : "same-origin",
// 	"headers": {
//         // 'Content-Type': 'application/json',
//         "Access-Control-Allow-Origin" : "null",
// 		// 'client_id': CLIENT_ID,
        // 'code': authorisation_code,
        // 'code_verifier': code_verifier,
        // 'grant_type': 'authorization_code'
        //'Authorization': "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6ImFmYWZkZjNjYzZiZDUyZmZmY2YzMThjNGNlYTY2MzE0MmQyZTliM2E0NzMzNDJkZjg0YjRmNDU3NDZkY2IzNDdlOWU5OTMyMGQyYTk1ZWZlIn0.eyJhdWQiOiJmZGE5MTA3Y2E1YWE2NmE2MjdiZTUxMTZjOTc4YjZjNiIsImp0aSI6ImFmYWZkZjNjYzZiZDUyZmZmY2YzMThjNGNlYTY2MzE0MmQyZTliM2E0NzMzNDJkZjg0YjRmNDU3NDZkY2IzNDdlOWU5OTMyMGQyYTk1ZWZlIiwiaWF0IjoxNjE5NTUwMzI3LCJuYmYiOjE2MTk1NTAzMjcsImV4cCI6MTYyMjE0MjMyNywic3ViIjoiMTEwMDUwNzUiLCJzY29wZXMiOltdfQ.KWGujcWXU_pEEH4JOV0CcfKSFke8p0-wZhPlBSaQpaR9xYAzw_S4ayv2fAyLam5xHV8vQzDaPQgZN-RPgy2uZnGnBtLSdrnwkfzNd5PEIAj_2q-GqGI1-hLPHAv7lCgbhG2Itxwd_81CTN_-vpeR3IDULHkSK_qTljNS_iCRejwxOYIHHU_WACrG6ZQUz40UkEgb4wlTBFAFTQgXUSwlqhMEfC9df2leDVvq-S3neHRMSufzdXF38gblstJfmgivaquyMD9IRhDK1dlmxTl9OYT-97N5wN6e_icrzfFGDSf3E5aLUQQIlwrJQLmkdhqjNhB7S-UJ3Z3LlYpITkeg4Q"

// .then(response => 
//     response.json()
// )
// .then(data =>{
//  console.log(data);

// })
// fetch("https://jikan1.p.rapidapi.com/top/anime/1/upcoming", {
// 	"method": "GET",
// 	"headers": {
// 		"x-rapidapi-key": "aff643c273msh3d6967dd0beb0dfp12ee72jsn8d22081193e0",
// 		"x-rapidapi-host": "jikan1.p.rapidapi.com"
// 	}
// })
// .then(response => response.json())
// .then(data => {
//     console.log(data)
// })
// .catch(err => {
    
// 	console.error(err);
// });
fetch("https://igor-zachetly-ping-uin.p.rapidapi.com/pinguin.php?address=https://www.funimation.com/shows/vivy-fluorite-eyes-songssss-", {
	"method": "GET",
	"headers": {
		"x-rapidapi-key": "aff643c273msh3d6967dd0beb0dfp12ee72jsn8d22081193e0",
		"x-rapidapi-host": "igor-zachetly-ping-uin.p.rapidapi.com"
	}
})
.then(response => {
	console.log(response);
})
.catch(err => {
	console.error(err);
});
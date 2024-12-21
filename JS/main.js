let API_KEY = `1907dd7e22213c1275b820c5455946aa`;
let data = [];
async function Get_API(type, time) {
  let response = await fetch(
    `https://api.themoviedb.org/3/trending/${type}/${time}?api_key=${API_KEY}`
  );
  data = await response.json();

  Print();
 
}
Get_API("all", "day");
 function Signin(){
  location.href = "Signin.html";
 }
function Print() {
  let row = document.querySelector("#row");
  let Final_data = "";
  for (let i = 0; i < data.results.length; i++) {
    let el = data.results[i];
    let date = "";

    if (el.release_date || el.first_air_date)
      date = ` ${(el.release_date || el.first_air_date).split("-")[0]}`;
    Final_data += `
         
            <div class="col-xl-4  col-lg-3 col-md-2 col-sm-1 card" onclick="GOTO('${el.id}', '${el.media_type}' )">
           
            ${
              el.poster_path
                ? ` <img src="https://image.tmdb.org/t/p/w500${el.poster_path}" alt="" height="300" />`
                : `<img
                  src="https://media.themoviedb.org/t/p/w235_and_h235_face${el.profile_path}"
                  alt=""
                  height="50"
                />`
            }
             
                 <h2> ${el.original_title || el.original_name}</h2>
                  <h2 style="color:#e4d804; ;">${date}</h2>    
            
            </div>
         
    `;
  }
  
  row.innerHTML = Final_data;
  
}



function GOTO(id, mt) {
  localStorage.setItem("result", JSON.stringify({ id: id, media_type: mt }));
  location.href = "profile_media.html";
}

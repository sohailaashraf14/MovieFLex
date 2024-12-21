let API_KEY = `1907dd7e22213c1275b820c5455946aa`;
let data;
async function Get_API() {
  let { id, media_type } = JSON.parse(localStorage.getItem("result"));
  let response = await fetch(
    `https://api.themoviedb.org/3/${media_type}/${id}?api_key=${API_KEY}`
  );
  data = await response.json();
  console.log(data);

  Display();
}
Get_API();

function Display() {
  let genres = [];
  for (let i = 0; i < data.genres.length; i++) {
    genres.push(data.genres[i].name);
  }
  let row = document.querySelector("#row");
  row.innerHTML = `
   <div class=" overlayer"
          style="
            background-image: url(https://media.themoviedb.org/t/p/w1920_and_h800_multi_faces${
              data.backdrop_path
            });
          "
        ></div>
        <div class=" container row">
          <div class=  "w-30">
            <img
              src="https://image.tmdb.org/t/p/w500${data.poster_path}"
              alt=""
            />
          
          </div>
          <div class="w-70">
            <h2>${data.original_title || data.original_name} 
                </h2>
                
                <h2>
                (${
    data.release_date
      ? `${data.release_date[0]}${data.release_date[1]}${data.release_date[2]}${data.release_date[3]}`
      : `${data.first_air_date[0]}${data.first_air_date[1]}${data.first_air_date[2]}${data.first_air_date[3]}`
  })
                </h2>
             
            <p>${genres.join(" , ")}</p>
            </br>
            <h3_r> ${Number.parseInt(data.vote_average * 10)}%</h3_r>
          
            <h3>Overview</h3>
            
            <p_d>${data.overview}</p_d>
            </br>
              <button><i class="fa-solid fa-play"></i> watch now</button>
          </div>
        </div>
    </div>
  `;
}

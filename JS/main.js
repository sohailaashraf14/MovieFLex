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

/* ===================== NAV SEARCH DROPDOWN ===================== */
let searchTimer = null;

function initNavSearch() {
  const input = document.getElementById("navSearchInput");
  const dropdown = document.getElementById("navSearchDropdown");
  if (!input || !dropdown) return;

  input.addEventListener("input", () => {
    const query = input.value.trim();
    clearTimeout(searchTimer);

    if (!query) {
      dropdown.classList.remove("open");
      dropdown.innerHTML = "";
      return;
    }

    // debounce so we're not firing a request on every keystroke
    searchTimer = setTimeout(() => runSearch(query, dropdown), 300);
  });

  document.addEventListener("click", (e) => {
    if (!e.target.closest(".nav-search")) {
      dropdown.classList.remove("open");
    }
  });
}

async function runSearch(query, dropdown) {
  dropdown.innerHTML = `<div class="search-hint">Searching...</div>`;
  dropdown.classList.add("open");

  try {
    const res = await fetch(
      `https://api.themoviedb.org/3/search/multi?api_key=${API_KEY}&query=${encodeURIComponent(query)}`
    );
    const json = await res.json();
    const results = (json.results || [])
      .filter((r) => r.media_type === "movie" || r.media_type === "tv")
      .slice(0, 8);

    if (results.length === 0) {
      dropdown.innerHTML = `<div class="search-empty">No results for "${query}"</div>`;
      return;
    }

    dropdown.innerHTML = results
      .map((r) => {
        const title = r.title || r.name || "Untitled";
        const date = (r.release_date || r.first_air_date || "").split("-")[0];
        const poster = r.poster_path
          ? `https://image.tmdb.org/t/p/w92${r.poster_path}`
          : "";
        return `
          <div class="search-result" onclick="GOTO('${r.id}','${r.media_type}')">
            ${poster ? `<img src="${poster}" alt="" />` : `<div style="width:40px;height:56px;background:#333;border-radius:4px;"></div>`}
            <div class="meta">
              <h5>${title}</h5>
              <span>${date || r.media_type}</span>
            </div>
          </div>
        `;
      })
      .join("");
  } catch (err) {
    dropdown.innerHTML = `<div class="search-empty">Search failed, try again</div>`;
  }
}

// script is loaded at the end of <body>, so the DOM is already parsed
// by the time this runs — call directly instead of waiting on an event
// that already fired before this script executed.
initNavSearch();

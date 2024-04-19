let BASE_URL = "http://localhost:3000/lb"

  fetch(BASE_URL)
  .then(statusCheck)
  .then(resp => resp.json())//or resp.text()
  .then(updateResults)
  .catch(handleError);


    async function statusCheck(res){
        if(!res.ok){
            throw new Error(await res.text());
        }
        return res;
    }

    function handleError(error){
        console.error(error);
    }

    function updateResults(data){
        data.forEach((item) => {
            console.log(data);
            let table = document.getElementById("scoretable");
            let tableRow = document.createElement("tr");
            let cell1 = document.createElement("td");
            let cell2 = document.createElement("td");
        
            let name = document.createTextNode(item.Name);
            let score = document.createTextNode(item.Score);
        
            console.log(name);
            console.log(score);

            cell1.appendChild(name);
            cell2.appendChild(score);
            tableRow.appendChild(cell1);
            tableRow.appendChild(cell2);
            table.appendChild(tableRow);
        });
    }
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
        console.log(data)
        let i = 1
        data.forEach(item => {
        let table = document.getElementById("scoretable");
        let row = document.createElement("tr");
        let cell1 = document.createElement("td");
        let cell2 = document.createElement("td");
        let cell3 = document.createElement("td");

        let place = document.createTextNode(i)
        let name = document.createTextNode(item.Name);
        let score = document.createTextNode(item.Score);

        cell1.appendChild(place);
        cell2.appendChild(name);
        cell3.appendChild(score);

        row.appendChild(cell1);
        row.appendChild(cell2);
        row.appendChild(cell3);

        table.appendChild(row)

        i++;
        });
        



    }
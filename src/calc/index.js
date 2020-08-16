import React, {useState} from "react"

const Calc = () => {

    const[dataWystawienia, setDataWystawienia] = useState("");
    const[dataPierwszejRealizacji, setDataPierwszejRealizacji] = useState("");


    const dateFrom = document.querySelector(".date_from");
    const dateTo = document.querySelector(".date_to");
    const dayAmountBtn = document.querySelector(".day_amount_btn");
    const howManyDaysSpan =document.querySelector(".how_many_days")
    const addInfo = document.querySelector(".add_info");
    const yearRealization = document.querySelector(".for_year");
    const choiceYes = document.querySelector(".yes");
    const choiceNo = document.querySelector(".no");
    const moreInfo = document.querySelector(".more_info");
    const inputs = document.querySelectorAll(".more_info input");
    const lastDiv = document.querySelector(".result");
    const resultBtn = document.querySelector(".result-btn")
    const result = document.querySelector(".result span");
    const tooltips = document.querySelectorAll(".tooltip");
    const resultDiv = document.querySelector(".result");
    const denyDiv = document.querySelector(".deny-div");
    const allInputs = document.querySelectorAll("input");
    console.log(choiceYes);
    console.log(choiceNo);
    
    const dayAmountBTN = () => { 

            const date1 = new Date(dateFrom.value);
            const date2 = new Date(dateTo.value);
            const miliSec = 1000 * 60 * 60 * 24;
            const dayAmount = (date2.getTime() - date1.getTime())/miliSec;
            const btn = document.querySelector("button");
            //getTime podaje wartosc w milisek /trezba roznice podzielic przez ilosc milisekund(stala)//
            if(dayAmount) {
                howManyDaysSpan.innerText = `${dayAmount} dni`
            } else {
                howManyDaysSpan.innerText= "0 dni";
            }
            if( dayAmount <= 30 && dayAmount >= 0) {
                addInfo.classList.remove("unvisible");
                addInfo.classList.add("visible");
                yearRealization.classList.remove("visible");
                yearRealization.classList.add("unvisible");
            } else if ( dayAmount > 30) {
                addInfo.classList.toggle("visible");
                addInfo.classList.add("unvisible");
                yearRealization.classList.remove("unvisible");
                yearRealization.classList.add("visible");
            } else {
                alert("Coś poszło nie tak! Sprawdź poprawność wprowadzonych dat!");
            }    
                choiceYes.addEventListener("change", function(){
                    
                    if (this.checked) {
                        moreInfo.classList.remove("unvisible");
                        moreInfo.classList.add("visible");
                        lastDiv.classList.remove("unvisible");
                        lastDiv.classList.add("visible");
                        denyDiv.classList.remove("visible");
                        denyDiv.classList.add("unvisible");
                        inputs.forEach(function(input) {
                            input.value = "";
                        });
                        result.innerText="0";
                        choiceNo.disabled = true;
                    } else {
                        moreInfo.classList.remove("visible");
                        moreInfo.classList.add("unvisible");
                        lastDiv.classList.remove("visible");
                        lastDiv.classList.add("unvisible");
                        // denyDiv.classList.remove("unvisible");
                        // denyDiv.classList.add("visible");
                        choiceNo.disabled = false;
                    }
                });
                choiceNo.addEventListener("change", function(){
                  if(this.checked) {
                        moreInfo.classList.remove("visible");
                        moreInfo.classList.add("unvisible");
                        lastDiv.classList.remove("visible");
                        lastDiv.classList.add("unvisible");
                        denyDiv.classList.remove("unvisible");
                        denyDiv.classList.add("visible");
                        choiceYes.disabled= true;
                  } else {
                        // moreInfo.classList.remove("unvisible");
                        // moreInfo.classList.add("visible");
                        // lastDiv.classList.remove("unvisible");
                        // lastDiv.classList.add("visible");
                        denyDiv.classList.remove("visible");
                        denyDiv.classList.add("unvisible");
                        choiceYes.disabled = false;
    
                  }
                })
            resultBtn.addEventListener("click", function(event) {
                let firstResult = (inputs[0].value * inputs[1].value)/inputs[2].value - dayAmount;//liczy na ile dni pozostalo dawek
                let lastResult = firstResult*inputs[2].value;// + parseInt(inputs[3].value);// liczy ile dawek ma dostac pacjent w pozostalych u dniach
                if(lastResult >= 0 && lastResult%inputs[1].value === 0) {
                    result.innerText = Math.floor(lastResult);
                } else if (lastResult >= 0 && lastResult%inputs[1].value !== 0) {
                    const maxDosesAmount = Math.floor(((Math.floor(lastResult) + parseInt(inputs[3].value))/parseInt(inputs[3].value))) * parseInt(inputs[3].value);//liczy maksymalna ilosc dawek po dodaniu najmniejszego zarejestrowanego opakowania.    
                    result.innerText = maxDosesAmount; //cos nie tak
                } else {
                    result.innerText = "0";
                }//działa!!:)
            })
            tooltips.forEach(function(tooltip) {
                tooltip.addEventListener("mouseover", function(event) {
                  const tip = document.createElement("span");
                  tip.innerText = `${this.dataset.text}`;
                  this.appendChild(tip);
                  tip.classList.add("tooltipText");
              })
              tooltip.addEventListener("mouseout", function(event) {
                  const tip = document.querySelector(".tooltipText");
                  if(tip) {
                      tip.parentElement.removeChild(tip);//spr czy istnieje, jesli istnieje to usuwa
                  }
              })
            })
          
    
    window.onload = function() {
        allInputs.forEach(function(input) {
            input.value = "";
        });
        console.log("test ladowania")
    }//sprawdzic czy dziala
}




    return (<>
    

    <header>
            <nav>
                <div className = "logo">
                    <p>Kalkulator e-recepty</p>
                    <div className = "nav-icon">
                        <i className="fas fa-file-prescription"></i>
                    </div>
            </div>
            </nav>
            <div className = "heading" >
                <h1>
                    Pomożemy Ci szybko sprawdzić ile leku pozostało do wydania.
                </h1>
            </div>
        </header>
        <main className = "container">
            <div className="calendar">
                <label>Data wystawienia recepty</label>
               
               
                <input className="date_from"
                
                type = "date"
                value = {dataWystawienia}
                onChange =  {(e) =>setDataWystawienia(e.target.value)}
                
                />
                <label>Data pierwszej realizacji recepty</label>
                
                <input className = "date_to"
                 type = "date"
                 value=  {dataPierwszejRealizacji}
                 onChange=  {(e) => setDataPierwszejRealizacji(e.target.value)}
                 
                 />
                <button 
                className = "day_amount_btn"
                onClick = {dayAmountBTN}
                >Oblicz ile dni upłynęło</button>
            </div>
            <div className = "day-amount">Od wystawienia e-recepty upłynęło: 
            <span 
            className="how_many_days"
            
            ></span></div>
            <div className = "add_info unvisible">
                <p>Możesz całkowicie zrealizować receptę!</p>
                <ul><p>Należy jedynie sprawdzić:</p>
                    <li>poprawność dawkowania,</li>
                    <li>poprawnosć danych pacjenta, osoby wystawiającej receptę oraz świadczeniodawcy,</li>
                    <li>jeśli przepisany jest antybiotyk: czy nie upłynęło 7 dni od daty wystawienia recepty.</li>
                </ul>
            </div>
            <div className ="for_year  unvisible">
                <label>Czy recepta ma zaznaczoną roczną realizację?</label>
                <span className="tooltip" data-text="Pamiętaj! Recepta na narkotyki i psychotropy jest ważna : 30 dni, na preparaty immunologiczne - 120dni, a na antybiotyki - 7dni!"/>
                <input type="checkbox" className="yes"/>
                <label>Tak</label>
                <input type="checkbox" className="no"/>
                <label >Nie</label>
                
            </div>
            <div className = "deny-div unvisible">Tej recepty nie możesz już zrealizować.</div>
            <div className = "more_info unvisible">
                <label>Ilość opakowań na recepcie :</label>
                <input type="number"/>
                <label>Wielkość opakowania :</label>
                <span className = "tooltip" data-text="Jeśli na recepcie przypisano insulinę, należy podać całkowitą ilość jednostek w opakowania np. 1500."><input type="number"/></span>
                <label>Ilość tabletek/dawek/ml leku, którą ma przyjmować pacjent na dobę :</label>
                <input type="number"/>
                <label>Wielkość najmnniejszego zarejestrowanego opakowania :</label>
                <span className= "tooltip" data-text="W przypadku insulin jest to ilość jednostek w pojedyńczej ampułce/penie!">
                    <input type="number"/></span>
                <button className = "result-btn">Oblicz</button>
            </div>
            <div className="result unvisible">
                <p>Do wydania pozostało maksymalnie : <span></span> tabletki/-ek/dawki/-ek/ml leku</p>
                <p>Teraz sprawdź ile dostępnych opakowań leku/ampułek inusliny mieści się w tym zakresie.</p>
            </div>
        </main>
        <footer>
            Kalkulator e-recepty jest jedynie narzędziem pomocniczym. 
            Autor strony nie ponosi odpowiedzialności za realizację e-recepty 
            niezgodnie z aktualnie obowiązującymi przepisami prawa farmaceutycznego. Odpowiedzialność ta
             spoczywa na personelu apteki, który realizuje receptę.
             <span>&copyrx-kalkulator || info@rx-kalkulator.pl</span>
        </footer>





    </>);
}

export default Calc
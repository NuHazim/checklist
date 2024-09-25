const groupbox=document.getElementById("groupbox");
document.getElementById("form").addEventListener("submit",function(event){
    event.preventDefault();

    let details=document.createElement("details");
    let summary=document.createElement("summary");
    summary.textContent=document.getElementById("text").value;
    let x=document.createElement("button");
    x.textContent="X";
    x.classList.add("x");

    let form=document.createElement("form");
    let label=document.createElement("label");
    label.textContent="List: ";
    let input=document.createElement("input");
    input.type="text";
    input.required=true;
    let button=document.createElement("button");
    button.type="submit";
    button.textContent="Submit";

    form.appendChild(label);
    form.appendChild(input);
    form.appendChild(button);
    summary.appendChild(x);
    details.appendChild(summary);
    details.appendChild(form);
    groupbox.appendChild(details);

    x.addEventListener("click",function(){
        details.remove();
    })

    form.addEventListener("submit",function(event){
        event.preventDefault();
        let div=document.createElement("div");
        let h2=document.createElement("h2");
        h2.textContent=input.value;
        h2.classList.add("list");
        h2.style.display="inline";
        h2.style.cursor="pointer";
        let x2=document.createElement("button");
        x2.textContent="X";
        x2.classList.add("x");
        div.appendChild(h2);
        div.appendChild(x2);
        details.appendChild(div);

        x2.addEventListener("click",function(){
            div.remove();
        })

        h2.addEventListener("click",function(){
            h2.classList.toggle("checked");
        })

        input.value="";

    })

    document.getElementById("text").value="";
})
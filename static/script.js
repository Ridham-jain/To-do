const modal = document.querySelector(".addtask")
const opnbttn = document.getElementById("add")
const closebttn = document.querySelector(".close")
const addbttn = document.getElementById("addtask")
const dropdown = document.querySelector(".dropdown")
const expand = document.querySelector(".expand")

opnbttn.onclick = () => {
    modal.style.display = "flex";
};

closebttn.onclick = () => {
    modal.style.display = "none";
};

addbttn.addEventListener("click", () => {
    let task = document.getElementById("taskname");
    let cont = document.querySelector(".list2");

    if (task.value.trim() === "") {
        alert("Enter the Task Name");
    } else {

        let pack = document.createElement("div");
        pack.className = "pack2";

        pack.innerHTML = `
            <div class="item2">
                <span>${task.value}</span>
                <div class="task-buttons">
                    <button class="expand">&#9660;</button>
                    <button class="complete">✓</button>
                    <button class="delete">✕</button>
                    <button class="star">★</button>
                </div>
            </div>
            <div class="dropdown"><br>Task details here</div>
        `;

        cont.appendChild(pack);

        task.value = "";
        modal.style.display = "none";
    }
});


window.onclick = (e) => {
    if (e.target === modal) {
        modal.style.display = "none"
    }
};

document.addEventListener("click", function (e) {
    if (e.target.classList.contains("expand")) {
        e.target.classList.toggle("rotate");
    }
});
document.addEventListener("click", function (e) {
    if (e.target.classList.contains("expand")) {
        e.target.classList.toggle("clicked");
    }
});

document.addEventListener("click", function (e) {
    if (e.target.classList.contains("expand")) {

        e.target.classList.toggle("rotate");
        e.target.classList.toggle("clicked");

        const pack = e.target.closest(".pack1, .pack2, .pack3");
        const dropdown = pack.querySelector(".dropdown");

        if (dropdown) {
            dropdown.classList.toggle("open");
        }
    }

    if (e.target.classList.contains("star") && !e.target.disabled) {
        e.target.classList.toggle("active");

        const pack = e.target.closest(".pack1,.pack2,.pack3")
        reorderstarred(pack)
    }
    if(e.target.classList.contains("complete")){
        const pack=e.target.closest(".pack1,.pack2,.pack3");
        if(!pack) return;

        const completedList=document.querySelector(".list3");
        if(!completedList) return;

        pack.classList.remove("pack1","pack2");
        pack.classList.add("pack3");

        const item=pack.querySelector(".item1, .item2, .item3");
        if(item){
            item.classList.remove("item1","item2");
            item.classList.add("item3");
        }

        const completeButton=pack.querySelector(".complete");
        if(completeButton) completeButton.remove();

        const star=pack.querySelector(".star");
        if(star){
            star.disabled=true;
            star.classList.remove("active");
        }

        completedList.appendChild(pack);
    }
});

function reorderstarred(pack) {
    if (!pack) return;

    const list = pack.closest(".list1,.list2,.list3")
    if (!list) return;

    const packs = Array.from(list.children)

    packs.sort((a, b) => {
        const aActive = a.querySelector(".star.active") ? 1 : 0;
        const bActive = b.querySelector(".star.active") ? 1 : 0;

        return bActive - aActive;
    });

    packs.forEach((item) => list.appendChild(item));
}
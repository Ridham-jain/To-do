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
    let dued = document.getElementById("due");
    let duet = document.getElementById("time");

    if (task.value.trim() === "") {
        alert("Enter the Task Name");
    }
    else if (dued.value.trim() === "" && duet.value.trim() !== "") {
        alert("Enter a due date");
    }
    else {

        let pack = document.createElement("div");
        pack.className = "pack2";

        pack.setAttribute("data-date", dued.value);

        let timed = "No Due Date"

        if (dued.value.trim() === "" && duet.value.trim() === "") {
            timed = "No Due Date";
        }
        else if (dued.value.trim() !== "" && duet.value.trim() === "") {
            timed = dued.value + "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + "23:59";
        }
        else {
            timed = dued.value + "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + duet.value;
        }

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
            <div class="dropdown"><br><div class="drophead"><div class="desc">Description</div><div class="due">Due Date : ${timed}</div></div><br>Task details here</div>
        `;

        pack.setAttribute("data-date", dued.value);
        pack.setAttribute("data-time", duet.value || "23:59");

        cont.appendChild(pack);

        moveTasks();

        sorttasks(".list2");
        sorttasks(".list1");

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

        const pack = e.target.closest(".pack1, .pack2, .pack3,.pack4");
        const dropdown = pack.querySelector(".dropdown");

        if (dropdown) {
            dropdown.classList.toggle("open");
        }
    }

    if (e.target.classList.contains("star") && !e.target.disabled) {
        e.target.classList.toggle("active");

        const pack = e.target.closest(".pack1,.pack2,.pack3,.pack4")
        reorderstarred(pack)
    }
    if (e.target.classList.contains("complete")) {
        const pack = e.target.closest(".pack1,.pack2,.pack3,.pack4");
        if (!pack) return;

        const completedList = document.querySelector(".list3");
        if (!completedList) return;

        pack.classList.remove("pack1", "pack2", "pack4");
        pack.classList.add("pack3");

        const item = pack.querySelector(".item1, .item2, .item3, .item4");
        if (item) {
            item.classList.remove("item1", "item2", "item4");
            item.classList.add("item3");
        }

        const completeButton = pack.querySelector(".complete");
        if (completeButton) completeButton.remove();

        const star = pack.querySelector(".star");
        if (star) {
            star.disabled = true;
            star.classList.remove("active");
        }

        completedList.appendChild(pack);
    }
    if (e.target.classList.contains("delete")) {
        const pack = e.target.closest(".pack1,.pack2,.pack3,.pack4")
        if (pack) {
            pack.remove();
        }
    }
});

function reorderstarred(pack) {
    if (!pack) return;

    const list = pack.closest(".list1,.list2,.list3,.list4")
    if (!list) return;

    const packs = Array.from(list.children)

    packs.sort((a, b) => {
        const aActive = a.querySelector(".star.active") ? 1 : 0;
        const bActive = b.querySelector(".star.active") ? 1 : 0;

        return bActive - aActive;
    });

    packs.forEach((item) => list.appendChild(item));
}

function moveTasks() {
    const todayTasks = document.querySelector(".list1");
    const allTasks = document.querySelectorAll(".pack2");

    const today = new Date().toISOString().split("T")[0];

    allTasks.forEach(pack => {
        const duedate = pack.getAttribute("data-date");
        const duetime = pack.getAttribute("data-time");

        if (!duedate) return;

        if (duedate === today) {
            pack.classList.remove("pack2");
            pack.classList.add("pack1");

            const item = pack.querySelector(".item2");
            if (item) {
                item.classList.remove("item2");
                item.classList.add("item1");
            }
            todayTasks.appendChild(pack);
        }
    });
}

function sorttasks(listSelector) {
    const list = document.querySelector(listSelector);

    if (!list) return;

    const tasks = Array.from(list.children);

    tasks.sort((a, b) => {
        const dateA = a.getAttribute("data-date");
        const dateB = b.getAttribute("data-date");

        const timeA = a.getAttribute("data-time") || "23:59";
        const timeB = b.getAttribute("data-time") || "23:59";

        const fullA = dateA ? new Date(`${dateA}T${timeA}`) : new Date(8640000000000000);
        const fullB = dateB ? new Date(`${dateB}T${timeB}`) : new Date(8640000000000000);

        return fullA - fullB;
    });

    tasks.forEach(task => list.appendChild(task));
}

window.onload = () => {
    moveTasks();
    sorttasks(".list1");
    sorttasks(".list2");
    sorttasks(".list3");
}
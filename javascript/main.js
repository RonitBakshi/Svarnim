document.querySelectorAll(".container").forEach(
    (container) => {
        const scroll = container.querySelector(".scroll");
        
        if(scroll != null)
        {
            scrolladd(scroll);
        }

        if(container.querySelector(".tab__container") != null)
        {
            tabadd(container);
        }
    }
)

function scrolladd(scroll) {
    const scroll_container = scroll.querySelector(".scroll__container");
    const prev_btn = scroll.querySelector("#scroll-btn-prev");
    const next_btn = scroll.querySelector("#scroll-btn-next");
    let active_indicator = scroll.querySelector(".scroll__li");

    prev_btn.addEventListener("click",
        function () {
            scroll_container.scrollLeft -= 350*3;
            active_indicator = scroll.querySelector(".scroll__li--active");
            active_indicator.classList.remove("scroll__li--active");
            active_indicator = active_indicator.previousElementSibling;
            active_indicator.classList.add("scroll__li--active");

            if(active_indicator.previousElementSibling == null) {
                prev_btn.disabled = true;
                prev_btn.classList.add("btn_primary--inactive");
            }
            next_btn.disabled = false;
            next_btn.classList.remove("btn_primary--inactive");
        }
    )

    next_btn.addEventListener("click",
        function () {
            scroll_container.scrollLeft += 350*3;
            active_indicator = scroll.querySelector(".scroll__li--active");
            active_indicator.classList.remove("scroll__li--active");
            active_indicator = active_indicator.nextElementSibling;
            active_indicator.classList.add("scroll__li--active");

            if(active_indicator.nextElementSibling == null) {
                next_btn.disabled = true;
                next_btn.classList.add("btn_primary--inactive");
            }
            prev_btn.disabled = false;
            prev_btn.classList.remove("btn_primary--inactive");
        }
    )
}

function scroll_reset(scroll,tab_count) {
    let indicator_list = scroll.querySelector(".scroll__indicator");
    const html = `<li class="scroll__li"></li>`
    indicator_list.innerHTML = html.repeat(tab_count);
    const active_indicator = scroll.querySelector(".scroll__li");
    active_indicator.classList.add("scroll__li--active"); 
    const scroll_container = scroll.querySelector(".scroll__container");
    const prev_btn = scroll.querySelector("#scroll-btn-prev");
    const next_btn = scroll.querySelector("#scroll-btn-next");

    scroll_container.scrollLeft = 0;
    prev_btn.disabled = true;
    prev_btn.classList.add("btn_primary--inactive");
    
    if(tab_count == 1){
        next_btn.disabled = true;
        next_btn.classList.add("btn_primary--inactive");
    }
    else {
        next_btn.classList.remove("btn_primary--inactive");
        next_btn.disabled = false;
    }
}

function tabadd (container) {
    const tab_container = container.querySelector(".tab__container");
    const card_container = container.querySelector(".tab__elements");
    const tabs = tab_container.querySelectorAll(".tab");

    tabs.forEach(
        (tab) => {
            tab.addEventListener("click", 
                function () {
                    let tab_count = 0;
                    tabs.forEach((tab)=> tab.classList.remove("tab--active"));
                    this.classList.add("tab--active");

                    card_container.querySelectorAll(":scope > div").forEach(
                        (tabcard) => {

                            if(this.id == "All") 
                            {
                                tabcard.classList.remove("none");
                                tab_count += 1;
                            }
                            else if(tabcard.id == this.id) {
                                tabcard.classList.remove("none");
                                tab_count += 1;
                            }
                            else {
                                tabcard.classList.add("none");
                            }
                        }
                    )
                    
                    if(container.querySelector(".scroll") != null) {
                        scroll_reset(container.querySelector(".scroll"),Math.ceil(tab_count/3));
                    }
                }
            )
        }
    )
}

function facts () {
    const fact_container = document.querySelector(".facts");
    const fact_array = [
        "Try to enjoy doing everything you do. When you are interested in what you do, you enjoy doing it. To be interested in what you do, you must try to do it better and better.  In progress lies try joy.",
        "Even if evil makes you lose your way, you stay your ground and keep searching for the path of good. Is that search now what justice is? It is for that reason that gods gave mortals knowledge.",
        "When colors mix they become muddy and messy. But when they all blend together, the final result is the color that wins against all others… Black!"
    ]
    const length = fact_array.length;
    let fact_no = 0;
    let fact = fact_container.querySelector("p");

    setInterval( function () {
        fact.classList.add("facts__fadein");
        setTimeout(function () {
            fact.innerText = fact_array[fact_no];
            fact.classList.add("facts__fadeout");
        },4000);

        fact.classList.remove("facts__fadein");
        fact.classList.remove("facts__fadeout");
        fact_no += 1;
        if( fact_no == length) {
            fact_no = 0
        }
    } , 6000);
}

facts();
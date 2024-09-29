var sidebar=document.querySelector(".side-bar")
function showSidebar()
{
    sidebar.style.left="0"
}
function hideSidebar()
{
    sidebar.style.left="-50%"
}
var prductcontainer=document.getElementById("products")
var search=document.getElementById("search")
var productlist= prductcontainer.querySelectorAll("div")


search.addEventListener("keyup",function(){
    var enterkey=event.target.value.toUpperCase()
    for(i=0;i<productlist.length;i=i+1)
    {
        var productname=productlist[i].querySelector("p").textContent
        if(productname.toUpperCase().indexOf(enterkey)<0)
        {
            productlist[i].style.display="none"
        }
        else
        {
            productlist[i].style.display="block"

        }


    }
})



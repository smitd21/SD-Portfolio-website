



// Preloader to stop after one relaoding
window.addEventListener("load",function(){
	document.querySelector(".preloader").classList.add("opacity-0");

	setTimeout(function(){
		document.querySelector(".preloader").style.display="none";   //DOM
	},1000)
})




// Portfolio Item Filter


const filterContainer = document.querySelector(".portfolio-filter"),
      filterBtns = filterContainer.children,        //List buttons
      totalFilterBtn= filterBtns.length,      portfolioItems = document.querySelectorAll(".portfolio-item");      //List Portfolio Items 
      totalPortfolioItem = portfolioItems.length;


      for(let i=0; i<totalFilterBtn; i++){
      	filterBtns[i].addEventListener("click",function(){
      		filterContainer.querySelector(".active").classList.remove("active");  //To Remove Pink
      		//console.log(this.innerHTML);
      		this.classList.add("active");               //When clicked turn pink



      		const filterValue = this.getAttribute("data-filter");      //From the data-filter it picks       filterValue = Value of Data i.e  WebDesign or Projects or Internship
      		//console.log("filterValue");                                //Count on the number of potfolio images


      		for(let k=0; k<totalPortfolioItem;k++){                     
      			if(filterValue ===  portfolioItems[k].getAttribute("data-category")){             //filterValue = Value of Data i.e  WebDesign or Projects or Internship then add Show class and remove Hide class
      				portfolioItems[k].classList.remove("hide");
      				portfolioItems[k].classList.add("show");
      			} 
      			else {                                                                            
      				portfolioItems[k].classList.remove("show");                                      //filterValue not equals Value of Data i.e  WebDesign or Projects or Internship then add Hide Class and remove Show Class
      				portfolioItems[k].classList.add("hide");
      			}
      			 if(filterValue === "all"){                                                       //For all you've to add show class everywhere
      			 	portfolioItems[k].classList.remove("hide")
      				portfolioItems[k].classList.add("show");
      			}
      		}   
      	



      	})
      }  



// Portfolio Lightbox

const lightbox = document.querySelector(".lightbox"),
      lightboxImg = lightbox.querySelector(".lightbox-img"),
      lightboxClose = lightbox.querySelector(".lightbox-close"),
      lightboxText = lightbox.querySelector(".caption-text"),
      lightboxCounter = lightbox.querySelector(".caption-counter");

let itemIndex= 0;

for(let i = 0; i<totalPortfolioItem; i++){
	portfolioItems[i].addEventListener("click",function(){
		itemIndex=i;
		changeItem();
		toggleLightbox();
	})
}


function nextItem(){
	if(itemIndex === totalPortfolioItem-1){
		itemIndex=0;
	}
	else{
		itemIndex++;
	}
	//console.log(itemIndex);
	changeItem();
}
function prevItem(){
	if(itemIndex === 0){
		itemIndex = totalPortfolioItem-1;
	}
	else{
		itemIndex--;
	}
	//console.log(itemIndex);
	changeItem();
}


function toggleLightbox(){
	lightbox.classList.toggle("open");
}


function changeItem(){
	imgSrc = portfolioItems[itemIndex].querySelector(".portfolio-img img").getAttribute("src");
	lightboxImg.src = imgSrc;
	lightboxText.innerHTML = portfolioItems[itemIndex].querySelector("h4").innerHTML;  // Niche Ka caption Web Design or Projects or Internships
	lightboxCounter.innerHTML = (itemIndex+1) + "of" + totalPortfolioItem;     //1 of 6   itemIndex+1 bcoz it will start from 0 and we want to start from 1
}

// Close Lightbox

lightbox.addEventListener("click",function(){
	if(event.target === lightboxClose || lightboxClose === event.target){      //Open hogaa toh toggle se it'll close
		toggleLightbox();
	}
})


//Aside Navbar
  
  const nav =document.querySelector(".nav"),
        navList = nav.querySelectorAll("li"),
        totalNavList = navList.length,
        allSection = document.querySelectorAll(".section"),
        totalSection = allSection.length;

  for(let i=0; i<totalNavList; i++){
  	 const a= navList[i].querySelector("a");
  	 a.addEventListener("click",function(){

  	 	// remove back-section class
        removeBackSectionClass();       //See below for this function
 

  	 	for(let j=0; j<totalNavList; j++){
  	 		if (navList[j].querySelector("a").classList.contains("active")){

  	 			//add back-section class
  	 			addBackSectionClass(j);       //See below for this function
  	 			
  	 		}
  	 		navList[j].querySelector("a").classList.remove("active");
  	 	}
  	 	
  	 	

  	 	this.classList.add("active");
  	 	showSection(this);


        if(window.innerWidth < 1200){
        	asideSectionTogglerBtn();      //See below for this function
        }











  	 })
  }



   function showSection(element){
   	    for(let i=0; i<totalSection;i++){
   	    	allSection[i].classList.remove("active");
   	    }
   	    //console.log(getAttribute("href").split("#"));      //Gives Output => (2)["","about"]
   	    const target = element.getAttribute("href").split("#")[1];   //We want the 1th element from array
   	          //console.log(target)     //Output => about (or any nav element clicked)

   	   document.querySelector("#"+target).classList.add("active");    
   }

// REMOVE back-section Class from sections
   function removeBackSectionClass(){
   	    for(let i=0;i<totalSection;i++){
   	    	allSection[i].classList.remove("back-section")
   	    }

   }

// ADD back-section Class from sections
   function addBackSectionClass(num){
   	    allSection[num].classList.add("back-section");
   }




//This is for WHHEN WE CLICK HIRE ME BUTTON IT SHOULD GO TO CONATACTS PAGE AFTER THAT ON ASIDENAV IT SHOULD SHOW CONTACT IN ACTIVE PINK  
//THIS CAN ALSO BE USED ANYWHERE TO NAVIGATE SO WE MADE IT updateNav FUNCTION
    function updateNav(element){
    	for(let i=0; i<totalNavList;i++){
    		navList[i].querySelector("a").classList.remove("active");
    		//console.log(element.getAttribute("href").split("#")[1]);
    		const target = element.getAttribute("href").split("#")[1];
    		if(target === navList[i].querySelector("a").getAttribute("href").split("#")[1]){
    			navList[i].querySelector("a").classList.add("active");
    		}
    	}
    	
    }
    //By clicking Hireme button go to CONTACT PAGE 
    document.querySelector(".hire-me").addEventListener("click",function(){
    	const sectionIndex = this.getAttribute("data-section-index")     //Assigned to HIRE ME button
        //console.log(sectionIndex);      //1   //data-section-index="1"
    	showSection(this);
    	updateNav(this);
    	removeBackSectionClass();
    	addBackSectionClass(sectionIndex);
    })

				//By clicking My projects button go to PORTFOLIO PAGE 
				document.querySelector(".go-to-projects").addEventListener("click",function(){
    	const sectionIndex = this.getAttribute("data-section-index")     //Assigned to My projects button
    	showSection(this);
    	updateNav(this);
    	removeBackSectionClass();
    	addBackSectionClass(sectionIndex);
    })




   //Nav Toggler

     const navTogglerBtn = document.querySelector(".nav-toggler"),
           aside = document.querySelector(".aside");


     navTogglerBtn.addEventListener("click",() =>{
     	asideSectionTogglerBtn();
     })
    // navTogglerBtn.addEventListener("click",asideSectionTogglerBtn)   //Same as above you can also write like this
    

     function asideSectionTogglerBtn(){
     	aside.classList.toggle("open");
     	navTogglerBtn.classList.toggle("open");
     	for(let i=0; i<totalSection;i++){
   	    	allSection[i].classList.toggle("open");
   	    }
     }
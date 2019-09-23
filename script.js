
    const hele=document.querySelector("#htotal");

        const inputele=document.querySelector("#inputamt");
        const inputele2=document.querySelector("#inputdesc");
        const exptableEle=document.querySelector("#exptable");
        //init value of expense at 0
        let totalexp=0;


        const allexp=[];
    
        //onbuttonclick add inputamt to total
        function addexptototal()
        {
            const expobj={};
            //read the value of inputamt
            const textamt=inputele.value;

            const textdesc=inputele2.value;
        
            //convert it to number
            const exp=parseInt(textamt,10);

            expobj.desc=textdesc;
            expobj.amt=textamt;
            expobj.moment=new Date();

            allexp.push(expobj);
            
            
            //add that value to totalvalue
            totalexp=totalexp+exp;
            
            hele.textContent=totalexp;

            const headingtext=`Total :: ${totalexp}`;
            hele.textContent=headingtext;

            renderlist(allexp);
            
        }
        //get the button element
        const ele=document.querySelector("#btn");

        //listen to click event
        ele.addEventListener("click",addexptototal,false);

        //controller function
        function deleteitem(datevalue)
        {
            /*const newarr = [];
            for(let i=0; i<allexp.length; i++)
            {
                if(allexp[i].moment.valueOf()!==datevalue)
                    newarr.push(allexp[i]);
            }*/
            const newarr=allexp.filter(expobj=>{
                if(expobj.moment.valueOf()!== datevalue)
                {
                    return expobj;
                }
            })
            renderlist(newarr);
        }
        function getDate(moment)
        {
            return moment.toLocaleDateString('en-US',
            {
                year : 'numeric',
                month : 'long',
                day : 'numeric',
            });
        }


        function renderlist(arr)
        {
            const allexphtml = arr.map(expobj=>createlist(expobj));
            const allexphtmljoined = allexphtml.join('');
            exptableEle.innerHTML=allexphtmljoined;


        }
        //view 
        function createlist({ desc, amt, moment })
        {
            return `<li class="list-group-item d-flex justify-content-between">
                        <div class="d-flex flex-column">
                                ${desc}
                            <small class="text-muted">${getDate(moment)}</small>
                        </div>
                        <div>
                            <span class="px-5">
                                 ${amt}
                            </span>
                            <button 
                                type="button" 
                                class="btn btn-outline-danger btn-sm"
                                onclick="deleteitem(${moment.valueOf()})"
                                >
                                <i class="fas fa-trash-alt"></i>
                            </button>
                        </div>
                    </li>`
        }
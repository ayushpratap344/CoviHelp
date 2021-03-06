async function getcovidapiInf(){

    const jsondata2 = await fetch('https://data.covid19india.org/data.json');
    // const jsondata2 = await fetch('https://api.rootnet.in');
    const jsdata2 = await jsondata2.json();
    const dataforchart = jsdata2.statewise;
    const jsondata3 = await fetch('https://data.covid19india.org/v4/min/data.min.json');
    const dataj = await jsondata3.json();
    dataforchart.splice(31, 1);
    const lengthofdata = Object.keys(dataforchart).length;
    const table2 = document.getElementById('tableid');
    var i=0;
    for(i=0;i < lengthofdata; i++){
      
      if(dataforchart[i].statecode=='TT')
      {
        
    let city = document.querySelector('#active-cases');
    city.innerText = `${dataforchart[i].active.replace(/(\d)(?=(\d\d)+\d$)/g, "$1,")}`;

    const totalcase = document.querySelector('#total-cases');
    totalcase.innerText = `${dataforchart[i].confirmed.replace(/(\d)(?=(\d\d)+\d$)/g, "$1,")}`;

    const totarecoverd = document.querySelector('#recovered');
    totarecoverd.innerText = `${dataforchart[i].recovered.replace(/(\d)(?=(\d\d)+\d$)/g, "$1,")}`;

    const totaldeath = document.querySelector('#death');
    totaldeath.innerText = `${dataforchart[i].deaths.replace(/(\d)(?=(\d\d)+\d$)/g, "$1,")}`;
      
    const newconfirm= document.querySelector('#new-confirm');
    newconfirm.innerText = `+${dataj[dataforchart[i].statecode].delta.confirmed.toLocaleString('en-IN')}`;
    // newconfirm.innerText = `+${dataforchart[i].deltaconfirmed.replace(/(\d)(?=(\d\d)+\d$)/g, "$1,")}`;

    const newrecovered= document.querySelector('#deltarec');
    newrecovered.innerText = `+${dataj[dataforchart[i].statecode].delta.recovered.toLocaleString('en-IN')}`;
    // newrecovered.innerText = `+${dataforchart[i].deltarecovered.replace(/(\d)(?=(\d\d)+\d$)/g, "$1,")}`;
    
    const newdeath= document.querySelector('#delta-death');
    newdeath.innerText = `+${dataj[dataforchart[i].statecode].delta.deceased.toLocaleString('en-IN')}`;
    // newdeath.innerText =`+${dataforchart[i].deltadeaths.replace(/(\d)(?=(\d\d)+\d$)/g, "$1,")}`;

      }
    
        if(dataj[dataforchart[i].statecode].delta!=null)
        {
          if(dataj[dataforchart[i].statecode].delta==null)
          {
            continue;
          }
          if(dataj[dataforchart[i].statecode].delta.tested==null)
          {
           
            dataj[dataforchart[i].statecode].delta.tested=0;
          }
          if(dataj[dataforchart[i].statecode].delta.confirmed==null)
          {
            dataj[dataforchart[i].statecode].delta.confirmed=0;
          }
          if(dataj[dataforchart[i].statecode].delta.recovered==null)
          {
            dataj[dataforchart[i].statecode].delta.recovered=0;
          }
          if(dataj[dataforchart[i].statecode].delta.deceased==null)
          {
            dataj[dataforchart[i].statecode].delta.deceased=0;
          }
        
          if(dataj[dataforchart[i].statecode].delta.vaccinated1==null)
          {
            dataj[dataforchart[i].statecode].delta.vaccinated1=0;
          }
          if(dataj[dataforchart[i].statecode].delta.vaccinated2==null)
          {
            dataj[dataforchart[i].statecode].delta.vaccinated2=0;
          }  // dataforchart[i].delta!=null

          var totaldeltavcaccinated = parseInt(dataj[dataforchart[i].statecode].delta.vaccinated1)+parseInt(dataj[dataforchart[i].statecode].delta.vaccinated2)
            var totalvaccinated= parseInt(dataj[dataforchart[i].statecode].total.vaccinated1)+parseInt(dataj[dataforchart[i].statecode].total.vaccinated2)
          if(dataj[dataforchart[i].statecode].delta.vaccinated1!=0)
          {
            var row = `<tr class="tablerow">
            <td class="fixedright color">${dataforchart[i].state}</td>
            <td class="dataletterspacing" > <span class="delta-confirmed"><i class="fas fa-arrow-up"></i>${dataj[dataforchart[i].statecode].delta.confirmed.toLocaleString('en-IN')}</span>${dataforchart[i].confirmed.replace(/(\d)(?=(\d\d)+\d$)/g, "$1,")}</td>
            <td class="dataletterspacing classwidth-active">${dataforchart[i].active.replace(/(\d)(?=(\d\d)+\d$)/g, "$1,")}</td>
            <td class="dataletterspacing"> <span class="delta-confirmed recovered classwidth-recovered"><i class="fas fa-arrow-up"></i>${dataj[dataforchart[i].statecode].delta.recovered.toLocaleString('en-IN')}</span>${dataforchart[i].recovered.replace(/(\d)(?=(\d\d)+\d$)/g, "$1,")}</td>
            <td class="dataletterspacing classwidth-population"> <span class="delta-confirmed deaths"><i class="fas fa-arrow-up"></i>${numDifferentiation(dataj[dataforchart[i].statecode].delta.deceased)}</span>${dataforchart[i].deaths.replace(/(\d)(?=(\d\d)+\d$)/g, "$1,")}</td>
            <td class="dataletterspacing"> <span class="delta-confirmed vaccinated"><i class="fas fa-arrow-up"></i>${numDifferentiation(dataj[dataforchart[i].statecode].delta.vaccinated1)}</span>${numDifferentiation(dataj[dataforchart[i].statecode].total.vaccinated1)}</td>
            <td class="dataletterspacing"> <span class="delta-confirmed vaccinated"><i class="fas fa-arrow-up"></i>${numDifferentiation(dataj[dataforchart[i].statecode].delta.vaccinated2)}</span>${numDifferentiation(dataj[dataforchart[i].statecode].total.vaccinated2)}</td>
            <td class="dataletterspacing"> <span class="delta-confirmed vaccinated"><i class="fas fa-arrow-up"></i>${numDifferentiation(totaldeltavcaccinated)}</span>${numDifferentiation(totalvaccinated)}</td>
             </tr>`
        
                    table2.innerHTML += row;
          }
          else {
            var row = `<tr class="tablerow">
            <td class="fixedright color">${dataforchart[i].state}</td>
            <td class="dataletterspacing" > <span class="delta-confirmed"><i class="fas fa-arrow-up"></i>${dataj[dataforchart[i].statecode].delta.confirmed.toLocaleString('en-IN')}</span>${dataforchart[i].confirmed.replace(/(\d)(?=(\d\d)+\d$)/g, "$1,")}</td>
            <td class="dataletterspacing classwidth-active">${dataforchart[i].active.replace(/(\d)(?=(\d\d)+\d$)/g, "$1,")}</td>
            <td class="dataletterspacing"> <span class="delta-confirmed recovered classwidth-recovered"><i class="fas fa-arrow-up"></i>${dataj[dataforchart[i].statecode].delta.recovered.toLocaleString('en-IN')}</span>${dataforchart[i].recovered.replace(/(\d)(?=(\d\d)+\d$)/g, "$1,")}</td>
            <td class="dataletterspacing classwidth-population"> <span class="delta-confirmed deaths"><i class="fas fa-arrow-up"></i>${numDifferentiation(dataj[dataforchart[i].statecode].delta.deceased)}</span>${dataforchart[i].deaths.replace(/(\d)(?=(\d\d)+\d$)/g, "$1,")}</td>
            <td class="dataletterspacing">${numDifferentiation(dataj[dataforchart[i].statecode].total.vaccinated1)}</td>
            <td class="dataletterspacing">${numDifferentiation(dataj[dataforchart[i].statecode].total.vaccinated2)}</td>
            <td class="dataletterspacing">${numDifferentiation(totalvaccinated)}</td>
                    </tr>`
        
                    table2.innerHTML += row;
          }
        }
        else{
          var totalvaccinated= parseInt(dataj[dataforchart[i].statecode].total.vaccinated1)+parseInt(dataj[dataforchart[i].statecode].total.vaccinated2)
    var row = `<tr class="tablerow">
            <td class="fixedright color">${dataforchart[i].state}</td>
            <td class="dataletterspacing" > ${dataforchart[i].confirmed.replace(/(\d)(?=(\d\d)+\d$)/g, "$1,")}</td>
            <td class="dataletterspacing classwidth-active">${dataforchart[i].active.replace(/(\d)(?=(\d\d)+\d$)/g, "$1,")}</td>
            <td class="dataletterspacing classwidth-recovered"> ${dataforchart[i].recovered.replace(/(\d)(?=(\d\d)+\d$)/g, "$1,")}</td>
            <td class="dataletterspacing classwidth-population"> ${dataforchart[i].deaths.replace(/(\d)(?=(\d\d)+\d$)/g, "$1,")}</td>
            <td class="dataletterspacing"> ${numDifferentiation(dataj[dataforchart[i].statecode].total.vaccinated1)}</td>
            <td class="dataletterspacing"> ${numDifferentiation(dataj[dataforchart[i].statecode].total.vaccinated2)}</td>
            <td class="dataletterspacing">${numDifferentiation(totalvaccinated)}</td>
        </tr>`
            table2.innerHTML += row;
        }
        
    }
 
  }
getcovidapiInf();



function numDifferentiation (val) {
    if (val >= 10000000) {
      val = (val / 10000000).toFixed(1) + 'Cr';
    } else if (val >= 100000) {
      val = (val / 100000).toFixed(1) + 'L';
    }
    else if(val >= 1000) val = (val/1000).toFixed(1) + 'K';
    return val;
  }


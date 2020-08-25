document.addEventListener('DOMContentLoaded', ()=>{
  const jobPannel = document.querySelector('#job-pannel')
  let itemTemp= document.querySelector('#itemTemp')
  let total = []
  
  // console.log(template)
  document.querySelector('#navbar-burger').addEventListener('click', (event)=>{
    event.preventDefault()
    const menu = document.querySelector('#navbar-menu');
    if (menu.classList.contains('is-active')){
      menu.classList.remove('is-active')
    }else{
      menu.classList.add('is-active')
    }
  })
  formsFindJob = document.forms["search-job"]
  formsFindJob.addEventListener('submit', (e)=>{
    e.preventDefault()
    jobDes = formsFindJob[name="description"].value
    jobLoc = formsFindJob[name="location"].value
    jobFullTime = formsFindJob[name="full_time"].checked
    // console.log(jobFullTime)
    if (!!jobDes || !!jobLoc || jobFullTime){
      fetch(`https://still-spire-37210.herokuapp.com/positions.json?description=${jobDes}&full_time=${jobFullTime}&location=${jobLoc}`)
      .then(response => response.json()) 
      .then(searchData => {
        console.log(searchData)
        jobPannel.innerHTML="";
        searchData.forEach(element => {
          let result={
            jobTitle: element["title"],
            jobUrl: element["url"],
            jobCompany: element["company"],
            jobCompanyUrl: element["company_url"],
            jobType: element["type"],
            jobLocation: element["location"]
          };
          jobPannel.appendChild(createRecord(result))
        });
      })
    }   
 })

  function createRecord({jobTitle, jobUrl, jobCompany, jobCompanyUrl, jobType, jobLocation}){
    const h4 = itemTemp.content.querySelector("h4")
    const h4a = itemTemp.content.querySelector("h4 > a")
    const company = itemTemp.content.querySelector(".company")
    const fulltime = itemTemp.content.querySelector(".fulltime")
    const location = itemTemp.content.querySelector(".location")
    h4.setAttribute("href", jobUrl)
    h4a.textContent = jobTitle
    company.setAttribute("href", jobCompanyUrl)
    company.textContent = jobCompany
    fulltime.textContent = jobType
    location.textContent = jobLocation
    return document.importNode(itemTemp.content, true)
  }
})
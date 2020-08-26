document.addEventListener('DOMContentLoaded', ()=>{
  const jobPannel = document.querySelector('#job-pannel')
  const itemTemp= document.querySelector('#itemTemp')
  const pageNext = document.querySelector(".pagination-next")
  const formsFindJob = document.forms["search-job"]
  let jobDes = ""
  let jobLoc = ""
  let jobFullTime = ""
  let page = 1;
  let url = `https://still-spire-37210.herokuapp.com/positions.json`
  pageNext.setAttribute('disabled', '')
  fetch(url)
  .then(response => response.json())
  .then(searchData => {
    searchData.forEach(element => {
      let result = {
        jobTitle: element["title"],
        jobUrl: element["url"],
        jobCompany: element["company"],
        jobCompanyUrl: element["company_url"],
        jobType: element["type"],
        jobLocation: element["location"]
      }
      jobPannel.appendChild(createRecord(result))
    })
  })

  document.querySelector('#navbar-burger').addEventListener('click', (event)=>{
    event.preventDefault()
    const menu = document.querySelector('#navbar-menu');
    if (menu.classList.contains('is-active')){
      menu.classList.remove('is-active')
    }else{
      menu.classList.add('is-active')
    }
  })
  formsFindJob.addEventListener('submit', async (e)=>{
    e.preventDefault()
    jobDes = formsFindJob[name="description"].value
    jobLoc = formsFindJob[name="location"].value
    jobFullTime = formsFindJob[name="full_time"].checked
    page=1;
    url = `https://still-spire-37210.herokuapp.com/positions.json?description=${jobDes}&full_time=${jobFullTime}&location=${jobLoc}&page=${page}`
    console.log(url)
    pageFetch(url)
    // pages(url).then(result => {console.log(result)})
    if(await pages(url) == 50){
      pageNext.attributes.removeNamedItem('disabled');
    }else {
      pageNext.setAttribute('disabled', '')
    }
    
  })
  // console.log(pageNext)
  pageNext.addEventListener('click',async ()=>{
    if (pageNext.hasAttribute('disabled')){
      return
    }
    if(!pageNext.hasAttribute('disabled') && jobPannel.childElementCount%50!==0){
      pageNext.setAttribute('disabled', '')
      return
    }
    
    page = Math.floor(jobPannel.childElementCount/50)+1
    // console.log(page)
    url = `https://still-spire-37210.herokuapp.com/positions.json?description=${jobDes}&full_time=${jobFullTime}&location=${jobLoc}&page=${page}`
    console.log(url)

    const response = await fetch(url)
    const searchData = await response.json() 
    searchData.forEach(element => {
      let result = {
        jobTitle: element["title"],
        jobUrl: element["url"],
        jobCompany: element["company"],
        jobCompanyUrl: element["company_url"],
        jobType: element["type"],
        jobLocation: element["location"]
      }
      jobPannel.appendChild(createRecord(result))
    })
  })

  async function pages(url) {
    const response = await fetch(url)
    const searchData = await response.json()
    return searchData.length
  }
  async function pageFetch(url){
    const response = await fetch(url)
    const searchData = await response.json()
    console.log(searchData)
    jobPannel.innerHTML = ""
    searchData.forEach(element => {
      let result = {
        jobTitle: element["title"],
        jobUrl: element["url"],
        jobCompany: element["company"],
        jobCompanyUrl: element["company_url"],
        jobType: element["type"],
        jobLocation: element["location"]
      }
      jobPannel.appendChild(createRecord(result))
    })
  }


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




let interviewList = [];
let rejectedList = [];
let currentStatus = 'all';

let total = document.getElementById('total');
let interviewCount = document.getElementById('interviewCount');
let rejectedCount = document.getElementById('rejectedCount');



const allFilterBtn = document.getElementById('all-filter-btn');
const interviewFilterBtn = document.getElementById('interview-filter-btn');
const rejectedFilterBtn = document.getElementById('rejected-filter-btn');

const allCardSection = document.getElementById('allCards');
const mainContainer = document.querySelector('main');
const filterSection = document.getElementById('filter-section');

let availableCount = document.getElementById('availableCount');


function calculateCount() {
    const totalJobs = allCardSection.children.length;
    total.innerText = totalJobs;
    availableCount.innerText = totalJobs;   
    interviewCount.innerText = interviewList.length;
    rejectedCount.innerText = rejectedList.length;
}
calculateCount();

function toggleStyle(id) {
    allFilterBtn.classList.add('bg-gray-300','text-black');
    interviewFilterBtn.classList.add('bg-gray-300','text-black');
    rejectedFilterBtn.classList.add('bg-gray-300','text-black');

    allFilterBtn.classList.remove('bg-black','text-white');
    interviewFilterBtn.classList.remove('bg-black','text-white');
    rejectedFilterBtn.classList.remove('bg-black','text-white');

    const selected = document.getElementById(id);
    currentStatus = id;

    selected.classList.remove('bg-gray-300','text-black');
    selected.classList.add('bg-black','text-white');

    if(id === 'interview-filter-btn'){
        allCardSection.classList.add('hidden');
        filterSection.classList.remove('hidden');
        renderInterview();
    } else if(id === 'all-filter-btn'){
        allCardSection.classList.remove('hidden');
        filterSection.classList.add('hidden');
    } else if(id === 'rejected-filter-btn'){
        allCardSection.classList.add('hidden');
        filterSection.classList.remove('hidden');
        renderRejected();
    }
}

// Click handling
mainContainer.addEventListener('click', function(event){
    const parentCard = event.target.closest('.relative');
    if(!parentCard) return;

    const companyname = parentCard.querySelector('.companyname').innerText;

    // DELETE
    if(event.target.closest('.delete-btn')){
        parentCard.remove();
        interviewList = interviewList.filter(i => i.companyname !== companyname);
        rejectedList = rejectedList.filter(r => r.companyname !== companyname);
        calculateCount();
        if(currentStatus==='interview-filter-btn') renderInterview();
        if(currentStatus==='rejected-filter-btn') renderRejected();
        return;
    }

    // INTERVIEW BUTTON
    if(event.target.classList.contains('interview-btn')){
        parentCard.querySelector('.noteAaplay').innerText = 'Interview';
        if(!interviewList.find(i => i.companyname===companyname)){
            interviewList.push({
                companyname,
                dijecnation: parentCard.querySelector('.dijecnation').innerText,
                jobtype: parentCard.querySelector('.jobtype').innerText,
                noteAaplay: 'Interview',
                descreption: parentCard.querySelector('.descreption').innerText
            });
        }
        rejectedList = rejectedList.filter(r => r.companyname!==companyname);
        calculateCount();
        if(currentStatus==='rejected-filter-btn') renderRejected();
        if(currentStatus==='interview-filter-btn') renderInterview();
    }

    // REJECTED BUTTON
    if(event.target.classList.contains('rejected-btn')){
        parentCard.querySelector('.noteAaplay').innerText = 'Rejected';
        if(!rejectedList.find(r => r.companyname===companyname)){
            rejectedList.push({
                companyname,
                dijecnation: parentCard.querySelector('.dijecnation').innerText,
                jobtype: parentCard.querySelector('.jobtype').innerText,
                noteAaplay: 'Rejected',
                descreption: parentCard.querySelector('.descreption').innerText
            });
        }
        interviewList = interviewList.filter(i => i.companyname!==companyname);
        calculateCount();
        if(currentStatus==='interview-filter-btn') renderInterview();
        if(currentStatus==='rejected-filter-btn') renderRejected();
    }
});

// RENDER FUNCTIONS
function renderInterview(){
    filterSection.innerHTML = '';
    if(interviewList.length === 0){
        filterSection.innerHTML = `
            <div class="flex flex-col items-center justify-center 
             py-10 text-gray-600">
                <i class="fa-solid fa-briefcase text-gray-800 text-4xl mb-3"></i>
                <p>No Jobs Available</p>
            </div>
        `;
        return;
    }
    interviewList.forEach(interview => {
        let div = createCard(interview);
        filterSection.appendChild(div);
    });
}

function renderRejected(){
    filterSection.innerHTML = '';
    if(rejectedList.length === 0){
        filterSection.innerHTML = `
            <div class="flex flex-col items-center justify-center py-10
             text-gray-600 bg-gray-100">
                <i class="fa-solid fa-briefcase text-gray-800 text-4xl mb-3"></i>
                <p>No Jobs Available</p>
            </div>
        `;
        return;
    }
    rejectedList.forEach(rejected => {
        let div = createCard(rejected);
        filterSection.appendChild(div);
    });
}

// CARD CREATION FUNCTION
function createCard(data){
    const div = document.createElement('div');
    div.className = 'relative flex justify-between shadow shadow-gray-900  px-5 py-5 rounded-lg';
    div.innerHTML = `
        <div class="space-y-3">
            <p class="companyname font-semibold text-xl text-black">${data.companyname}</p>
            <p class="dijecnation text-neutral-500">${data.dijecnation}</p>
            <p class="jobtype text-neutral-500">${data.jobtype}</p>
            <button class="noteAaplay bg-gray-200 px-3 py-2 rounded-1 text-green-400">${data.noteAaplay}</button>
            <p class="descreption text-neutral-500">${data.descreption}</p>
            <div class="gap-2 mt-2">
          <button class="interview-btn text-green-400 px-3 py-2 border border-green-600 rounded-2xl">Interview</button>
      <button class="rejected-btn px-3 py-2 border border-red-500 text-red-500 rounded-2xl">Rejected</button>
            </div>
        </div>
        <button class="delete-btn absolute top-2 right-2 text-gray-500 hover:text-red-500">
            <i class="fa-solid fa-trash-can"></i>
        </button>
    `;
    return div;
}
const btnList = document.getElementById("list-card");
const listBtn = document.getElementById("card-list");

const listCardCompaniesPage = async (numPage) => {
  try {
    const res = await fetch(`http://localhost:5000/companies?page=${numPage}`);
    const data = await res.json();
    return data.data;
  } catch (error) {
    return error.message;
  }
};

const listCompanies = async () => {
  try {
    const res = await fetch(`http://localhost:5000/companies`);
    const data = await res.json();
    console.log(data);
    return data.data;
  } catch (error) {
    return error.message;
  }
};
// const listCompanies = async (numPage) => {
//   let data = await listCardCompaniesPage(numPage);
//   data.forEach((e) => {
//     const company = document.createElement("div");
//     company.innerHTML = (
//       <div>
//         <div class="companyName">${e.name}</div>
//         <div>${e.description.slice(0, 200)}...</div>
//         <div class="numJobs">Num of Jobs: ${e.numOfJobs}</div>
//       </div>
//     );
//     Listbtn.appendChild(company);
//     company.addEventListener("click", () => {
//       Listbtn.innerHTML = (
//         <div class="boxDetail">
//           <div class="detail">
//             <div class="companyName">${e.name}</div>
//             <div>${e.description}</div>
//             <div class="numJobs">Num of Jobs: ${e.numOfJobs}</div>
//           </div>
//         </div>
//       );
//     });
//   });
// };

// btnList.addEventListener("click", () => {
//   listCompanies(1);
//   Listbtn.innerHTML = "";
// });

// const paginate = (num) => {
//   Listbtn.innerHTML = "";
//   listCompanies(num);
// };
// listCompanies(1);

btnList.addEventListener("click", () => {
  console.log("haha");
  const company = document.createElement("div");
  company.innerHTML = `<div> company</div>`;
  listBtn.appendChild(company);
  company.addEventListener("click", () => {
    const companyDetail = document.createElement("div");
    companyDetail.innerHTML = `<div> detail company</div>`;
    listBtn.innerHTML = "";
    listBtn.appendChild(companyDetail);
  });
});

const paginate = (x) => {
  console.log(x);
};

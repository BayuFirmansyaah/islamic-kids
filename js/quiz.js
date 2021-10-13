let data = {
	soal : [
		{	
			id : 0,
			image : "background.jpg",
			jawaban : [
				{
					type : "text",
					value : "4",
					true : "0"
				},
				{
					type : "text",
					value : "19",
					true : "1"
				},
				{
					type : "text",
					value : "42",
					true : "0"
				},
				{
					type : "text",
					value : "96",
					true : "0"
				}
			]
		},
		{	
			id : 1,
			image : "nusa.jpg",
			jawaban : [
				{
					type : "text",
					value : "19",
					true : "0"
				},
				{
					type : "text",
					value : "06",
					true : "0"
				},
				{
					type : "text",
					value : "22",
					true : "1"
				},
				{
					type : "text",
					value : "72",
					true : "0"
				}
			]
		},
		{	
			id : 0,
			image : "background.jpg",
			jawaban : [
				{
					type : "text",
					value : "40",
					true : "0"
				},
				{
					type : "text",
					value : "190",
					true : "1"
				},
				{
					type : "text",
					value : "420",
					true : "0"
				},
				{
					type : "text",
					value : "960",
					true : "0"
				}
			]
		},
		{	
			id : 3,
			image : "nusa.jpg",
			jawaban : [
				{
					type : "text",
					value : "4",
					true : "0"
				},
				{
					type : "text",
					value : "19",
					true : "0"
				},
				{
					type : "text",
					value : "42",
					true : "0"
				},
				{
					type : "text",
					value : "96",
					true : "1"
				}
			]
		},
		{	
			id : 4,
			image : "background.jpg",
			jawaban : [
				{
					type : "text",
					value : "114",
					true : "1"
				},
				{
					type : "text",
					value : "191",
					true : "0"
				},
				{
					type : "text",
					value : "428",
					true : "0"
				},
				{
					type : "text",
					value : "966",
					true : "0"
				}
			]
		}
	]
}


const render = (data) =>{
	// inisialisasi variabel
	let count = 0;
	let id = null;
	let value = null;
	let idTrue = null;
	let answerTrue = 0;
	let result_chek = null;

	// melakukan pengecekan terhadap jumlah soal yang di kerjakan
	let cek_count = parseInt(localStorage.getItem('count'));
	if(cek_count>0){
		count = cek_count;
	}



	// query element
	let question = document.querySelector('#question');
	let answer = document.querySelectorAll(".kotak-jawaban")

	// menampilkan soal 
	inserData(count,question,answer,data);

	// memberikan event ketika tombol jawaban di tekan
	answer.forEach((el)=>{
		el.addEventListener('click',async function(){
			// mendapatkan data button
			id = this.getAttribute("id")
			value = this.getAttribute("id")

			// melakukan pencarian nilai yang benar
			idTrue = trueValue(answer);

			// menampilkan jawaban yang benar
			changeBg(idTrue,"show",answer);

			// melalukan penyimpanan jumlah soal terjawab dengan benar
			result_chek = parseInt(chekAnswer(data,count,id))
			answerTrue += result_chek;
			localStorage.setItem("answer_true",answerTrue);

			// menghitung nomor soal dan menyimpan pada local storage
			count+=1;
			localStorage.setItem('count',count);
			count = parseInt(localStorage.getItem('count'));
			
			// melakukan cek apakah soal sudah selesai
			if(count>4){
				localStorage.setItem('count',0);
				localStorage.setItem('answer_true',0);
				document.innerHTML="2"
			}

			// mengganti soal dan mereset button
			await setTimeout(()=>{
				inserData(count,question,answer,data);
				changeBg(id,"reset",answer);
			},1000)


		})
	})

}



// fungsi untuk mengetahui jawaban yang benar
const chekAnswer = (data,count,id) =>{
	let is_answer = null;
	let chek = data.soal[count].jawaban[id].true;
	return chek;
}

// funsi untuk mengubah button
const changeBg = (id,option,el) =>{
	let dataColor = ["orangered","#e91e63","green","blueviolet"]

	if(option == "show"){
		for(let i=0;i<el.length;i++){
			if(id == i){
				
			}else{
				el[i].setAttribute("style","background-color:#212529")
			}
		}
	}else{
		for(let i=0;i<el.length;i++){
			el[i].setAttribute("style",`background-color:${dataColor[i]}`)
		}
	}
}

// fungsi untuk menampilakn soal
const inserData = (count,question,answer,data) => {
	question.setAttribute("src",`img/${data.soal[count].image}`);
	
	for(let i=0;i<answer.length;i++){
		answer[i].setAttribute("answer",data.soal[count].jawaban[i].true);
		answer[i].innerHTML = `<h1>${data.soal[count].jawaban[i].value}</h1>`
	}	
}

// fungsi untuk mencari nilai yang benar
const trueValue = (answer) =>{
	for(let i=0;i<answer.length;i++){
		let valueAnswer = answer[i].getAttribute("answer");
		if(valueAnswer == 1){
			 return answer[i].getAttribute("id");
		}
	}
}

// menjalankan fungsi
render(data)
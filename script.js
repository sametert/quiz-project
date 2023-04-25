// create Questions constructor
function Questions(soruMetni,secenekler,dogruSecenek)  {
    this.soruMetni = soruMetni;
    this.secenekler = secenekler;
    this.dogruSecenek = dogruSecenek;
}

Questions.prototype.cevapKontrol = function(cevap) {
    return cevap === this.dogruSecenek;
}

let questions = [
    new Questions("Yazılım nedir?",{
        a: "Donanım ile kullanıcı arasındaki iletişimi kuran ve donanımı kontrol eden programlar",
        b: " Bilgisayarın fiziksel olarak algılanabilen tüm parçaları",
        c: "Bilgisayarda bilgilerin geçici olarak tutulduğu bir donanım elemanı",
        d: "Bilgisayarda bilgilerin kalıcı olarak saklandığı ve diğer adı ROM olan donanım elemanı"
    },"a"),
    new Questions("Aşağıdakilerden hangisi doğrudur?",{
        a: " 1 Kilobyte = 8 Bit",
        b: "1024 MB = 1 KB",
        c: "1 KB = 1024 Byte",
        d: " 1 GB - 1024 KB"
    },"c"),
    new Questions("Aşağıdakilerden hangisi depolama birimi değildir?",{
        a: "Sabit disk",
        b: "RAM",
        c: "ROM",
        d: "Anakart"
    },"d"),
    new Questions("Aşağıdakilerden hangisi bir programlama dili değildir?",{
        a: "Pascal",
        b: "Cobol",
        c: "Windows XP",
        d: "Delphi"
    },"c")
];


// create Quiz constructor
function Quiz(questions) {
    this.questions = questions;
    this.index = 0;
    this.dogruIsaretleme = 0;
    this.yanlisIsaretleme = 0;
}

let quiz = new Quiz(questions);

Quiz.prototype.soruGetir = function() {
    return this.questions[this.index];
}




let startBtn = document.querySelector(".start_quiz");
let quiZ  = document.querySelector(".quiz");
let uiQuestion = document.querySelector(".questions");
let nextQues = document.querySelector(".next_ques");
let scoreCard = document.querySelector(".score_card");


startBtn.addEventListener("click", () => {
    quiZ.classList.add("pasif");
    uiQuestion.classList.add("aktif");
    soruGoster(quiz.soruGetir());
    orderQuestion(quiz.index + 1 , questions.length);
});

nextQues.addEventListener("click" , () => {
    if(questions.length != quiz.index + 1) {
        quiz.index += 1;
        soruGoster(quiz.soruGetir());
        orderQuestion(quiz.index + 1 , questions.length); 
    }else {
        console.log("Quiz bitmiştir");
        score_Card(questions.length,quiz.dogruIsaretleme, quiz.yanlisIsaretleme);
       
    }
});


let uiTitle = document.querySelector(".ui_title");
let optionList = document.querySelector(".option_list");

// soruların ekrana gelmesi
let soruGoster = soruUi => {
    // soruyu ekleme
    uiTitle.innerHTML = `${soruUi.soruMetni}`;
     
    // secenekleri ekleme
    options = "";

    for(let secenek in soruUi.secenekler){
        options +=  `<div class="option">
              <span> <b>${secenek}</b> : ${soruUi.secenekler[secenek]}</span>
        </div>`;
    }

    optionList.innerHTML = options;

    // her option'a onclick özelliği tanımladık
    let keys = optionList.querySelectorAll(".option");
    for(let key of keys) {
        key.setAttribute("onclick", "tikla(this)")
    }

    document.body.style.backgroundColor = "white";
    nextQues.classList.add("pasif");
    nextQues.classList.remove("aktif_btn");

}


// dogru yanlis belirleme. ekranda gösterme
function tikla(seceneks) {
    let secenek_ = seceneks.querySelector("span b").textContent;
    let soru = quiz.soruGetir();
   

    if(soru.cevapKontrol(secenek_)) {
        quiz.dogruIsaretleme += 1;
        seceneks.classList.add("correctOption"); 
        document.body.style.backgroundColor = "rgb(55, 109,1)";  
    }else {
        quiz.yanlisIsaretleme += 1;
        seceneks.classList.add("incorrectOption");
        document.body.style.backgroundColor = "rgb(119, 2, 2)";  
    }

    
    for(let i = 0 ; i < optionList.children.length ; i++) {
        optionList.children[i].classList.add("disabled");
    }

    nextQues.classList.add("aktif_btn");
    nextQues.classList.remove("pasif");

}



let orderQues = document.querySelector(".order_ques");


function orderQuestion(gosterilenSoru, toplamSoru) {
    orderQues.innerHTML = `${gosterilenSoru} / ${toplamSoru}`;
}
 

let result = document.querySelector(".result");
let emojiResult = document.querySelector(".emojiResult");

let success = "<i class='far fa-grin-tears fa-pulse fa-3x'></i>";
let unSuccess = "<i class='far fa-sad-cry fa-pulse fa-3x'></i>";
let draw = "<i class='far fa-meh fa-pulse fa-3x'></i>";

function score_Card(toplam_Soru,dogrular,yanlislar) {
    scoreCard.classList.remove("pasif");
    scoreCard.classList.add("aktif");
    uiQuestion.classList.remove("aktif");
    document.body.style.backgroundColor = "white";

    result.innerHTML = `Toplam ${toplam_Soru} sorudan ${dogrular} doğrunuz , ${yanlislar} yanlışınız vardır.`;

    if(dogrular > yanlislar) {
        emojiResult.innerHTML = success;
    }else if(yanlislar > dogrular) {
        emojiResult.innerHTML = unSuccess;
    }else {
        emojiResult.innerHTML = draw;

    }

}


let againQuiz = document.querySelector(".again_ques");
let firstQuiz = document.querySelector(".first_ques");


againQuiz.addEventListener("click", () =>{
    quiz.dogruIsaretleme = 0;
    quiz.yanlisIsaretleme = 0;
    quiz.index = 0;

    scoreCard.classList.remove("aktif");
    scoreCard.classList.add("pasif");
    uiQuestion.classList.add("aktif");

    soruGoster(quiz.soruGetir());
    orderQuestion(quiz.index + 1 , questions.length);
});

// en basa donmek icin
firstQuiz.addEventListener("click", () => {
    window.location.reload();
});


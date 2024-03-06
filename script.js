const surveyQuestions = [
    {
        section: "Phần 1",
        questions: Array.from({ length: 10 }, (_, i) => ({
            type: "trueOrFalse",
            question: `Câu hỏi 1.${i + 1}`,
            options: [
                { label: "Đúng", value: "true" },
                { label: "Sai", value: "false" }
            ]
        }))
    },
    {
        section: "Phần 2",
        questions: Array.from({ length: 10 }, (_, i) => ({
            type: "singleChoice",
            question: `Câu hỏi 2.${i + 1}`,
            options: [
                { label: "Đáp án 1", value: "option1" },
                { label: "Đáp án 2", value: "option2" },
                { label: "Đáp án 3", value: "option3" },
                { label: "Đáp án 4", value: "option4" }
            ]
        }))
    },
    {
        section: "Phần 3",
        questions: Array.from({ length: 10 }, (_, i) => ({
            type: "multipleChoice",
            question: `Câu hỏi 3.${i + 1}`,
            options: [
                { label: "Đáp án 1", value: "option1" },
                { label: "Đáp án 2", value: "option2" },
                { label: "Đáp án 3", value: "option3" },
                { label: "Đáp án 4", value: "option4" }
            ]
        }))
    },
    {
        section: "Phần 4",
        questions: Array.from({ length: 10 }, (_, i) => ({
            type: "openAnswer",
            question: `Câu hỏi 4.${i + 1}`,
            options: []
        }))
    }
];

function displaySurveyQuestions() {
    const surveyContainer = document.querySelector('.survey-container');
    surveyQuestions.forEach(section => {
        const sectionElement = document.createElement('div');
        sectionElement.classList.add('section');

        const sectionTitle = document.createElement('h2');
        sectionTitle.textContent = section.section;
        sectionElement.appendChild(sectionTitle);

        section.questions.forEach(question => {
            const questionElement = document.createElement('p');
            questionElement.textContent = question.question;
            questionElement.classList.add('question'); // Thêm class 'question' cho mỗi câu hỏi
            sectionElement.appendChild(questionElement);

            if (question.type === "trueOrFalse" || question.type === "singleChoice") {
                question.options.forEach(option => {
                    const radioInput = document.createElement('input');
                    radioInput.type = "radio";
                    radioInput.name = question.question;
                    radioInput.value = option.value;
                    radioInput.id = `q${question.question.replace(/\s/g, '')}${option.value}`;

                    const label = document.createElement('label');
                    label.htmlFor = radioInput.id;
                    label.textContent = option.label;

                    sectionElement.appendChild(radioInput);
                    sectionElement.appendChild(label);
                    sectionElement.appendChild(document.createElement('br')); // Thêm dòng mới sau mỗi lựa chọn
                });
            } else if (question.type === "multipleChoice") {
                question.options.forEach(option => {
                    const checkboxInput = document.createElement('input');
                    checkboxInput.type = "checkbox";
                    checkboxInput.name = question.question;
                    checkboxInput.value = option.value;
                    checkboxInput.id = `q${question.question.replace(/\s/g, '')}${option.value}`;

                    const label = document.createElement('label');
                    label.htmlFor = checkboxInput.id;
                    label.textContent = option.label;

                    sectionElement.appendChild(checkboxInput);
                    sectionElement.appendChild(label);
                    sectionElement.appendChild(document.createElement('br')); // Thêm dòng mới sau mỗi lựa chọn
                });
            } else if (question.type === "openAnswer") {
                const textarea = document.createElement('textarea');
                textarea.name = question.question;
                textarea.rows = "5";
                textarea.cols = "110";
                sectionElement.appendChild(textarea);
            }
        });

        // Thêm thanh chia cắt sau mỗi phần câu hỏi
        const hr = document.createElement('hr');
        sectionElement.appendChild(hr);

        surveyContainer.appendChild(sectionElement);
    });
}

document.addEventListener('DOMContentLoaded', function() {
    // Hiển thị hộp thoại
    document.getElementById('resultBox').classList.add('hidden');
    document.getElementById('dialog').classList.remove('hidden');

    // Xử lý form
    document.getElementById('infoForm').addEventListener('submit', function(event) {
        event.preventDefault();
        // Lấy thông tin từ form
        const name = document.getElementById('name').value;
        const dob = document.getElementById('dob').value;
        const idCard = document.getElementById('idCard').value;
        const address = document.getElementById('address').value;

        // Ẩn hộp thoại và hiển thị bộ đề khảo sát
        document.getElementById('dialog').classList.add('hidden');
        document.getElementById('survey').classList.remove('hidden');

        // Hiển thị câu hỏi khảo sát
        displaySurveyQuestions();
    });
});

function getSurveyAnswers() {
    let answers = [];
    surveyQuestions.forEach(section => {
        section.questions.forEach(question => {
            if (question.type === "trueOrFalse" || question.type === "singleChoice") {
                const selectedOption = document.querySelector(`input[name="${question.question}"]:checked`);
                if (selectedOption) {
                    const label = question.options.find(option => option.value === selectedOption.value).label;
                    answers.push({ question: question.question, answer: label });
                }
            } else if (question.type === "multipleChoice") {
                const selectedOptions = document.querySelectorAll(`input[name="${question.question}"]:checked`);
                selectedOptions.forEach(option => {
                    const label = question.options.find(opt => opt.value === option.value).label;
                    answers.push({ question: question.question, answer: label });
                });
            } else if (question.type === "openAnswer") {
                const textarea = document.querySelector(`textarea[name="${question.question}"]`);
                if (textarea && textarea.value.trim() !== '') {
                    answers.push({ question: question.question, answer: textarea.value });
                }
            }
        });
    });
    return answers;
}

document.getElementById('submitSurvey').addEventListener('click', function() {
    document.getElementById('survey').classList.add('hidden');
    document.getElementById('resultBox').classList.remove('hidden');

    const resultText = document.getElementById('resultText');
    const name = document.getElementById('name').value;
    const dob = document.getElementById('dob').value;
    const idCard = document.getElementById('idCard').value;
    const address = document.getElementById('address').value;

    let result = `Thông tin tiểu sử:<br>- Họ và tên: ${name}<br>- Ngày tháng năm sinh: ${dob}<br>- Căn cước công dân: ${idCard}<br>- Địa chỉ thường trú: ${address}<br><br>Các lựa chọn đáp án:<br>`;

    const answers = getSurveyAnswers();
    answers.forEach((answer, index) => {
        if (index > 0 && answers[index - 1].question === answer.question) {
            result += ', ';
        } else {
            result += `${answer.question}: `;
        }
        result += answer.answer;
        if (index < answers.length - 1 && answers[index + 1].question !== answer.question) {
            result += '<br>';
        }
    });

    resultText.innerHTML = result; // Sử dụng innerHTML để hiển thị các thẻ HTML
});
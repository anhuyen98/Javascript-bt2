// COMMON js
// Xây dựng hàm Dom(ID)
function Dom(id) {
    return document.getElementById(id);
}

// Bài 1: Quản lý tuyển sinh
/**
 * Input: - Điểm chuẩn
 *        - Điểm môn thứ 1, 2, 3
 *        - Điểm khu vực, điểm đối tượng
 * Process: 
 * 1. Dom tới input lấy value điểm chuẩn, điểm môn thứ 1, 2, 3
 * 2. Dom tới select lấy value của điểm khu vực, điểm đối tượng
 * 3. Tính điểm:
 *        - Tính điểm ưu tiên theo khu vực
 *        - Tính điểm ưu tiên theo đối tượng
 * Tổng điểm = điểm 3 môn + điểm khu vực + điểm đối tượng
 * 4. Tổng điểm >= điểm chuẩn && không có môn nào = 0 => Đậu, ngược lại => Rớt  
 * Output: In tổng điểm, kết quả Đậu/ Rớt ra màn hình
 */

// Xây dựng hàm kiểm tra điểm ưu tiên khu vực được select => number
function areaSelect(area) {
    if (area === 'A') {
        return 2;
    } else if (area === 'B') {
        return 1;
    } else if (area === 'C') {
        return 0.5;
    } else {
        return 0;
    }
}
// Xây dựng hàm kiểm tra điểm ưu tiên đối tượng được select => number
function objectSelect(object) {
    if (object === '1') {
        return 2.5;
    } else if (object === '2') {
        return 1.5;
    } else if (object === '3') {
        return 1;
    } else {
        return 0;
    }
}
// Xử lý sự kiện khi user click button "Kết quả"
Dom('btnAdmission').onclick = function () {
    // input
    var benchMark = +Dom('benchMark').value;
    var subjectScore1 = +Dom('subjectScore1').value;
    var subjectScore2 = +Dom('subjectScore2').value;
    var subjectScore3 = +Dom('subjectScore3').value;
    // process
    // dom && (check area & object selected)
    var areaInput = areaSelect(Dom('areaSelect').value);
    var objectInput = objectSelect(Dom('objectSelect').value);
    // Tính tổng điểm
    var totalGrade = subjectScore1 + subjectScore2 + subjectScore3 + areaInput + objectInput; 
    // Kiểm tra đậu/ rớt
    var result;
    if (totalGrade >= benchMark && subjectScore1 > 0 && subjectScore2 > 0 && subjectScore3 > 0) {
        result = 'Đậu';
    } else {
        result = 'Rớt';
    }
    // output
    Dom('passOrFail').innerHTML = result;
    Dom('totalGrade').innerHTML = totalGrade;
}
// === === === === === === === === === === === ===
// Bài 2: Tính tiền điện
/**
 * Input: Họ tên(userName), số kw điện(soKw)
 * Process:
 * 1. Dom tới input lấy value userName, soKw 
 * 2. Tính tiền theo số kw user nhập:
 * 0 - 50kw: Tiền điện = soKw * 500 
 * 51 - 100kw: Tiền điện = 50 * 500 + (soKw - 50) * 650 
 * 101 - 200kw: Tiền điện = 50 * 500 + 50 * 650 + (soKw - 100) * 850
 * 201 - 350kw: Tiền điện = 50 * 500 + 50 * 650 + 100 * 850 + (soKw - 200) * 1100
 * > 350kw: Tiền điện = 50 * 500 + 50 * 650 + 100 * 850 + 150 * 1100 + (soKw - 350) * 1300
 * Output: In kết quả Họ tên, Tiền điện ra màn hình 
 */

// Xây dựng hàm tính tiền điện
function calcElectric(kwNum) {
    var bill = 0;
    if (kwNum <= 50) {
        bill = kwNum * 500;
    } else if (kwNum <= 100) {
        bill = 50 * 500 + (kwNum - 50) * 650;
    } else if (kwNum <= 200) {
        bill = 50 * 500 + 50 * 650 + (kwNum - 100) * 850;
    } else if (kwNum <= 350) {
        bill = 50 * 500 + 50 * 650 + 100 * 850 + (kwNum - 200) * 1100;
    } else {
        bill = 50 * 500 + 50 * 650 + 100 * 850 + 150 * 1100 + (kwNum - 350) * 1300;
    }
    return bill;
}
Dom('btnElectricityBill').onclick = function () {
    // input
    var userName = Dom('userNameInput1').value;
    var electricNum = +Dom('electricNum').value;
    // process
    var electricityBill = calcElectric(electricNum);
    // output
    Dom('userNameOutput1').innerHTML = userName;
    Dom('electricityBill').innerHTML = new Intl.NumberFormat('vn-VN').format(electricityBill) + ' vnd';
}
// === === === === === === === === === === === ===
// Bài 3: Tính tiền thuế thu nhập cá nhân
/**
 * Input: Họ tên(userName), thu nhập hằng năm(annualIncome), số người phụ thuộc(dependent)
 * Process: 
 * 1. Dom tới input lấy value userName, annualIncome, dependent
 * 1. Tính thu nhập chịu thuế (taxableIncome):
 * taxableIncome = annualIncome - 4 - dependent * 1.6
 * 2. Tính thuế (Tax):
 * taxableIncome <= 60: taxableIncome * 0.05
 * 60 < taxableIncome <= 120: taxableIncome * 0.1
 * 120 < taxableIncome <= 210: taxableIncome * 0.15
 * 210 < taxableIncome <= 384: taxableIncome * 0.2
 * 384 < taxableIncome <= 624: taxableIncome * 0.25
 * 624 < taxableIncome <= 960: taxableIncome * 0.3
 * taxableIncome > 960: taxableIncome * 0.35
 * Output: In ra màn hình thuế thu nhập cá nhân
 */

// Xây dựng hàm tính thu nhập chịu thuế
function calcTaxableIncome(income, human) {
    return (income - 4000000 - human * 1600000) 
}
// Xây dựng hàm tính thuế suất 
function calcTax(income) {
    if (income <= 60000000) {
        return 0.05;
    } else if (income <= 120000000) {
        return 0.1;
    } else if (income <= 210000000) {
        return 0.15;
    } else if (income <= 384000000) {
        return 0.2;
    } else if (income <= 624000000) {
        return 0.25;
    } else if (income <= 960000000) {
        return 0.3;
    } else {
        return 0.35;
    }
}
Dom('btnIncome').onclick = function () {
    // input
    var userName = Dom('userNameInput2').value;
    var annualIncome = +Dom('annualIncome').value;
    var dependent = +Dom('dependent').value;
    // process
    var taxableIncome = calcTaxableIncome(annualIncome, dependent);
    var personalIncomeTax = calcTax(taxableIncome) * taxableIncome;
    // output
    Dom('userNameOutput2').innerHTML = userName;
    Dom('personalIncomeTax').innerHTML = personalIncomeTax;
}
// === === === === === === === === === === === ===
// Bài 4: Tính tiền cáp
/**
 * Input: 1. Mã KH- customerCode, Loại KH(personal/ enterprise)- typeCustomer
 *        2. số kênh cao cấp- channelNum, số kết nối(enterprise)- connectNum 
 * Process: 
 * 1. Dom tới input lấy value customerCode, typeCustomer, channelNum, connectNum(enterprise)
 * 2. Tính các phí dựa trên typeCustomer
 *      - Phí xử lý hóa đơn(handleCost)
 *              + (personal) 4.5$ - (enterprise) 15$
 *      - Phí dịch vụ cơ bản(serviceCost)
 *              + (personal) 20.5$ - (enterprise) 75$ <= 10connect
 *                                                add 5$/connect > 10connect  
 *      - Phí kênh cao cấp(premiumChannelCost) 
 *              + (personal) 7.5$/channel - (enterpise) 50$/channel
 * 3. Tính tiền cáp (cableCost): 
 * cableCost = handleCost + serviceCost + premiumChannelCost
 * Output: In tiền cáp ra màn hình
 */
// Xây dựng hàm tính phí xử lý hóa đơn(handleCost)
function calcHandleCost(type) {
    return type === 'personal' ? 4.5 : 15;
}
// Xây dựng hàm tính phí kênh cao cấp
function calcPreChannelCost(type, number) {
    return type === 'personal' ? number * 7.5 : number * 50;
}
// Xây dựng hàm tính phí dịch vụ cơ bản
function calcServiceCost(type, number) {
    if (type === 'personal') {
        return 20.5;
    } else { 
        return number <= 10 ? 75 : 75 + (number - 10) * 5;
    }
}

Dom('btnCableCost').onclick = function () {
    // input
    var customerCode = Dom('customerCodeInput').value;
    var typeCustomer = Dom('typeCustomerInput').value;
    var channelNum = +Dom('channelNum').value;
    var connectNum = +Dom('connectNum').value;
    // process
    var cableCost = calcHandleCost(typeCustomer) + calcPreChannelCost(typeCustomer, channelNum) + calcServiceCost(typeCustomer, connectNum);
    // output
    Dom('customerCodeOutput').innerHTML = customerCode;
    Dom('cableCost').innerHTML = cableCost;
}

import {TEST_RESULT_HEADERS} from "../../utils/Constant"

/**
 * Test 결과 테이블에서 header 를 리턴해주는 함수
 * @returns {HTMLTableRowElement}
 */
export const WordTestResultHeader = ()=>{
    const tr = document.createElement("tr");
    TEST_RESULT_HEADERS.map(header=>{
        const th = document.createElement("th");
        th.textContent = header;
        tr.append(th)
    })
    return tr
}
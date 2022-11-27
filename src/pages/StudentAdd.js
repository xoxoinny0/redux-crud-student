import React, { memo, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { postItem } from "../slice/StudentSlice";

import Spinner from "../components/Spinner";
import ErrorView from "../components/ErrorView";

import TableEx from "../components/TableEx";

const Studentadd = memo(() => {
  /** 저장 완료 후 목록페이지로 강제 이동 함수 생성 */
  const navigate = useNavigate();

  /** 리덕스 관련 초기화 */
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.StudentSlice);

  /** <form>의 submit 버튼이 눌러졌을 때 호출될 이벤트 핸들러 */
  const onStudentSubmit = useCallback((e) => {
    e.preventDefault();

    // 이벤트가 발생한 폼 객체
    const current = e.target;

    // 리덕스를 통한 데이터 저장 요청
    dispatch(
      postItem({
        name: current.name.value,
        userid: current.userid.value,
        grade: current.grade.value,
        idnum: current.idnum.value,
        birthdate: current.birthdate.value,
        tel: current.tel.value,
        height: current.height.value,
        weight: current.weight.value,
        deptno: current.deptno.value,
        profno: current.profno.value,
      })
    ).then((result) => {
      console.log(result);

      // 처리 완료 후 상세페이지로 이동
      navigate(`/student_view/${result.payload.id}`);
    });
  }, []);

  return (
    <div>
      {/* 로딩바 */}
      <Spinner loading={loading} />

      {error ? (
        <ErrorView error={error} />
      ) : (
        <form onSubmit={onStudentSubmit}>
          <TableEx>
            <colgroup>
              <col width="120" />
              <col />
            </colgroup>
            <tbody>
              <tr>
                <th>이름</th>
                <td className="inputWrapper">
                  <input type="text" className="field" name="name" />
                </td>
              </tr>
              <tr>
                <th>아이디</th>
                <td className="inputWrapper">
                  <input type="text" className="field" name="userid" />
                </td>
              </tr>
              <tr>
                <th>학년</th>
                <td className="inputWrapper">
                  <input type="text" className="field" name="grade" />
                </td>
              </tr>
              <tr>
                <th>주민번호</th>
                <td className="inputWrapper">
                  <input type="text" className="field" name="idnum" />
                </td>
              </tr>
              <tr>
                <th>생년월일</th>
                <td className="inputWrapper">
                  <input type="date" className="field" name="birthdate" />
                </td>
              </tr>
              <tr>
                <th>연락처</th>
                <td className="inputWrapper">
                  <input type="tel" className="field" name="tel" />
                </td>
              </tr>
              <tr>
                <th>키</th>
                <td className="inputWrapper">
                  <input type="text" className="field" name="height" />
                </td>
              </tr>
              <tr>
                <th>몸무게</th>
                <td className="inputWrapper">
                  <input type="text" className="field" name="weight" />
                </td>
              </tr>
              <tr>
                <th>학과번호</th>
                <td className="inputWrapper">
                  <input type="text" className="field" name="deptno" />
                </td>
              </tr>
              <tr>
                <th>교수번호</th>
                <td className="inputWrapper">
                  <input type="text" className="field" name="profno" />
                </td>
              </tr>
            </tbody>
          </TableEx>

          <div style={{ textAlign: "center" }}>
            <button type="submit">저장하기</button>
          </div>
        </form>
      )}
    </div>
  );
});

export default Studentadd;
